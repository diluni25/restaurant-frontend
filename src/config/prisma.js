import { PrismaClient } from '@prisma/client';

// Shared instance: import prisma everywhere instead of constructing new clients.
export const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
});

export async function connectDatabase() {
  await prisma.$connect();
  // Unlike $connect() alone, this query checks that the database can respond.
  await prisma.$queryRaw`SELECT 1`;
  console.log('MySQL connection established via Prisma');
}

export async function disconnectDatabase() {
  await prisma.$disconnect();
}
