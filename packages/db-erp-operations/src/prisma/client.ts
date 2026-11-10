import { PrismaClient } from '../generated/index.js';

const globalForPrisma = globalThis as unknown as { operationsPrisma?: PrismaClient };

export const operationsPrisma =
  globalForPrisma.operationsPrisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.operationsPrisma = operationsPrisma;

export function crmPersistenceEnabled(): boolean {
  return process.env.CRM_PERSISTENCE === '1' || process.env.CRM_PERSISTENCE === 'true';
}
