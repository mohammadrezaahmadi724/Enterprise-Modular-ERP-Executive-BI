import { getProjectionSlice, seedProjection } from './metric-query.js';

export type WmsHubKpis = {
  activeWarehouses: number;
  recentReservations: number;
  criticalSkus: number;
  expiringLotsWithin30?: number;
};

const PROJECTION = 'projection_wms_overview';
const SLICE = 'hub';

export function publishWmsOverviewProjection(tenantId: string, kpis: WmsHubKpis): void {
  seedProjection(tenantId, PROJECTION, SLICE, {
    activeWarehouses: kpis.activeWarehouses,
    recentReservations: kpis.recentReservations,
    criticalSkus: kpis.criticalSkus,
    expiringLotsWithin30: kpis.expiringLotsWithin30 ?? 0,
  });
}

export function publishWmsExpiryKpi(tenantId: string, expiringLotsWithin30: number): void {
  const hub = readWmsHubKpis(tenantId);
  publishWmsOverviewProjection(tenantId, {
    activeWarehouses: hub?.activeWarehouses ?? 0,
    recentReservations: hub?.recentReservations ?? 0,
    criticalSkus: hub?.criticalSkus ?? 0,
    expiringLotsWithin30,
  });
}

export function readWmsHubKpis(tenantId: string): (WmsHubKpis & { sources: string[] }) | null {
  const slice = getProjectionSlice(tenantId, PROJECTION, SLICE);
  if (!slice) return null;
  return {
    activeWarehouses: slice.activeWarehouses ?? 0,
    recentReservations: slice.recentReservations ?? 0,
    criticalSkus: slice.criticalSkus ?? 0,
    expiringLotsWithin30: slice.expiringLotsWithin30 ?? 0,
    sources: ['projection_wms_overview'],
  };
}
