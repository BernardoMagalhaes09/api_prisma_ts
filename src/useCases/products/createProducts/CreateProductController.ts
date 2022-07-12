import { Request, Response } from "express";
import { CreateProductUseCase } from "./CreateProductUseCase";


class CreateProductController {

    async handle(request: Request, response: Response) {
        const {name, price, size, amount, colection} = request.body

        const createProductUseCase = new CreateProductUseCase()

        try{
            const product = await createProductUseCase.execute({
                name,
                price,
                size,
                amount,
                colection
            })
            return response.status(200).json(product)
        }catch(error) {
            return response.status(400).json(error)
        }
        
    }
}

export { CreateProductController }