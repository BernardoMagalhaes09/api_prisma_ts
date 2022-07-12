import bcrypt from "bcryptjs"
import Prisma from "../../../database/prisma"
import {AppError} from '../../../errors/AppError'
import {testCPF} from '../../../middlewares/testCpf'

interface IRequest {
    name: string
    email: string
    password: string
    cpf: string | undefined
}

class CreateUserUseCase {

    async execute({name, cpf, email, password}: IRequest) {
        let cpfFormated = ''
        if(!cpf){
            throw new AppError('Cpf is required')
        }   

        if(cpf.length != 11 && cpf.length != 14) {
            throw new AppError("Cpf not formmated sem simbolo ou com simbolo")
        }else if( cpf.length == 11){
            let cpfIsvalid = testCPF(cpf)
            if(!cpfIsvalid) {
                throw new AppError('Invalid cpf sem simbolo')
            }
            cpfFormated = cpf
        }else if(cpf.length == 14) {
            if(cpf.split('.').length != 3){
                throw new AppError("Cpf not formmated com simbolo")
            }else if(cpf.split('-').length != 2) {
                throw new AppError("Cpf not formmated com simbolo")
            }else {
                cpfFormated = `${cpf.split('.')[0]}${cpf.split('.')[1]}${cpf.split('.')[2].split('-')[0]}${cpf.split('-')[1]}`
                let cpfIsvalid = testCPF(cpfFormated)
                if(!cpfIsvalid) {
                    throw new AppError('Invalid cpf com simbolo')
                }
            }
        }else {
            throw new AppError('Invalid cpf nada feito')
        }      

        const userAlreadyExists = await Prisma.users.findFirst({
            where: {
               email
            }
        })

        if(userAlreadyExists) {
            throw new AppError("User already exists", 400)
        }

        if(password.length <= 8) {
            throw new AppError("Passord must have a minimum of 8 characters")
        }

        const salt = 10;
        const hash = await bcrypt.hash(password, salt)

        try{
            const user = await Prisma.users.create({
                data: {
                    name,
                    cpf: cpfFormated,
                    email,
                    password: hash
                }
            })
            return {message: user, status: 200}
        }catch(error) {
            throw new AppError('User not created')
        }
    }
}

export { CreateUserUseCase }