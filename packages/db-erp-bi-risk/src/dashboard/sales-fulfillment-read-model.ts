import { getProjectionSlice, seedProjection } from './metric-query.js';

export type SalesFulfillmentKpis = {
  ordersReadyToShip: number;
  ordersShipped: number;
  ordersAwaitingSupply: number;
};

const PROJECTION = 'projection_sales_fulfillment';
const SLICE = 'hub';

export function publishSalesFulfillmentProjection(tenantId: string, kpis: SalesFulfillmentKpis): void {
  seedProjection(tenantId, PROJECTION, SLICE, {
    ordersReadyToShip: kpis.ordersReadyToShip,
    ordersShipped: kpis.ordersShipped,
    ordersAwaitingSupply: kpis.ordersAwaitingSupply,
  });
}

export function readSalesFulfillmentKpis(
  tenantId: string,
): (SalesFulfillmentKpis & { sources: string[] }) | null {
  const slice = getProjectionSlice(tenantId, PROJECTION, SLICE);
  if (!slice) return null;
  return {
    ordersReadyToShip: slice.ordersReadyToShip ?? 0,
    ordersShipped: slice.ordersShipped ?? 0,
    ordersAwaitingSupply: slice.ordersAwaitingSupply ?? 0,
    sources: ['projection_sales_fulfillment'],
  };
}
