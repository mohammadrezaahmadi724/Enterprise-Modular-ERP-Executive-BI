import { ForbiddenException } from '@nestjs/common';
import { TenantContext } from '@repo/domain';
import { activateTenantModules, buildMenuForTenantResolved } from '../../modules/platform/menu.service';

export function tenantIdForMenu(requested?: string): string {
  const ctx = TenantContext.get();
  if (!requested || requested === ctx.tenantId) return ctx.tenantId;
  if (ctx.isSuperAdmin) return requested;
  throw new ForbiddenException('Cross-tenant menu denied');
}

export async function menuForTenantQuery(requested?: string) {
  const tenantId = tenantIdForMenu(requested);
  return { tenantId, items: await buildMenuForTenantResolved(tenantId) };
}

export async function activateTenantModulesCommand(tenantId: string, codes: string[]) {
  const modules = await activateTenantModules(tenantId, codes);
  return { tenantId, modules };
}
