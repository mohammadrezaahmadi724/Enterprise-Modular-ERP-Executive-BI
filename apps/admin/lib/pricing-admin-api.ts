import type { ErpModuleCode, ModuleCatalogEntry } from '@repo/contracts';
import { apiBase } from './api-base';

async function apiFetch(input: string, init?: RequestInit) {
  try {
    return await fetch(input, init);
  } catch {
    throw new Error('اتصال به API — پورت 3000 و ری‌استارت admin بعد از تغییر next.config');
  }
}

function headers() {
  return {
    'Content-Type': 'application/json',
    'x-super-admin': 'true',
    'x-tenant-id': '11111111-1111-4111-8111-111111111111',
    'x-correlation-id': crypto.randomUUID(),
  };
}

export type PlanModulesRow = {
  id: string;
  code: string;
  nameFa: string;
  planVersionId?: string;
  version: number;
  basePrice: number;
  includedModules: ErpModuleCode[];
  modulePrices: Partial<Record<ErpModuleCode, number>>;
  isActive: boolean;
};

export async function fetchModuleCatalog() {
  const res = await apiFetch(`${apiBase()}/api/v1/platform/pricing/catalog`, { headers: headers(), cache: 'no-store' });
  if (!res.ok) throw new Error(`catalog: ${res.status}`);
  return (await res.json()) as { catalogVersion: number; modules: ModuleCatalogEntry[] };
}

export async function saveModuleCatalog(modules: ModuleCatalogEntry[]) {
  const res = await apiFetch(`${apiBase()}/api/v1/platform/pricing/catalog`, {
    method: 'PUT',
    headers: headers(),
    body: JSON.stringify({ modules }),
  });
  if (!res.ok) throw new Error(`catalog save: ${res.status}`);
  return (await res.json()) as { catalogVersion: number; modules: ModuleCatalogEntry[] };
}

export async function fetchPlansWithModules() {
  const res = await apiFetch(`${apiBase()}/api/v1/platform/pricing/plans`, { headers: headers(), cache: 'no-store' });
  if (!res.ok) throw new Error(`plans: ${res.status}`);
  return (await res.json()) as PlanModulesRow[];
}

export async function updatePlanModules(
  planId: string,
  body: { includedModules: ErpModuleCode[]; modulePrices: Partial<Record<ErpModuleCode, number>> },
) {
  const res = await apiFetch(`${apiBase()}/api/v1/platform/pricing/plans/${planId}/modules`, {
    method: 'PATCH',
    headers: headers(),
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`plan modules: ${res.status}`);
  return (await res.json()) as { plan: PlanModulesRow };
}
