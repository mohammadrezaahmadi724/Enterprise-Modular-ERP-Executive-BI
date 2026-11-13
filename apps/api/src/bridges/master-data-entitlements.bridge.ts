import { TenantContext } from '@repo/domain';
import { globalModuleRegistry } from '@repo/module-sdk';

export type MasterDataSectionId =
  | 'parties'
  | 'items'
  | 'units'
  | 'taxes'
  | 'warehouses'
  | 'locations'
  | 'costCenters'
  | 'priceLists'
  | 'branding';

/** ماژول SaaS لازم برای هر بخش — با اشتراک ادمین هم‌خوان است */
export const MASTER_DATA_SECTION_MODULES: Record<MasterDataSectionId, string[]> = {
  parties: ['crm-base'],
  items: ['operations-base'],
  units: ['operations-base'],
  taxes: ['finance-base'],
  warehouses: ['operations-base'],
  locations: ['operations-base'],
  costCenters: ['finance-base'],
  priceLists: ['sales', 'operations-base'],
  branding: ['projects-base'],
};

export async function resolveMasterDataEntitlements(): Promise<Record<MasterDataSectionId, boolean>> {
  const tenantId = TenantContext.requireTenantId();
  const ctx = TenantContext.getOrNull();
  if (ctx?.isSuperAdmin) {
    return Object.fromEntries(
      (Object.keys(MASTER_DATA_SECTION_MODULES) as MasterDataSectionId[]).map((k) => [k, true]),
    ) as Record<MasterDataSectionId, boolean>;
  }

  const rows = await globalModuleRegistry.getActiveModules(tenantId);
  const active = new Set(rows.filter((r) => r.status === 'Active').map((r) => r.moduleCode));

  const out = {} as Record<MasterDataSectionId, boolean>;
  for (const [section, required] of Object.entries(MASTER_DATA_SECTION_MODULES) as Array<
    [MasterDataSectionId, string[]]
  >) {
    if (section === 'priceLists') {
      out[section] = active.has('operations-base') || active.has('crm-base');
      continue;
    }
    out[section] = required.some((m) => active.has(m));
  }
  return out;
}

export function masterDataUpgradeHints(): { subscriptionHref: string; adminModulesHref: string } {
  return {
    subscriptionHref: '/settings/subscription',
    adminModulesHref: '/admin',
  };
}
