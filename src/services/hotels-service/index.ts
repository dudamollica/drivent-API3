import { notFoundError } from '@/errors';
import hotelsRepository from "@/repositories/hotels-repository/index"
import ticketsRepository from '@/repositories/tickets-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import { Hotel } from '@prisma/client';
import httpStatus from 'http-status';

async function listAllHotels(userId: number) : Promise<Hotel[]>{
    const enrollment = await enrollmentRepository.findByUserId(userId)
    if(!enrollment) throw notFoundError()

    const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id)
    if(!ticket) throw notFoundError()

    if(ticket.status != "PAID") throw httpStatus.PAYMENT_REQUIRED
    if(ticket.TicketType.isRemote == true) throw httpStatus.PAYMENT_REQUIRED
    if(ticket.TicketType.includesHotel == false) throw httpStatus.PAYMENT_REQUIRED

    return await hotelsRepository.findAll()
}

export default {
  listAllHotels,
};
