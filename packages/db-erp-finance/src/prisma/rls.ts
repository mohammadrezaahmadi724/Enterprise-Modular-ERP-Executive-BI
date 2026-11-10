import { rlsSessionEnabled, setTenantSession } from '@repo/db-core-adapter';
import type { Prisma } from '../generated/index.js';
import { financePrisma } from './client.js';

export async function financeTransaction<T>(run: (tx: Prisma.TransactionClient) => Promise<T>): Promise<T> {
  if (!rlsSessionEnabled()) {
    return financePrisma.$transaction(run);
  }
  return financePrisma.$transaction(async (tx) => {
    await setTenantSession(tx);
    return run(tx);
  });
}
