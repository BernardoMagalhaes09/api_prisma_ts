import { Router, Request, Response } from 'express';
import { CreateProductController } from '../useCases/products/createProducts/CreateProductController';

const createProductController = new CreateProductController

const router = Router();

router.post('/register', createProductController.handle);

export default router;
