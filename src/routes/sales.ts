import { Router } from 'express';
import { CreateSalesController } from '../useCases/sales/createSale/CreateSalesController';

const createSalesController = new CreateSalesController()

const router = Router();

router.post('/register', createSalesController.handle);

export default router;