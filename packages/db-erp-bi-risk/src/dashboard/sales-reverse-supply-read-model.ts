import { getProjectionSlice, seedProjection } from './metric-query.js';

export type SalesReverseSupplyKpis = {
  returnsPostedMonth: number;
  restockReceiptsMonth: number;
  returnCreditTomanMonth: number;
};

const PROJECTION = 'projection_sales_reverse_supply';
const SLICE = 'hub';

export function publishSalesReverseSupplyProjection(
  tenantId: string,
  kpis: SalesReverseSupplyKpis,
): void {
  seedProjection(tenantId, PROJECTION, SLICE, {
    returnsPostedMonth: kpis.returnsPostedMonth,
    restockReceiptsMonth: kpis.restockReceiptsMonth,
    returnCreditTomanMonth: kpis.returnCreditTomanMonth,
  });
}

export function readSalesReverseSupplyKpis(
  tenantId: string,
): (SalesReverseSupplyKpis & { sources: string[] }) | null {
  const slice = getProjectionSlice(tenantId, PROJECTION, SLICE);
  if (!slice) return null;
  return {
    returnsPostedMonth: slice.returnsPostedMonth ?? 0,
    restockReceiptsMonth: slice.restockReceiptsMonth ?? 0,
    returnCreditTomanMonth: slice.returnCreditTomanMonth ?? 0,
    sources: ['projection_sales_reverse_supply'],
  };
}
