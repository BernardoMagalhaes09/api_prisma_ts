import Prisma from "../../../database/prisma"
import {AppError} from '../../../errors/AppError'

interface IRequest {
    name: string
}

class CreateColectionUseCase {

    async execute({name}: IRequest) {
        
        const productAlreadyExists = await Prisma.colections.findFirst({
            where: {
                name
            }
        })

        if(productAlreadyExists) {
            throw new AppError('Colection already exists')
        }

        try{
            const product = await Prisma.colections.create({
                data: {
                    name
                }
            })
            return product
        }catch(error) {
            throw new AppError("Not created colection")
        }
        
    }
}

export { CreateColectionUseCase }