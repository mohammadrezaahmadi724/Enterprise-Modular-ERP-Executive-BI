import { PrismaClient } from '../generated/index.js';

const globalForPrisma = globalThis as unknown as { financePrisma?: PrismaClient };

export const financePrisma =
  globalForPrisma.financePrisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.financePrisma = financePrisma;

export function financePersistenceEnabled(): boolean {
  return process.env.FINANCE_PERSISTENCE === '1' || process.env.FINANCE_PERSISTENCE === 'true';
}
