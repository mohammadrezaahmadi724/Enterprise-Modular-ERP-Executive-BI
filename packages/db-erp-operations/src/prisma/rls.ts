import { rlsSessionEnabled, setTenantSession } from '@repo/db-core-adapter';
import type { Prisma } from '../generated/index.js';
import { operationsPrisma } from './client.js';

/** خواندن/نوشتن با session تننت وقتی `RLS_ENABLED` روشن است. */
export async function operationsSession<T>(run: (tx: Prisma.TransactionClient) => Promise<T>): Promise<T> {
  return operationsTransaction(run);
}

export async function operationsTransaction<T>(run: (tx: Prisma.TransactionClient) => Promise<T>): Promise<T> {
  if (!rlsSessionEnabled()) {
    return operationsPrisma.$transaction(run);
  }
  return operationsPrisma.$transaction(async (tx) => {
    await setTenantSession(tx);
    return run(tx);
  });
}
