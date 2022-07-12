import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {

    async handle(request: Request, response: Response) {
        const {name, cpf, email, password} = request.body

        const createUserUseCase = new CreateUserUseCase()

        try{
            const seller = await createUserUseCase.execute({
                name,
                cpf,
                email,
                password
            })
            return response.status(200).json(seller.message)  
        }catch(error){
            return response.status(400).json(error)
        }
    }
}

export { CreateUserController }