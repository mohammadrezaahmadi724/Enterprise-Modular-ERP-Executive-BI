import type { ErpModuleCode } from '@repo/contracts';
import { apiBase } from './api-base';

export type CatalogModule = {
  code: ErpModuleCode;
  nameFa: string;
  subtitle: string;
  color: string;
  listPriceIrr: number;
};

export type EstimateResult = {
  estimateId: string;
  catalogVersion: number;
  lines: Array<{ code?: ErpModuleCode; nameFa: string; amountIrr: number }>;
  subtotalIrr: number;
  rangeMinIrr: number;
  rangeMaxIrr: number;
  validUntil: string;
};

async function apiFetch(input: string, init?: RequestInit) {
  try {
    return await fetch(input, init);
  } catch {
    throw new Error('اتصال به API برقرار نشد — سرویس API را روی پورت 3000 اجرا کنید و Next را یک‌بار ری‌استارت کنید.');
  }
}

export async function fetchPricingCatalog() {
  const res = await apiFetch(`${apiBase()}/api/v1/public/pricing/catalog`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`catalog ${res.status}`);
  return (await res.json()) as { catalogVersion: number; modules: CatalogModule[] };
}

export async function postEstimate(moduleCodes: ErpModuleCode[], idempotencyKey?: string) {
  const res = await apiFetch(`${apiBase()}/api/v1/public/pricing/estimate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : {}),
    },
    body: JSON.stringify({ moduleCodes }),
  });
  if (!res.ok) throw new Error(`estimate ${res.status}`);
  return (await res.json()) as EstimateResult;
}

export async function postMeetingRequest(body: Record<string, unknown>, idempotencyKey?: string) {
  const res = await apiFetch(`${apiBase()}/api/v1/public/pricing/meeting-requests`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : {}),
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`meeting ${res.status}`);
  return res.json();
}
