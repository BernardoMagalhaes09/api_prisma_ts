import { Router, Request, Response } from 'express';
import { CreateSellerController } from '../useCases/Sellers/createSeller/CreateSellerController';

const createSellerController = new CreateSellerController()

const router = Router();

router.post('/register', createSellerController.handle);

export default router;
