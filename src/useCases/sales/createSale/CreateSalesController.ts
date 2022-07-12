import { Request, Response } from "express";
import { CreateSalesUseCase } from "./CreateSalesUseCase";


class CreateSalesController {

    async handle(request: Request, response: Response) {
        const {salesDate, sellerId, userId, productId} = request.body

        const createSaleUseCase = new CreateSalesUseCase()

        try{
            const sale = await createSaleUseCase.execute({
                salesDate,
                sellerId,
                userId,
                productId
            })
            return response.status(200).json(sale)
        }catch(error) {
            return response.status(400).json(error)
        }
        
    }
}

export { CreateSalesController }