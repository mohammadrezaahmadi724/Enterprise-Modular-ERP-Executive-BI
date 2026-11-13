import { seedProjection, getProjectionSlice } from './metric-query.js';
import {
  listWmsTrackingContractsPrisma,
  persistWmsTrackingContractPrisma,
} from '../prisma/wms-projection.repository.js';

export type WmsTrackingContract = {
  sku: string;
  name: string;
  baseUnit: string;
  method: string;
  decimals: number;
  fefo: boolean;
  minShelf: string;
  flags: string[];
  version: number;
};

export type WmsSerialRow = {
  serial: string;
  sku: string;
  itemName: string;
  warehouse: string;
  batch?: string;
  status: 'in_stock' | 'reserved' | 'issued' | 'delivered' | 'returned' | 'scrapped';
};

const PROJECTION = 'projection_wms_tracking';
const CONTRACTS_KEY = 'contracts';
const SERIALS_KEY = 'serials';

const contractsByTenant = new Map<string, Map<string, WmsTrackingContract>>();
const serialsByTenant = new Map<string, WmsSerialRow[]>();

const METHODS = ['بدون ردیابی', 'ردیابی بهر', 'سریال یکتا', 'بهر و سریال'] as const;

export function resetWmsTrackingReadModel(): void {
  contractsByTenant.clear();
  serialsByTenant.clear();
}

export function upsertTrackingContract(tenantId: string, contract: WmsTrackingContract): void {
  let map = contractsByTenant.get(tenantId);
  if (!map) {
    map = new Map();
    contractsByTenant.set(tenantId, map);
  }
  map.set(contract.sku, contract);
  seedProjection(tenantId, PROJECTION, CONTRACTS_KEY, { count: map.size });
  void persistWmsTrackingContractPrisma(tenantId, contract.sku, contract as unknown as Record<string, unknown>);
}

export async function hydrateWmsTrackingFromPrisma(tenantId: string): Promise<void> {
  const rows = await listWmsTrackingContractsPrisma(tenantId);
  if (!rows.length) return;
  let map = contractsByTenant.get(tenantId);
  if (!map) {
    map = new Map();
    contractsByTenant.set(tenantId, map);
  }
  for (const raw of rows) {
    const contract = raw as unknown as WmsTrackingContract;
    if (contract.sku) map.set(contract.sku, contract);
  }
}

export function seedTrackingFromCatalog(
  tenantId: string,
  items: Array<{ sku: string; name: string }>,
): WmsTrackingContract[] {
  const out: WmsTrackingContract[] = [];
  const existing = contractsByTenant.get(tenantId);
  for (let i = 0; i < items.length; i++) {
    const item = items[i]!;
    if (existing?.has(item.sku)) {
      out.push(existing.get(item.sku)!);
      continue;
    }
    const method = METHODS[i % METHODS.length]!;
    const contract: WmsTrackingContract = {
      sku: item.sku,
      name: item.name,
      baseUnit: 'عدد',
      method,
      decimals: 0,
      fefo: method.includes('بهر') || i % 5 === 0,
      minShelf: method.includes('بهر') ? '۹۰ روز' : '—',
      flags: method === 'سریال یکتا' || method === 'بهر و سریال' ? ['الزام سریال در خروج'] : ['قرنطینه‌پذیر'],
      version: 1,
    };
    upsertTrackingContract(tenantId, contract);
    out.push(contract);
  }
  return out;
}

export function registerSerials(
  tenantId: string,
  rows: WmsSerialRow[],
): WmsSerialRow[] {
  const list = serialsByTenant.get(tenantId) ?? [];
  const keys = new Set(list.map((s) => s.serial));
  const added = rows.filter((r) => !keys.has(r.serial));
  serialsByTenant.set(tenantId, [...added, ...list].slice(0, 500));
  seedProjection(tenantId, PROJECTION, SERIALS_KEY, { count: (serialsByTenant.get(tenantId) ?? []).length });
  return added;
}

export function listTrackingContracts(tenantId: string, limit = 100): WmsTrackingContract[] {
  const map = contractsByTenant.get(tenantId);
  if (!map) return [];
  return [...map.values()].slice(0, limit);
}

export function getTrackingContract(tenantId: string, sku: string): WmsTrackingContract | undefined {
  return contractsByTenant.get(tenantId)?.get(sku);
}

/** کالاهای با ردیابی بهر / FEFO باید کل مقدار خروج از بهر پوشش داده شود (اگر بهری وجود دارد). */
export function requiresBatchCoverage(contract: WmsTrackingContract | undefined): boolean {
  if (!contract) return false;
  if (contract.fefo) return true;
  return contract.method.includes('بهر') || contract.method === 'سریال یکتا';
}

export function listSerials(tenantId: string, limit = 100): WmsSerialRow[] {
  return (serialsByTenant.get(tenantId) ?? []).slice(0, limit);
}

export function readWmsTrackingMeta(tenantId: string): { sources: string[]; contractCount: number; serialCount: number } {
  const contracts = getProjectionSlice(tenantId, PROJECTION, CONTRACTS_KEY);
  const serials = getProjectionSlice(tenantId, PROJECTION, SERIALS_KEY);
  return {
    sources: ['projection_wms_tracking'],
    contractCount: contracts?.count ?? listTrackingContracts(tenantId).length,
    serialCount: serials?.count ?? listSerials(tenantId).length,
  };
}
