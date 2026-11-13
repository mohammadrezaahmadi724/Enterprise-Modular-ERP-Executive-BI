import type {
  CloudSubscriptionRates,
  ErpModuleCode,
  WizardEstimateInput,
  WizardEstimateResult,
} from '@repo/contracts';
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
  return (await res.json()) as {
    catalogVersion: number;
    modules: CatalogModule[];
    cloudSubscription?: CloudSubscriptionRates;
  };
}

export async function fetchCloudSubscriptionRates() {
  const res = await apiFetch(`${apiBase()}/api/v1/public/pricing/cloud-subscription`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`cloud-subscription ${res.status}`);
  return (await res.json()) as CloudSubscriptionRates;
}

export async function postEstimate(moduleCodes: ErpModuleCode[], idempotencyKey?: string) {
  const key = idempotencyKey ?? (typeof crypto !== 'undefined' ? crypto.randomUUID() : undefined);
  const res = await apiFetch(`${apiBase()}/api/v1/public/pricing/estimate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(key ? { 'Idempotency-Key': key } : {}),
    },
    body: JSON.stringify({ moduleCodes }),
  });
  if (!res.ok) throw new Error(`estimate ${res.status}`);
  return (await res.json()) as EstimateResult;
}

export type WizardEstimateApiResult = WizardEstimateResult & {
  estimateId: string;
  kind: 'wizard';
  currency: 'IRR';
  totalIrr: number;
  rangeMinIrr: number;
  rangeMaxIrr: number;
};

export async function postWizardEstimate(wizard: WizardEstimateInput, idempotencyKey?: string) {
  const key = idempotencyKey ?? (typeof crypto !== 'undefined' ? crypto.randomUUID() : undefined);
  const res = await apiFetch(`${apiBase()}/api/v1/public/pricing/estimate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(key ? { 'Idempotency-Key': key } : {}),
    },
    body: JSON.stringify({ wizard }),
  });
  if (!res.ok) throw new Error(`estimate ${res.status}`);
  return (await res.json()) as WizardEstimateApiResult;
}

export async function sendEstimateOtp(phone: string) {
  const res = await apiFetch(`${apiBase()}/api/v1/public/pricing/estimate/otp/send`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone }),
  });
  const data = (await res.json()) as { accepted: boolean; message: string; devCode?: string };
  if (!res.ok || !data.accepted) throw new Error(data.message || 'ارسال کد ناموفق بود');
  return data;
}

export async function verifyEstimateOtp(phone: string, code: string, estimatePayload?: Record<string, unknown>) {
  const res = await apiFetch(`${apiBase()}/api/v1/public/pricing/estimate/otp/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone, code, estimatePayload }),
  });
  const data = (await res.json()) as { verified: boolean; message?: string; correlationId?: string };
  if (!res.ok || !data.verified) throw new Error(data.message || 'کد نادرست است');
  return data;
}

export async function postMeetingRequest(body: Record<string, unknown>, idempotencyKey?: string) {
  const key = idempotencyKey ?? (typeof crypto !== 'undefined' ? crypto.randomUUID() : undefined);
  const res = await apiFetch(`${apiBase()}/api/v1/public/pricing/meeting-requests`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(key ? { 'Idempotency-Key': key } : {}),
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`meeting ${res.status}`);
  return res.json();
}
