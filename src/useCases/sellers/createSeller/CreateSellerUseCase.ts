import Prisma from "../../../database/prisma"
import {AppError} from '../../../errors/AppError'
import {testCPF} from '../../../middlewares/testCpf'

interface IRequest {
    name: string
    cpf: string | undefined
    office: string
    cellphone: string
}

class CreateSellerUseCase {

    async execute({name, cpf, office, cellphone}: IRequest) {
        let cpfFormated = ''
        if(!cpf){
            throw new AppError('Cpf is required')
        }   

        if(cpf.length != 11 && cpf.length != 14) {
            throw new AppError("Cpf not formmated sem simbolo ou com simbolo")
        }else if( cpf.length == 11){
            let cpfIsvalid = testCPF(cpf)
            if(!cpfIsvalid) {
                throw new AppError('Invalid cpf sem simbolo')
            }
            cpfFormated = cpf
        }else if(cpf.length == 14) {
            if(cpf.split('.').length != 3){
                throw new AppError("Cpf not formmated com simbolo")
            }else if(cpf.split('-').length != 2) {
                throw new AppError("Cpf not formmated com simbolo")
            }else {
                cpfFormated = `${cpf.split('.')[0]}${cpf.split('.')[1]}${cpf.split('.')[2].split('-')[0]}${cpf.split('-')[1]}`
                let cpfIsvalid = testCPF(cpfFormated)
                if(!cpfIsvalid) {
                    throw new AppError('Invalid cpf com simbolo')
                }
            }
        }else {
            throw new AppError('Invalid cpf nada feito')
        }      

        const userAlreadyExists = await Prisma.sellers.findFirst({
            where: {
               cpf: cpfFormated
            }
        })

        if(userAlreadyExists) {
            throw new AppError("User already exists", 400)
        }

        try{
            const user = await Prisma.sellers.create({
                data: {
                    name,
                    cpf: cpfFormated,
                    office,
                    cellphone
                }
            })
            return {message: user, status: 200}
        }catch(error) {
            throw new AppError('User not created')
        }
    }
}

export { CreateSellerUseCase }