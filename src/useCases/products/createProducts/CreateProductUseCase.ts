import { response } from "express"
import Prisma from "../../../database/prisma"
import {AppError} from '../../../errors/AppError'

interface IRequest {
    name: string
    price: number
    size: string
    amount: number
    colection: string
}

class CreateProductUseCase {

    async execute({name, price, size, amount, colection}: IRequest) {
        
        const productAlreadyExists = await Prisma.products.findFirst({
            where: {
                name,
                size,
                colection
            }
        })

        if(productAlreadyExists) {
            throw new AppError('Product already exists')
        }

        try{
            const product = await Prisma.products.create({
                data: {
                    name,
                    price,
                    size,
                    amount,
                    colection
                }
            })
            return response.status(200).json(product)
        }catch(error) {
            throw new AppError("Not created product")
        }
        
    }
}

export { CreateProductUseCase }