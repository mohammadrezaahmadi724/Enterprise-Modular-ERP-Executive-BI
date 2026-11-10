import { TenantContext } from '@repo/domain';

type RlsTx = { $executeRawUnsafe: (query: string) => Promise<number> };

const UUID_V4 =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/** جلوگیری از SQL Injection در SET LOCAL */
export function safeUuid(raw: string): string {
  if (!UUID_V4.test(raw)) {
    throw new Error(`Invalid UUID for session variable: ${raw}`);
  }
  return raw;
}

/**
 * تنظیم متغیرهای session برای RLS — فقط داخل transaction.
 */
export async function setTenantSession(tx: RlsTx): Promise<void> {
  const ctx = TenantContext.get();
  const tenantId = safeUuid(ctx.tenantId);
  await tx.$executeRawUnsafe(`SET LOCAL app.current_tenant_id = '${tenantId}'`);
  await tx.$executeRawUnsafe(
    `SET LOCAL app.is_super_admin = '${ctx.isSuperAdmin ? 'true' : 'false'}'`,
  );
  await tx.$executeRawUnsafe(
    `SET LOCAL app.is_break_glass = '${ctx.breakGlassSessionId ? 'true' : 'false'}'`,
  );
}
