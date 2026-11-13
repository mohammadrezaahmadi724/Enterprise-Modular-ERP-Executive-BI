import { apiBase } from './api-base';

export type QcInspectionRowApi = {
  id: string;
  code: string;
  workOrderNumber: string;
  productLabel: string;
  inspectionDate: string;
  resultFa: string;
};

export type QcOverviewApi = {
  kpis: {
    inspectionsToday: number;
    passRatePct: number;
    onHold: number;
    failedLots: number;
  };
  preview: QcInspectionRowApi[];
};

const TENANT = process.env.NEXT_PUBLIC_DEMO_TENANT_ID ?? '11111111-1111-4111-8111-111111111111';

function headers() {
  return {
    'Content-Type': 'application/json',
    'x-tenant-id': TENANT,
    'x-user-id': '00000000-0000-4000-8000-000000000001',
    'x-correlation-id': crypto.randomUUID(),
    'x-super-admin': 'true',
  };
}

export async function fetchQcOverview() {
  const res = await fetch(`${apiBase()}/api/v1/qc/overview`, { headers: headers(), cache: 'no-store' });
  if (!res.ok) throw new Error(`qc overview: ${res.status}`);
  return (await res.json()) as { overview: QcOverviewApi; source: string };
}

export async function fetchQcInspections() {
  const res = await fetch(`${apiBase()}/api/v1/qc/inspections`, { headers: headers(), cache: 'no-store' });
  if (!res.ok) throw new Error(`qc inspections: ${res.status}`);
  return (await res.json()) as { inspections: QcInspectionRowApi[]; source: string };
}
