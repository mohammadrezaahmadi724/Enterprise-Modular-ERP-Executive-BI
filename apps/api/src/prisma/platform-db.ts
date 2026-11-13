import { PrismaClient } from '@repo/db-platform';
import { TenantContext } from '@repo/domain';

const globalForPrisma = globalThis as unknown as { platformDb?: PrismaClient };

const MUTATIONS = new Set([
  'create',
  'update',
  'upsert',
  'delete',
  'createMany',
  'updateMany',
  'deleteMany',
]);

function platformPrismaGuardEnabled(): boolean {
  return (
    process.env.PLATFORM_PRISMA_CONTEXT_GUARD === '1' ||
    process.env.PLATFORM_PRISMA_CONTEXT_GUARD === 'true'
  );
}

function createPlatformDb(): PrismaClient {
  const base = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
  });

  if (!platformPrismaGuardEnabled()) {
    return base;
  }

  return base.$extends({
    query: {
      $allModels: {
        async $allOperations({ operation, args, query }) {
          if (!MUTATIONS.has(operation)) {
            return query(args);
          }
          const ctx = TenantContext.getOrNull();
          if (!ctx?.tenantId) {
            return query(args);
          }
          const data = (args as { data?: { tenantId?: string; tenant_id?: string } }).data;
          const rowTenant = data?.tenantId ?? data?.tenant_id;
          if (rowTenant && rowTenant !== ctx.tenantId) {
            throw new Error('PLATFORM_TENANT_SCOPE_MISMATCH');
          }
          return query(args);
        },
      },
    },
  }) as unknown as PrismaClient;
}

export const platformDb = globalForPrisma.platformDb ?? createPlatformDb();

if (process.env.NODE_ENV !== 'production') globalForPrisma.platformDb = platformDb;
