import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import hotelsController from '@/controllers/hotels-controller';

const hotelsRouter = Router();

hotelsRouter.get('/', authenticateToken, hotelsController.listAllHotels);
hotelsRouter.get('/:hotelId', authenticateToken);

export { hotelsRouter };