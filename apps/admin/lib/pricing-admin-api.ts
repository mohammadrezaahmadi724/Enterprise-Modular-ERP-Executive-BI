import type { CloudSubscriptionRates, ErpModuleCode, MarketingSiteContent, ModuleCatalogEntry } from '@repo/contracts';
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

export async function fetchCloudSubscriptionRates() {
  const res = await apiFetch(`${apiBase()}/api/v1/platform/pricing/cloud-subscription`, {
    headers: headers(),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`cloud-subscription: ${res.status}`);
  return (await res.json()) as CloudSubscriptionRates;
}

export async function saveCloudSubscriptionRates(body: {
  baseMonthlyTomans?: number;
  includedSeats?: number;
  extraSeatTomans?: number;
  maxSeats?: number;
  moduleMonthlyTomans?: Partial<Record<ErpModuleCode, number>>;
  planCode?: string;
}) {
  const res = await apiFetch(`${apiBase()}/api/v1/platform/pricing/cloud-subscription`, {
    method: 'PUT',
    headers: headers(),
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`cloud save: ${res.status}`);
  return (await res.json()) as CloudSubscriptionRates;
}

export async function clearCloudSubscriptionRates() {
  const res = await apiFetch(`${apiBase()}/api/v1/platform/pricing/cloud-subscription`, {
    method: 'DELETE',
    headers: headers(),
  });
  if (!res.ok) throw new Error(`cloud clear: ${res.status}`);
  return (await res.json()) as CloudSubscriptionRates;
}

export async function fetchMarketingSite() {
  const res = await apiFetch(`${apiBase()}/api/v1/platform/pricing/site`, { headers: headers(), cache: 'no-store' });
  if (!res.ok) throw new Error(`site: ${res.status}`);
  return (await res.json()) as MarketingSiteContent;
}

export async function saveMarketingSite(body: MarketingSiteContent) {
  const res = await apiFetch(`${apiBase()}/api/v1/platform/pricing/site`, {
    method: 'PUT',
    headers: headers(),
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`site save: ${res.status}`);
  return (await res.json()) as MarketingSiteContent;
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
