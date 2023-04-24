import { prisma } from '@/config';
import { Hotel } from '@prisma/client';

async function findAll(): Promise<Hotel[]> {
  return prisma.hotel.findMany({ where: {} });
}

export default {
  findAll,
};
