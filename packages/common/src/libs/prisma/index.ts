import { PrismaClient } from '@prisma/client';

declare global {
  namespace globalThis {
    var prismadb: PrismaClient | undefined;
  }
}

const prisma =
  global.prismadb ||
  new PrismaClient({
    log: ['query'],
  });

if (process.env.NODE_ENV === 'production') global.prismadb = prisma;

export default prisma;
