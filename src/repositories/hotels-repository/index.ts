import { prisma } from '@/config';
import { HotelWithRoom } from '@/protocols';
import { Hotel } from '@prisma/client';

async function findAll(): Promise<Hotel[]> {
  return prisma.hotel.findMany();
}

async function findHotelBYId(id: number): Promise<HotelWithRoom> {
  return prisma.hotel.findFirst({
    where: { id },
    include: {
      Rooms: true,
    },
  });
}

export default {
  findAll,
  findHotelBYId,
};
