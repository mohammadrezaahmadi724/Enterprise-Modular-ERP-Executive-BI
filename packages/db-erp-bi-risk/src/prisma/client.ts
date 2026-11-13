import { PrismaClient } from '../generated/index.js';

const globalForPrisma = globalThis as unknown as { biRiskPrisma?: PrismaClient };

export const biRiskPrisma =
  globalForPrisma.biRiskPrisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.biRiskPrisma = biRiskPrisma;

/** همان پرچم دمو — وقتی DB عملیات/BI فعال است، projection‌ها هم در PostgreSQL ذخیره می‌شوند. */
export function biReadModelPersistenceEnabled(): boolean {
  return process.env.CRM_PERSISTENCE === '1' || process.env.CRM_PERSISTENCE === 'true';
}
