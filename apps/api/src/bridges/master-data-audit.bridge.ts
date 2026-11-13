import { TenantContext } from '@repo/domain';
import { platformDb } from '../prisma/platform-db';

export async function auditMasterDataSensitive(input: {
  action: string;
  entityType: string;
  entityId: string;
  oldValue?: object;
  newValue?: object;
  ip?: string;
}): Promise<void> {
  try {
    const ctx = TenantContext.getOrNull();
    if (!ctx) return;
    await platformDb.auditLog.create({
      data: {
        tenantId: ctx.tenantId,
        userId: ctx.userId,
        action: input.action,
        entityType: input.entityType,
        entityId: input.entityId,
        oldValue: input.oldValue ?? {},
        newValue: input.newValue ?? {},
        ip: input.ip ?? '0.0.0.0',
        correlationId: ctx.correlationId,
      },
    });
  } catch {
    /* audit must not break primary flow */
  }
}
