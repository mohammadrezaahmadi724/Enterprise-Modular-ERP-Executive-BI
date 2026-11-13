export type WmsStockRowDto = {
  sku: string;
  name: string;
  warehouse: string;
  onHand: number;
  reserved: number;
  blocked: number;
  available: number;
  status: 'ok' | 'low' | 'out';
};

export type WmsMovementDto = {
  id: string;
  type: 'receipt' | 'issue' | 'transfer';
  date: string;
  status: 'posted';
};

export type WmsLineDto = {
  sku: string;
  warehouse: string;
  destWarehouse?: string;
  location?: string;
  quantity: number;
  unitPriceRial?: number;
  batch?: string;
  /** ISO date (YYYY-MM-DD) همراه رسید بچ */
  batchExpiry?: string;
  serial?: string;
  batchAllocations?: Array<{ batchNo: string; qty: number }>;
};

export type WmsReservationDto = {
  id: string;
  sku: string;
  itemName: string;
  warehouse: string;
  warehouseLabel: string;
  reference: string;
  qty: number;
  expiry: string | null;
  status: 'active' | 'released' | 'consumed';
};

export type WmsStockDocDto = {
  docNo: string;
  date: string;
  party: string;
  orderRef: string;
  source: string;
  status: 'posted';
  lines: WmsLineDto[];
  glJournalId?: string;
  glDocNumber?: string;
};

export type WmsOverviewDto = {
  activeWarehouses: number;
  recentReservations: number;
  criticalSkus: number;
  /** بهرهای فعال با انقضا در ۳۰ روز آینده */
  expiringLotsWithin30: number;
  stockPreview: WmsStockRowDto[];
  recentMovements: WmsMovementDto[];
};

export type WmsFefoPickDto = {
  sku: string;
  warehouse: string;
  quantity: number;
  allocations: Array<{ batchNo: string; qty: number; expiryDate: string | null }>;
  uncoveredQty: number;
  batchOnHand: number;
  fefo: true;
};

export type CreateReservationBody = {
  sku: string;
  warehouse: string;
  location?: string;
  quantity: number;
  reference: string;
  expiry?: string;
};

export type CreateStockDocBody = {
  documentDate?: string;
  party?: string;
  orderRef?: string;
  reference?: string;
  lines: WmsLineDto[];
  /** ثبت COGS (۵۱۰۱ / ۱۳۰۱) پس از خروج — نیاز x-user-id */
  postCogs?: boolean;
  autoInvoice?: boolean;
  autoPostInvoice?: boolean;
  /** رسید ورود ناشی از برگشت فروش — برای projection تدارک معکوس */
  salesReturnId?: string;
};

export type WmsKardexDto = {
  entries: Array<{
    id: string;
    at: string;
    sku: string;
    warehouse: string;
    movement: string;
    qtyIn: number;
    qtyOut: number;
    reference: string;
    unitPriceRial?: number;
  }>;
  totals: { ok: number; reservedBlocked: number; out: number };
  byWarehouse: Array<{ code: string; rows: number; ok: number; reserved: number; out: number }>;
};

export type StocktakingSessionDto = {
  id: string;
  warehouse: string;
  warehouseLabel: string;
  countDate: string;
  status: 'draft' | 'reconciled';
  totalLines: number;
  varianceLines: number;
  varianceToman: number;
  glJournalId?: string;
  glDocNumber?: string;
  lines?: Array<{ sku: string; countedQty: number; systemQty: number }>;
};

export type WmsBatchDto = {
  batchNo: string;
  sku: string;
  itemName: string;
  warehouse: string;
  qty: number;
  expiryDate: string | null;
  status: 'active' | 'quarantine' | 'expired' | 'blocked';
  receivedAt: string;
};

export type WmsValuationReconDto = {
  bookValueRial: number;
  glInventoryRial: number;
  varianceRial: number;
  pricedSkuCount: number;
  stockRowCount: number;
};

export type CreateBatchBody = {
  sku: string;
  warehouse: string;
  qty: number;
  batchNo?: string;
  expiryDate?: string;
};

export type CreateStocktakingBody = {
  warehouse: string;
  countDate?: string;
};

export type UpdateStocktakingLineBody = {
  sku: string;
  countedQty: number;
};

export type WmsTrackingContractDto = {
  sku: string;
  name: string;
  baseUnit: string;
  method: string;
  decimals: number;
  fefo: boolean;
  minShelf: string;
  flags: string[];
  version: number;
};

export type WmsSerialDto = {
  serial: string;
  sku: string;
  itemName: string;
  warehouse: string;
  batch?: string;
  status: string;
};

export type RegisterSerialsBody = {
  warehouse: string;
  sku: string;
  serials: string[];
  batch?: string;
};

export type CreateAdjustmentBody = {
  sku: string;
  warehouse: string;
  location?: string;
  countedQty: number;
  reason: string;
  batch?: string;
  serial?: string;
  unitValueRial?: number;
};

export type ReconciliationSessionDto = {
  id: string;
  runAt: string;
  status: 'completed';
  layersChecked: string[];
};
