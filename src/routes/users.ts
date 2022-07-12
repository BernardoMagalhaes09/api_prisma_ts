import { Router, Request, Response } from 'express';
import Prisma from '../database/prisma';
import { AuthUserController } from '../useCases/authUser/AuthUserController';
import { RefreshTokenUserController } from '../useCases/refreshTokenUser/RefreshTokenUserController';
import { CreateUserController } from '../useCases/users/createUsers/CreateUserController';

const authUserController = new AuthUserController()
const refreshTokenUserController = new RefreshTokenUserController()
const createUserController = new CreateUserController()

const router = Router();

router.post('/login', authUserController.handle);

router.post('/refreshToken', refreshTokenUserController.handle)

router.get('/getUsers', async (request: Request, response: Response) => {

    try{
        const users = await Prisma.users.findMany({
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

router.post('/register', createUserController.handle);

export default router;