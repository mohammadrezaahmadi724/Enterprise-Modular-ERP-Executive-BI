import { rlsSessionEnabled, setTenantSession } from '@repo/db-core-adapter';
import type { Prisma } from '../generated/index.js';
import { hrPrisma } from './client.js';

export async function hrTransaction<T>(run: (tx: Prisma.TransactionClient) => Promise<T>): Promise<T> {
  if (!rlsSessionEnabled()) {
    return hrPrisma.$transaction(run);
  }
  return hrPrisma.$transaction(async (tx) => {
    await setTenantSession(tx);
    return run(tx);
  });
}
