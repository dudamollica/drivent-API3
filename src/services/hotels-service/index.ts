import hotelsRepository from '@/repositories/hotels-repository/index';
import ticketsRepository from '@/repositories/tickets-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import { Hotel } from '@prisma/client';
import httpStatus from 'http-status';
import { notFoundError } from '@/errors';

async function listAllHotels(userId: number): Promise<Hotel[]> {
  const hotels = await hotelsRepository.findAll();
  if (hotels.length == 0) throw notFoundError();

  const enrollment = await enrollmentRepository.findByUserId(userId);
  if (!enrollment) throw new Error();

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) throw new Error();

  if (ticket.status != 'PAID') throw httpStatus.PAYMENT_REQUIRED;
  if (ticket.TicketType.isRemote == true) throw httpStatus.PAYMENT_REQUIRED;
  if (ticket.TicketType.includesHotel == false) throw httpStatus.PAYMENT_REQUIRED;

  return hotels;
}

async function findHotelById(userId: number, hotelId: number){
  const hotel = await hotelsRepository.findHotelBYId(hotelId);
  if (!hotel) throw new Error();

  const enrollment = await enrollmentRepository.findByUserId(userId);
  if (!enrollment) throw new Error();

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) throw new Error();

  if (ticket.status != 'PAID') throw httpStatus.PAYMENT_REQUIRED;
  if (ticket.TicketType.isRemote == true) throw httpStatus.PAYMENT_REQUIRED;
  if (ticket.TicketType.includesHotel == false) throw httpStatus.PAYMENT_REQUIRED;

  return hotel;
}

export default {
  listAllHotels,
  findHotelById,
};
