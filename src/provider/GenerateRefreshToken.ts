import Prisma from "../database/prisma"
import dayjs from 'dayjs'



class GenerateRefreshToken {

    async execute(userId: string) {
        const expiresIn = dayjs().add(1, "year").unix()

        const generateRefreshToken = await Prisma.refreshToken.create({
            data:{
                userId,
                expiresIn
            }
        })

        return generateRefreshToken 
    }
}

export { GenerateRefreshToken }