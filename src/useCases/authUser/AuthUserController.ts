import { Request, Response } from "express";
import { AuthUserUseCase } from "./AuthUserUseCase";


class AuthUserController {

    async handle(request: Request, response: Response) {
        const {email, password} = request.body

        const authUserUseCase= new AuthUserUseCase()

        try{
            const token = await authUserUseCase.execute({
                email,
                password
            })
            return response.json(token)
        }catch(error: any){
            return response.status(error.statusCode).json({message: error.message})
        }
         
    }
}

export {AuthUserController}