import { apiBase } from './api-base';

const TENANT = process.env.NEXT_PUBLIC_DEMO_TENANT_ID ?? '11111111-1111-4111-8111-111111111111';

function idempotencyKey() {
  return crypto.randomUUID();
}

function jsonHeaders() {
  const key = idempotencyKey();
  return {
    'Content-Type': 'application/json',
    'x-tenant-id': TENANT,
    'x-user-id': '00000000-0000-4000-8000-000000000001',
    'x-correlation-id': key,
    'Idempotency-Key': key,
    'x-super-admin': 'true',
  };
}

function mutatingHeaders(contentType?: string) {
  const key = idempotencyKey();
  return {
    ...(contentType ? { 'Content-Type': contentType } : {}),
    'x-tenant-id': TENANT,
    'x-user-id': '00000000-0000-4000-8000-000000000001',
    'x-correlation-id': key,
    'Idempotency-Key': key,
    'x-super-admin': 'true',
  };
}

export function tenantApiHeaders() {
  return mutatingHeaders();
}

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${apiBase()}${path}`, { headers: jsonHeaders(), cache: 'no-store' });
  if (!res.ok) throw new Error(`${path}: ${res.status}`);
  return (await res.json()) as T;
}

export type MasterDataListApi<T> = {
  entitled: boolean;
  rows: T[];
  total: number;
  source: string;
  requiredModules?: string[];
  upgradeHref?: string;
};

export type MasterDataOverviewApi = {
  data: {
    sections: Array<{ id: string; countLabel: string; entitled: boolean; requiredModules: string[] }>;
    entitlements: Record<string, boolean>;
    links: { subscription: string; deepLinks: Record<string, string> };
  };
};

export async function fetchMasterDataOverview() {
  return getJson<MasterDataOverviewApi>('/api/v1/projects/master-data/overview');
}

export async function fetchMasterDataParties() {
  return getJson<MasterDataListApi<import('./projects-master-data-demo').MasterPartyRow>>(
    '/api/v1/projects/master-data/parties',
  );
}

export async function fetchMasterDataItems() {
  return getJson<MasterDataListApi<import('./projects-master-data-demo').MasterCodeNameRow>>(
    '/api/v1/projects/master-data/items',
  );
}

export async function fetchMasterDataUnits() {
  return getJson<MasterDataListApi<import('./projects-master-data-demo').MasterCodeNameRow>>(
    '/api/v1/projects/master-data/units',
  );
}

export async function fetchMasterDataTaxes() {
  return getJson<MasterDataListApi<import('./projects-master-data-demo').MasterTaxRow>>(
    '/api/v1/projects/master-data/taxes',
  );
}

export async function fetchMasterDataWarehouses() {
  return getJson<MasterDataListApi<import('./projects-master-data-demo').MasterCodeNameRow>>(
    '/api/v1/projects/master-data/warehouses',
  );
}

export async function fetchMasterDataLocations() {
  return getJson<MasterDataListApi<import('./projects-master-data-demo').MasterCodeNameRow>>(
    '/api/v1/projects/master-data/locations',
  );
}

export async function fetchMasterDataCostCenters() {
  return getJson<MasterDataListApi<import('./projects-master-data-demo').MasterCodeNameRow>>(
    '/api/v1/projects/master-data/cost-centers',
  );
}

export async function fetchMasterDataPriceLists() {
  return getJson<MasterDataListApi<import('./projects-master-data-demo').MasterPriceListRow>>(
    '/api/v1/projects/master-data/price-lists',
  );
}

export type MasterDataBrandingApi = {
  entitled: boolean;
  slots: readonly string[];
  configured: { logo: boolean; stamp: boolean; signature: boolean };
  urls?: { logoUrl?: string; stampUrl?: string; signatureUrl?: string };
  upgradeHref?: string;
  source: string;
};

export async function fetchMasterDataBranding() {
  return getJson<MasterDataBrandingApi>('/api/v1/projects/master-data/branding');
}

export type MasterDataArchiveResponse = {
  ok: boolean;
  reason?: string;
  upgradeHref?: string;
  requiredModules?: string[];
};

export async function archiveMasterDataRecord(sectionPath: string, code: string) {
  const encoded = encodeURIComponent(code);
  const res = await fetch(`${apiBase()}/api/v1/projects/master-data/${sectionPath}/${encoded}/archive`, {
    method: 'POST',
    headers: mutatingHeaders('application/json'),
    body: '{}',
  });
  if (!res.ok) throw new Error(`archive: ${res.status}`);
  return (await res.json()) as MasterDataArchiveResponse;
}

export type BrandingUploadSlot = 'logo' | 'stamp' | 'signature';

export async function uploadMasterDataBranding(slot: BrandingUploadSlot, file: File) {
  const form = new FormData();
  form.append('file', file);
  const res = await fetch(`${apiBase()}/api/v1/projects/master-data/branding/${slot}/upload`, {
    method: 'POST',
    headers: mutatingHeaders(),
    body: form,
  });
  if (!res.ok) throw new Error(`branding upload: ${res.status}`);
  return (await res.json()) as MasterDataBrandingApi & { ok: boolean };
}

export async function fetchTenantAssetBlob(assetPath: string): Promise<Blob> {
  const res = await fetch(`${apiBase()}${assetPath}`, { headers: mutatingHeaders(), cache: 'no-store' });
  if (!res.ok) throw new Error(`asset: ${res.status}`);
  return await res.blob();
}
