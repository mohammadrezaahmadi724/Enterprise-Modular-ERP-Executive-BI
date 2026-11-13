import { buildQcOverview, getQcOverviewMemory, listQcInspectionsMemory } from './qc-store.js';
import { listQcInspectionsPrisma, qcPersistenceEnabled } from '../prisma/qc-inspection.repository.js';
import type { QcOverviewDto } from './qc.types.js';

export function qcSource(): string {
  return qcPersistenceEnabled() ? 'qc_postgresql' : 'qc_memory';
}

export async function getQcOverview(tenantId: string): Promise<QcOverviewDto> {
  const fromDb = await listQcInspectionsPrisma(tenantId);
  if (fromDb && fromDb.length > 0) {
    return buildQcOverview(fromDb);
  }
  return getQcOverviewMemory(tenantId);
}

export async function listQcInspections(tenantId: string) {
  const fromDb = await listQcInspectionsPrisma(tenantId);
  if (fromDb && fromDb.length > 0) return fromDb;
  return listQcInspectionsMemory(tenantId);
}

export { resetQcStore } from './qc-store.js';
