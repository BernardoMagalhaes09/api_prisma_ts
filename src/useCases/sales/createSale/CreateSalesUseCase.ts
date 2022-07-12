import Prisma from "../../../database/prisma"
import {AppError} from '../../../errors/AppError'

interface IRequest {
    sellerId: string
    userId: string 
    productId: string
    salesDate: Date
}

class CreateSalesUseCase {

    async execute({salesDate, sellerId, userId, productId}: IRequest) {
        
        try{
            const sale = await Prisma.sales.create({
                data: {
                    salesDate,
                    sellerId,
                    userId,
                    productId
                }
            })
            return sale
        }catch(error) {
            throw new AppError("Not possible create sale")
        }
        
    }
}

export { CreateSalesUseCase }