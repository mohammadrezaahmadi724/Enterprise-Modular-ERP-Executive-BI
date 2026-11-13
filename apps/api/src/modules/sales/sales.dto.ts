export type SalesDocLineDto = {
  sku: string;
  description: string;
  quantity: number;
  unit: string;
  unitPriceRial: number;
  discountRial: number;
  lineTotalRial: number;
};

export type SalesQuoteDto = {
  number: string;
  accountCode: string;
  validUntil: string;
  status: 'draft' | 'accepted' | 'rejected' | 'expired';
  totalToman: number;
  lines: SalesDocLineDto[];
  relatedLead?: string;
};

export type SalesOrderDto = {
  number: string;
  accountCode: string;
  quoteNumber?: string;
  supplyStatus: 'not_reserved' | 'partial' | 'ready' | 'shipped';
  deliveredLabel: string;
  amountToman: number;
  status: string;
  lines: SalesDocLineDto[];
};

export type SalesInvoiceDto = {
  number: string;
  customerName: string;
  customerCode?: string;
  orderNumber: string;
  invoiceDate: string;
  dueDate: string;
  status: 'draft' | 'posted';
  amountToman: number;
  lines: SalesDocLineDto[];
  glJournalId?: string;
  glDocNumber?: string;
};

export type SalesReturnDto = {
  id: string;
  customerName: string;
  customerCode?: string;
  sourceInvoice: string;
  date: string;
  reason: string;
  grossToman: number;
  taxToman: number;
  creditToman: number;
  status: 'draft' | 'posted';
  glJournalId?: string;
  glDoc?: string;
  wmsReceiptDocNo?: string;
  lines: SalesDocLineDto[];
};

export type CreateQuoteBody = {
  accountCode: string;
  validUntil?: string;
  relatedLead?: string;
  status?: SalesQuoteDto['status'];
  lines: SalesDocLineDto[];
};

export type CreateOrderBody = {
  accountCode: string;
  quoteNumber?: string;
  lines: SalesDocLineDto[];
};

export type FulfillSalesOrderBody = {
  postCogs?: boolean;
  autoPostInvoice?: boolean;
};

export type SalesOrderFulfillmentDto = {
  orderNumber: string;
  supplyStatus: SalesOrderDto['supplyStatus'];
  wmsIssueDocNo: string | null;
  wmsIssueGlDocNumber?: string;
  invoiceNumber: string | null;
  invoiceStatus: SalesInvoiceDto['status'] | null;
  invoiceGlDocNumber?: string;
  activeReservationCount: number;
};

export type CreateInvoiceBody = {
  customerName: string;
  customerCode?: string;
  orderNumber: string;
  invoiceDate?: string;
  dueDate?: string;
  lines: SalesDocLineDto[];
};

export type CreateReturnBody = {
  customerName: string;
  customerCode?: string;
  sourceInvoice: string;
  reason: string;
  date?: string;
  lines: SalesDocLineDto[];
  taxToman?: number;
};

export type PostReturnBody = {
  restock?: boolean;
};

export type SalesFulfillmentOverviewDto = {
  ordersReadyToShip: number;
  ordersShipped: number;
  ordersAwaitingSupply: number;
  returnsPostedMonth: number;
  restockReceiptsMonth: number;
  returnCreditTomanMonth: number;
  sources: string[];
};
