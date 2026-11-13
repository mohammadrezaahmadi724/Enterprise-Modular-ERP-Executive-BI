export type PurchaseRequestStatus = 'draft' | 'sent' | 'approved' | 'rejected' | 'canceled';

export type PurchaseOrderStatus =
  | 'draft'
  | 'sent'
  | 'approved'
  | 'partial_receipt'
  | 'full_receipt'
  | 'canceled';

export type PurchaseRequestLineDto = {
  sku?: string;
  description?: string;
  quantity: number;
  unit: string;
  estimatedUnitToman?: number;
};

export type PurchaseRequestDto = {
  number: string;
  title: string;
  purpose?: string;
  warehouse?: string;
  project?: string;
  costCenter?: string;
  requestDate: string;
  needDate?: string;
  note?: string;
  status: PurchaseRequestStatus;
  estimatedToman: number;
  lines: PurchaseRequestLineDto[];
};

export type CreatePurchaseRequestBody = {
  title: string;
  purpose?: string;
  warehouse?: string;
  project?: string;
  costCenter?: string;
  requestDate: string;
  needDate?: string;
  note?: string;
  lines: PurchaseRequestLineDto[];
};

export type PurchaseOrderLineDto = {
  sku: string;
  quantity: number;
  unit: string;
  unitPriceToman: number;
  lineTotalToman: number;
  /** تجمع رسیدهای WMS برای این قلم */
  receivedQuantity?: number;
};

export type PurchaseOrderDto = {
  number: string;
  purchaseRequestNumber?: string;
  project?: string;
  supplierCode: string;
  supplierName: string;
  orderDate: string;
  deliveryDate?: string;
  note?: string;
  status: PurchaseOrderStatus;
  totalToman: number;
  lines: PurchaseOrderLineDto[];
  overdue?: boolean;
  dueThisWeek?: boolean;
};

export type SupplierInvoiceDto = {
  number: string;
  poNumber: string;
  supplierName: string;
  amountToman: number;
  status: 'draft' | 'posted';
  orderDate: string;
};

export type CreatePurchaseOrderBody = {
  purchaseRequestNumber?: string;
  project?: string;
  supplierCode: string;
  supplierName: string;
  orderDate: string;
  deliveryDate?: string;
  note?: string;
  lines: Array<{
    sku: string;
    quantity: number;
    unit: string;
    unitPriceToman: number;
  }>;
};

export type SupplierDto = {
  code: string;
  name: string;
  openOrders: number;
  totalOrders: number;
  lastOrderDate?: string;
  mobile?: string;
  nationalId?: string;
  economicCode?: string;
  address?: string;
  entityType?: 'legal' | 'individual';
};

export type CreateSupplierBody = {
  name: string;
  code?: string;
  mobile?: string;
  phone?: string;
  nationalId?: string;
  economicCode?: string;
  address?: string;
  entityType?: 'legal' | 'individual';
};

export type RfqStatus = 'draft' | 'open' | 'comparing' | 'awarded' | 'closed';

export type RfqQuoteLineDto = {
  sku: string;
  quantity: number;
  unit: string;
  unitPriceToman: number;
  leadDays?: number;
};

export type RfqQuoteDto = {
  supplierCode: string;
  supplierName: string;
  submittedAt: string;
  lines: RfqQuoteLineDto[];
  totalToman: number;
};

export type RfqDto = {
  number: string;
  title: string;
  purchaseRequestNumber?: string;
  deadline: string;
  status: RfqStatus;
  invitedSupplierCodes: string[];
  quotes: RfqQuoteDto[];
  awardedSupplierCode?: string;
  purchaseOrderNumber?: string;
};

export type CreateRfqBody = {
  title: string;
  purchaseRequestNumber?: string;
  deadline: string;
  invitedSupplierCodes: string[];
};

export type AwardRfqBody = {
  supplierCode: string;
  orderDate?: string;
  deliveryDate?: string;
};

export type ProcurementReportsDto = {
  kpis: ProcurementOverviewDto['kpis'];
  monthlyTrend: Array<{ period: string; orderToman: number }>;
  counts: {
    purchaseRequests: number;
    purchaseOrders: number;
    openRfqs: number;
    awardedRfqs: number;
    suppliers: number;
  };
  supplierOpenPo: Array<{
    supplierCode: string;
    supplierName: string;
    openOrderCount: number;
    openToman: number;
  }>;
};

export type AddRfqQuoteBody = {
  supplierCode: string;
  supplierName: string;
  lines: Array<{
    sku: string;
    quantity: number;
    unit: string;
    unitPriceToman: number;
    leadDays?: number;
  }>;
};

export type ProcurementOverviewDto = {
  kpis: {
    pendingRequestToman: number;
    pendingRequestIds: string[];
    openPoToman: number;
    overduePoCount: number;
    dueThisWeekPoCount: number;
    incompleteReceiptCount: number;
    activeSuppliers: number;
    newSuppliersThisYear: number;
  };
  monthlyTrend: Array<{ period: string; orderToman: number }>;
  recentRequests: PurchaseRequestDto[];
};

export type { ReceivePurchaseOrderBody } from '../../bridges/procurement-wms.bridge';
