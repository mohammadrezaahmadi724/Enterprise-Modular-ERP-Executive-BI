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

/** موجودی، اسناد و رزرو انبار روی PostgreSQL + RLS */
export function wmsPersistenceEnabled(): boolean {
  return (
    process.env.WMS_PERSISTENCE === '1' ||
    process.env.WMS_PERSISTENCE === 'true' ||
    crmPersistenceEnabled()
  );
}

export function projectsPrismaEnabled(): boolean {
  return process.env.PROJECTS_PERSISTENCE === '1' || process.env.PROJECTS_PERSISTENCE === 'true';
}

export function masterDataPrismaEnabled(): boolean {
  return (
    process.env.MASTER_DATA_PERSISTENCE === '1' ||
    process.env.MASTER_DATA_PERSISTENCE === 'true' ||
    projectsPrismaEnabled()
  );
}
