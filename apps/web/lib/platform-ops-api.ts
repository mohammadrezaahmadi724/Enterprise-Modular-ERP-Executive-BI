import { apiBase } from './api-base';

const API = apiBase();

export type ProdRuntimeStatus = {
  smtp: { configured: boolean; mode: string };
  kms: { keyVersion: string; configured: boolean };
  backup: { policy: string; lastRun?: string };
  persistence: { finance: boolean; crm: boolean; wms: boolean };
  redisRequiredInProd: boolean;
};

export async function fetchProdRuntimeStatus(): Promise<ProdRuntimeStatus> {
  const res = await fetch(`${API}/api/v1/platform/ops/runtime`, {
    headers: { 'x-super-admin': 'true' },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`runtime: ${res.status}`);
  return (await res.json()) as ProdRuntimeStatus;
}
