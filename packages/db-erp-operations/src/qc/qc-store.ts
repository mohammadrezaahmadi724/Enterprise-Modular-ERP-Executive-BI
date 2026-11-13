import { randomUUID } from 'node:crypto';
import type { QcInspectionRow, QcOverviewDto, QcResultCode } from './qc.types.js';

const inspectionsByTenant = new Map<string, QcInspectionRow[]>();

export function resetQcStore(): void {
  inspectionsByTenant.clear();
}

function resultFa(result: QcResultCode): string {
  if (result === 'Pass') return 'قبول';
  if (result === 'Fail') return 'رد';
  return 'نگه‌داری';
}

function ensureSeed(tenantId: string): QcInspectionRow[] {
  let rows = inspectionsByTenant.get(tenantId);
  if (rows?.length) return rows;

  const base = [
    {
      workOrderNumber: 'WO-1404-0218',
      productLabel: 'محصول A',
      result: 'Pass' as const,
      daysAgo: 0,
    },
    {
      workOrderNumber: 'WO-1404-0219',
      productLabel: 'محصول B',
      result: 'Conditional' as const,
      daysAgo: 0,
    },
    {
      workOrderNumber: 'WO-1404-0220',
      productLabel: 'محصول C',
      result: 'Pass' as const,
      daysAgo: 1,
    },
    {
      workOrderNumber: 'WO-1404-0215',
      productLabel: 'محصول D',
      result: 'Fail' as const,
      daysAgo: 2,
    },
  ];

  rows = base.map((b, i) => {
    const d = new Date();
    d.setDate(d.getDate() - b.daysAgo);
    const id = randomUUID();
    return {
      id,
      tenantId,
      code: `QC-8840${i + 1}`,
      productionOrderId: id,
      workOrderNumber: b.workOrderNumber,
      productLabel: b.productLabel,
      inspectionDate: d.toISOString(),
      result: b.result,
      resultFa: resultFa(b.result),
    };
  });
  inspectionsByTenant.set(tenantId, rows);
  return rows;
}

export function listQcInspectionsMemory(tenantId: string): QcInspectionRow[] {
  return [...ensureSeed(tenantId)].sort(
    (a, b) => new Date(b.inspectionDate).getTime() - new Date(a.inspectionDate).getTime(),
  );
}

function isToday(iso: string): boolean {
  const d = new Date(iso);
  const n = new Date();
  return (
    d.getFullYear() === n.getFullYear() &&
    d.getMonth() === n.getMonth() &&
    d.getDate() === n.getDate()
  );
}

export function buildQcOverview(rows: QcInspectionRow[]): QcOverviewDto {
  const today = rows.filter((r) => isToday(r.inspectionDate));
  const pass = rows.filter((r) => r.result === 'Pass').length;
  const hold = rows.filter((r) => r.result === 'Conditional').length;
  const fail = rows.filter((r) => r.result === 'Fail').length;
  const passRatePct = rows.length ? Math.round((pass / rows.length) * 100) : 0;

  return {
    kpis: {
      inspectionsToday: today.length,
      passRatePct,
      onHold: hold,
      failedLots: fail,
    },
    preview: rows.slice(0, 8),
  };
}

export function getQcOverviewMemory(tenantId: string): QcOverviewDto {
  return buildQcOverview(listQcInspectionsMemory(tenantId));
}
