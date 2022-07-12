import { Router, Request, Response } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const router = Router();

router.get('/', ensureAuthenticated, (request: Request, response: Response) => {
    response.status(200).json({
      status: 200,
      message: 'API operante',
      version: '1.0',
    });
  });

export default router;