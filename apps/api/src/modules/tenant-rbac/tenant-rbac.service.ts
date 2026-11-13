import {
  PERMISSION_CATALOG,
  MODULE_PERMISSION_MATRIX,
  catalogForGrantable,
  permissionsForActiveModules,
  type ErpModuleCode,
} from '@repo/contracts';
import { platformDb } from '../../prisma/platform-db';

const MODULE_CODE_ALIASES: Record<string, ErpModuleCode> = {
  'finance-base': 'finance',
  'crm-base': 'sales',
  'operations-base': 'inventory',
  'hr-base': 'hr',
  'projects-base': 'inventory',
  'bi-risk-base': 'bi-risk',
  'bi-risk': 'bi-risk',
  'manufacturing-base': 'manufacturing',
};

export async function listActiveErpModuleCodes(tenantId: string): Promise<ErpModuleCode[]> {
  const rows = await platformDb.tenantModule.findMany({
    where: { tenantId, status: 'Active' },
    select: { moduleCode: true },
  });
  const codes = new Set<ErpModuleCode>();
  for (const r of rows) {
    const mapped = MODULE_CODE_ALIASES[r.moduleCode] ?? (r.moduleCode as ErpModuleCode);
    if (mapped in MODULE_PERMISSION_MATRIX) codes.add(mapped);
  }
  if (!codes.size) {
    return ['finance', 'sales', 'hr', 'inventory', 'bi-risk'];
  }
  return [...codes];
}

export async function grantablePermissionsForTenant(tenantId: string): Promise<string[]> {
  const modules = await listActiveErpModuleCodes(tenantId);
  const ceiling = permissionsForActiveModules(modules);
  const setting = await platformDb.platformSetting.findUnique({
    where: { key: `rbac_ceiling:${tenantId}` },
  });
  if (setting?.value && Array.isArray(setting.value)) {
    const extra = (setting.value as string[]).filter((p) => typeof p === 'string');
    return [...new Set([...ceiling, ...extra])];
  }
  return ceiling;
}

export async function rbacCatalogForTenant(tenantId: string) {
  const grantable = await grantablePermissionsForTenant(tenantId);
  return {
    grantable,
    catalog: catalogForGrantable(grantable),
    all: PERMISSION_CATALOG,
  };
}

export function assertPermissionsSubset(selected: string[], grantable: string[]): void {
  const allow = new Set(grantable);
  const invalid = selected.filter((p) => !allow.has(p));
  if (invalid.length) {
    throw new Error(`PERMISSION_NOT_GRANTABLE: ${invalid.join(',')}`);
  }
}
