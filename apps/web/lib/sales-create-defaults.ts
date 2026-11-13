import type { SalesDocLineDto } from './sales-api';

export const DEMO_SALES_LINE: SalesDocLineDto = {
  sku: 'PRD-1001',
  description: 'روغن آفتابگردان ۱۰ لیتری',
  quantity: 10,
  unit: 'عدد',
  unitPriceRial: 2_800_000,
  discountRial: 0,
  lineTotalRial: 28_000_000,
};
