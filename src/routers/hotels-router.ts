import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import hotelsController from '@/controllers/hotels-controller';

const hotelsRouter = Router();

hotelsRouter.get('/', hotelsController.listAllHotels);
hotelsRouter.get('/:hotelId', authenticateToken, hotelsController.findHotelById);

export { hotelsRouter };