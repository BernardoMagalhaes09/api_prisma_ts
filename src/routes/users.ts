import { Router, Request, Response } from 'express';
import Prisma from '../database/prisma';
import bcrypt from 'bcryptjs';

const router = Router();

router.get('/getUsers', async (request: Request, response: Response) => {

    try{
        const users = await Prisma.user.findMany({
            select: {
                id: true,
                email: true,
                createdAt: true
            }
        })
        return response.status(200).json(users)
    }catch(error: any) {
        return response.status(400).json(error)
    }
    
});

router.post('/createUser', async (request: Request, response: Response) => {
    const { email, password, userCreated } = request.body

    const salt = 10;
    const hash = await bcrypt.hashSync(password, salt);

    try{
        const users = await Prisma.user.create({
            data:{
                email,
                password: hash,
                userCreated,
                updatedAt: new Date()
            }
        })
        return response.status(200).json(users)
    }catch(error: any) {
        return response.status(400).json(error)
    }
    
});

export default router;