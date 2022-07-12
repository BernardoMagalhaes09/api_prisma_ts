import { compare } from "bcryptjs"
import { GenerateRefreshToken } from "../../provider/GenerateRefreshToken"
import Prisma from "../../database/prisma"
import { GenerateTokenProvider } from "../../provider/GenerateTokenProvider"
import {AppError} from '../../errors/AppError'

interface IRequest {
    email: string,
    password: string
}

class AuthUserUseCase {

    async execute({email, password}: IRequest) {

        //VERIFICA SE USUARIO EXISTE
        const userAlreadyExists = await Prisma.user.findFirst({
            where: {
               email
            }
        })

        if (!userAlreadyExists){
            throw new AppError("Email or password incorrect", 400)
        }

        //VERIFICA SE A SENHA ESTÁ CORRETA
        const passwordMatch = await compare(password, userAlreadyExists.password)
        
        if(!passwordMatch) {
            throw new AppError("Email or password incorrect", 400)
        }
        
        //GERA TOKEN DO USUÁRIO
        const generateTokenProvider = new GenerateTokenProvider()
        const token = await generateTokenProvider.execute(userAlreadyExists.id)

        await Prisma.refreshToken.deleteMany({
            where: {
                userId: userAlreadyExists.id
            }
        })

        //GERA REFRESH TOKEN DO USUARIO
        const generateRefreshToken = new GenerateRefreshToken()
        const refreshToken = await generateRefreshToken.execute(userAlreadyExists.id)

        return {token, refreshToken}
    }
}

export { AuthUserUseCase }