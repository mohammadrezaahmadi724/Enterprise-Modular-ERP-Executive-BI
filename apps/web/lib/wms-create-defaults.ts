import type { WmsLineApi } from './wms-api';

export const DEMO_WMS_LINE: WmsLineApi = {
  sku: 'PRD-1016',
  warehouse: 'WH-ESF',
  quantity: 10,
  unitPriceRial: 1_200_000,
  location: 'A-01-02',
};

export const DEMO_WMS_TRANSFER_LINE: WmsLineApi = {
  sku: 'PRD-CHAY',
  warehouse: 'WH-MSH',
  destWarehouse: 'WH-THR',
  quantity: 5,
  location: 'B-02-01',
};
