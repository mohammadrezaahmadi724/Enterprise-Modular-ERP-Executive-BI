import type { WmsLineApi } from './wms-api';

export type WmsDocVariant = 'receipt' | 'issue' | 'transfer';

export function createEmptyWmsLine(variant: WmsDocVariant): WmsLineApi {
  const base: WmsLineApi = {
    sku: 'PRD-CHAY',
    warehouse: 'WH-MSH',
    quantity: 1,
    location: 'A-01-02',
  };
  if (variant === 'receipt') {
    return { ...base, unitPriceRial: 1_200_000, batch: '', batchExpiry: '' };
  }
  if (variant === 'transfer') {
    return { ...base, destWarehouse: 'WH-THR' };
  }
  return base;
}
