import { users, start, sellers, products, colections, sales} from './routes/index'
import express,{ Request, Response, NextFunction } from 'express';

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.disable('x-powered-by');
server.use((request, response, next) => {
  response.set({
    'Access-Control-Allow-Origin': '*'
  })
  next()
})
server.use('/public', express.static('public'));
server.use('/api/v1/users', users.default);
server.use('/api/v1/sellers', sellers.default)
server.use('/api/v1/products', products.default)
server.use('/api/v1/colections', colections.default)
server.use('/api/v1/sales', sales.default)
server.use('/api/v1', start.default)
server.use(async (request: Request, response: Response, next: NextFunction) => {
  next(response.status(400).json({ error: 'Router do not exists' }));
})

export default server