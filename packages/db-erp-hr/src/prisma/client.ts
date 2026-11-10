import { PrismaClient } from '../generated/index.js';

const globalForPrisma = globalThis as unknown as { hrPrisma?: PrismaClient };

export const hrPrisma =
  globalForPrisma.hrPrisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.hrPrisma = hrPrisma;

export function hrPersistenceEnabled(): boolean {
  return process.env.HR_PERSISTENCE === '1' || process.env.HR_PERSISTENCE === 'true';
}
