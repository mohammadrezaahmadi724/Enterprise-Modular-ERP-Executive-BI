import { getProjectionSlice, seedProjection } from './metric-query.js';

export type ProcurementHubKpis = {
  pendingRequestToman: number;
  openPoToman: number;
  overduePoCount: number;
  dueThisWeekPoCount: number;
  incompleteReceiptCount: number;
  activeSuppliers: number;
  newSuppliersThisYear: number;
};

const PROJECTION = 'projection_procurement_hub';
const SLICE = 'overview';

export function publishProcurementHubProjection(tenantId: string, kpis: ProcurementHubKpis): void {
  seedProjection(tenantId, PROJECTION, SLICE, {
    pendingRequestToman: kpis.pendingRequestToman,
    openPoToman: kpis.openPoToman,
    overduePoCount: kpis.overduePoCount,
    dueThisWeekPoCount: kpis.dueThisWeekPoCount,
    incompleteReceiptCount: kpis.incompleteReceiptCount,
    activeSuppliers: kpis.activeSuppliers,
    newSuppliersThisYear: kpis.newSuppliersThisYear,
  });
}

export function readProcurementHubKpis(
  tenantId: string,
): (ProcurementHubKpis & { sources: string[] }) | null {
  const slice = getProjectionSlice(tenantId, PROJECTION, SLICE);
  if (!slice) return null;
  return {
    pendingRequestToman: slice.pendingRequestToman ?? 0,
    openPoToman: slice.openPoToman ?? 0,
    overduePoCount: slice.overduePoCount ?? 0,
    dueThisWeekPoCount: slice.dueThisWeekPoCount ?? 0,
    incompleteReceiptCount: slice.incompleteReceiptCount ?? 0,
    activeSuppliers: slice.activeSuppliers ?? 0,
    newSuppliersThisYear: slice.newSuppliersThisYear ?? 0,
    sources: ['projection_procurement_hub'],
  };
}

export type ProcurementMonthlyPoint = { period: string; orderToman: number };

export function publishProcurementMonthlyTrend(
  tenantId: string,
  points: ProcurementMonthlyPoint[],
): void {
  points.forEach((p, i) => {
    seedProjection(tenantId, PROJECTION, `month:${p.period}`, {
      orderToman: p.orderToman,
      sortKey: i,
    });
  });
}

export function readProcurementMonthlyTrend(tenantId: string): ProcurementMonthlyPoint[] {
  const periods = ['1405/02', '1405/03', '1405/04', '1405/05', '1405/06', '1405/07', '1405/08'];
  return periods.map((period) => {
    const slice = getProjectionSlice(tenantId, PROJECTION, `month:${period}`);
    return { period, orderToman: slice?.orderToman ?? 0 };
  });
}
