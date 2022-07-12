import { Router } from 'express';
import { CreateColectionController } from '../useCases/colections/createColections/CreateColectionsController';

const createColectionController = new CreateColectionController()

const router = Router();

router.post('/register', createColectionController.handle);

export default router;
