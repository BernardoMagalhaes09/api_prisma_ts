import Prisma from "../../database/prisma"
import { GenerateTokenProvider } from "../../provider/GenerateTokenProvider"
import dayjs from "dayjs"
import { GenerateRefreshToken } from "../../provider/GenerateRefreshToken"
import {AppError} from '../../errors/AppError'


class RefreshTokenUserUseCase {

    async execute(refresh_token: string) {
        const refreshToken = await Prisma.refreshToken.findFirst({
            where:{
                id: refresh_token
            }
        })

        if(!refreshToken) {
            throw new AppError("Refresh token invalid", 400)
        }

        const refreshTokenExpired = dayjs().isAfter(dayjs.unix(refreshToken.expiresIn))
        const generateTokenProvider = new GenerateTokenProvider()
        const token = await generateTokenProvider.execute(refreshToken.userId)

        if(refreshTokenExpired) {
            await Prisma.refreshToken.deleteMany({
                where: {
                    userId: refreshToken.userId
                }
            })

            const generateRefreshTokenProvider = new GenerateRefreshToken()
            const newRefreshToken = await generateRefreshTokenProvider.execute(refreshToken.userId)

            return { token, newRefreshToken }
        }
        return { token }
    }
}

export { RefreshTokenUserUseCase }