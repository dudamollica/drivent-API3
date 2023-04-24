import { AuthenticatedRequest } from '@/middlewares';
import { Request, Response } from 'express';
import httpStatus, { PAYMENT_REQUIRED } from 'http-status';
import hotelsService from '@/services/hotels-service';

export async function listAllHotels(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const hotels = await hotelsService.listAllHotels(userId);
    return res.status(httpStatus.OK).send(hotels);
  } catch (error) {
    if (error == httpStatus.PAYMENT_REQUIRED) {
      return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    }
    if (error.name === 'UnauthorizedError') {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export default {
  listAllHotels,
};
