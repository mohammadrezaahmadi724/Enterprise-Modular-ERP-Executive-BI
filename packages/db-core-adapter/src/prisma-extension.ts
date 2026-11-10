import { PrismaClient, type Prisma } from '@prisma/client';
import { TenantContext, TenantContextMissingError } from '@repo/domain';
import { setTenantSession } from './rls.js';

/** ایجاد Prisma Client با الزام TenantContext و RLS در هر transaction */
export function createPrismaClient(databaseUrl?: string): PrismaClient {
  const base = new PrismaClient({
    datasources: databaseUrl ? { db: { url: databaseUrl } } : undefined,
  });

  return base.$extends({
    query: {
      $allModels: {
        async $allOperations({ args, query }) {
          if (!TenantContext.getOrNull()) {
            throw new TenantContextMissingError();
          }
          return query(args);
        },
      },
    },
  }) as unknown as PrismaClient;
}

/** اجرای transaction با setTenantSession */
export async function withTenantTransaction<T>(
  client: PrismaClient,
  fn: (tx: Prisma.TransactionClient) => Promise<T>,
  options?: Parameters<PrismaClient['$transaction']>[1],
): Promise<T> {
  return client.$transaction(async (tx) => {
    await setTenantSession(tx);
    return fn(tx);
  }, options);
}

/** جلوگیری از تراکنش مشترک بین دو client مجزا — runtime guard */
export function assertSingleClientTransaction(clients: PrismaClient[]): void {
  const unique = new Set(clients);
  if (unique.size > 1) {
    throw new Error(
      'ACID boundary violation: cannot share a transaction across multiple PrismaClient instances',
    );
  }
}
