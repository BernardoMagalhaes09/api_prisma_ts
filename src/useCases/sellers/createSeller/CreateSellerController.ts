import { Request, Response } from "express";
import { CreateSellerUseCase } from "./CreateSellerUseCase";

class CreateSellerController {

    async handle(request: Request, response: Response) {
        const {name, cpf, office, cellphone} = request.body

        const createSellerUseCase = new CreateSellerUseCase()

        try{
            const seller = await createSellerUseCase.execute({
                name,
                cpf,
                office,
                cellphone
            })
            return response.status(200).json(seller.message)  
        }catch(error){
            return response.status(400).json(error)
        }
    }
}

export { CreateSellerController }