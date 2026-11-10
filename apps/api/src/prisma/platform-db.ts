import { PrismaClient } from '@repo/db-platform';

const globalForPrisma = globalThis as unknown as { platformDb?: PrismaClient };

export const platformDb =
  globalForPrisma.platformDb ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.platformDb = platformDb;
