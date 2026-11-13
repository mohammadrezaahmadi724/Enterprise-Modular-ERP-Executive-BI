import type { SalesOrderApi } from './sales-api';
import type { WmsLineApi } from './wms-api';

/** هم‌تراز با apps/api bridge SALES_WMS_WAREHOUSE_BY_SKU */
const WAREHOUSE_BY_SKU: Record<string, string> = {
  'PRD-1016': 'WH-ESF',
  'PRD-1001': 'WH-ESF',
  'PRD-2044': 'WH-THR',
  'PRD-CHAY': 'WH-MSH',
  'PRD-BRN3': 'WH-THR',
};

export function wmsLinesFromSalesOrder(order: SalesOrderApi): WmsLineApi[] {
  return order.lines.map((line) => ({
    sku: line.sku,
    warehouse: WAREHOUSE_BY_SKU[line.sku] ?? 'WH-ESF',
    quantity: line.quantity,
    location: 'A-01-02',
  }));
}
