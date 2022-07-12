import { Request, Response } from "express";
import { CreateColectionUseCase } from "./CreateColectionsUseCase";


class CreateColectionController {

    async handle(request: Request, response: Response) {
        const {name} = request.body

        const createColectionUseCase = new CreateColectionUseCase()

        try{
            const colection = await createColectionUseCase.execute({
                name
            })
            return response.status(200).json(colection)
        }catch(error) {
            return response.status(400).json(error)
        }
        
    }
}

export { CreateColectionController }