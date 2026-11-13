import { BadRequestException, NotFoundException } from '@nestjs/common';
import { OPS_EVENTS, SALES_EVENTS } from '@repo/contracts';
import { TenantContext } from '@repo/domain';
import { getSalesOrderByNumberPrisma, listSalesOrdersPrisma } from '@repo/db-erp-operations';
import {
  publishSalesFulfillmentProjection,
  publishSalesReverseSupplyProjection,
  readSalesFulfillmentKpis,
  readSalesReverseSupplyKpis,
  type SalesFulfillmentKpis,
  type SalesReverseSupplyKpis,
} from '@repo/db-erp-bi-risk';
import { reserveWmsForSalesOrder } from '../../bridges/sales-wms.bridge';
import { recordDomainEvent } from '../../outbox/record-domain-event';
import type {
  CreateInvoiceBody,
  CreateOrderBody,
  CreateQuoteBody,
  CreateReturnBody,
  SalesDocLineDto,
  SalesInvoiceDto,
  SalesOrderDto,
  SalesQuoteDto,
  SalesReturnDto,
} from './sales.dto';
import { postSalesInvoiceGl, postSalesReturnGl } from '../../bridges/sales-gl.bridge';
import { nextSalesNumber } from './sales-numbering';

const quotesByTenant = new Map<string, Map<string, SalesQuoteDto>>();
const invoicesByTenant = new Map<string, Map<string, SalesInvoiceDto>>();
const ordersByTenant = new Map<string, Map<string, SalesOrderDto>>();
const returnsByTenant = new Map<string, Map<string, SalesReturnDto>>();

const SAMPLE_LINES: SalesDocLineDto[] = [
  {
    sku: 'PRD-1001',
    description: 'روغن آفتابگردان ۱۰ لیتری',
    quantity: 120,
    unit: 'عدد',
    unitPriceRial: 2_800_000,
    discountRial: 0,
    lineTotalRial: 336_000_000,
  },
  {
    sku: 'PRD-2044',
    description: 'رب گوجه صنعتی',
    quantity: 80,
    unit: 'کارتن',
    unitPriceRial: 1_200_000,
    discountRial: 5_000_000,
    lineTotalRial: 91_000_000,
  },
];

function quoteStore(): Map<string, SalesQuoteDto> {
  const tenantId = TenantContext.requireTenantId();
  let store = quotesByTenant.get(tenantId);
  if (!store) {
    store = new Map([
      [
        'QT-0323',
        {
          number: 'QT-0323',
          accountCode: 'CUS-1154',
          validUntil: '۱۴۰۵/۰۸/۲۰',
          status: 'accepted',
          totalToman: 3_150_000,
          lines: SAMPLE_LINES,
          relatedLead: 'LEAD-0197',
        },
      ],
      [
        'QT-0324',
        {
          number: 'QT-0324',
          accountCode: 'CUS-DEMO-020',
          validUntil: '۱۴۰۵/۰۸/۲۲',
          status: 'draft',
          totalToman: 4_850_000,
          lines: SAMPLE_LINES.slice(0, 1),
        },
      ],
    ]);
    quotesByTenant.set(tenantId, store);
  }
  return store;
}

function orderStore(): Map<string, SalesOrderDto> {
  const tenantId = TenantContext.requireTenantId();
  let store = ordersByTenant.get(tenantId);
  if (!store) {
    store = new Map([
      [
        'SO-0480',
        {
          number: 'SO-0480',
          accountCode: 'CUS-1110',
          quoteNumber: 'QT-0323',
          supplyStatus: 'not_reserved',
          deliveredLabel: '۰ از ۱ ردیف کامل',
          amountToman: 120_000,
          status: 'Draft',
          lines: [
            {
              sku: 'PRD-1016',
              description: 'نمک یددار تصفیه‌شده',
              quantity: 10,
              unit: 'کیلو',
              unitPriceRial: 1_200_000,
              discountRial: 0,
              lineTotalRial: 12_000_000,
            },
          ],
        },
      ],
      [
        'SO-0486',
        {
          number: 'SO-0486',
          accountCode: 'CUS-DEMO-020',
          quoteNumber: 'QT-0324',
          supplyStatus: 'not_reserved',
          deliveredLabel: '۰ از ۲ ردیف کامل',
          amountToman: 3_150_000,
          status: 'Draft',
          lines: SAMPLE_LINES.slice(0, 1),
        },
      ],
    ]);
    ordersByTenant.set(tenantId, store);
  }
  return store;
}

function invoiceStore(): Map<string, SalesInvoiceDto> {
  const tenantId = TenantContext.requireTenantId();
  let store = invoicesByTenant.get(tenantId);
  if (!store) {
    store = new Map([
      [
        'INV-140508-007',
        {
          number: 'INV-140508-007',
          customerName: 'زهرا نوری (خریدار عمده)',
          customerCode: 'CUS-1110',
          orderNumber: 'SO-0475',
          invoiceDate: '۱۴۰۵/۰۸/۱۵',
          dueDate: '۱۴۰۵/۰۹/۱۵',
          status: 'posted',
          amountToman: 31_408_786,
          glJournalId: '00000000-0000-4000-8000-invoice007',
          glDocNumber: 'N-2454',
          lines: [
            {
              sku: 'PRD-3301',
              description: 'چای کیسه‌ای صادراتی',
              quantity: 200,
              unit: 'بسته',
              unitPriceRial: 1_450_000,
              discountRial: 0,
              lineTotalRial: 290_000_000,
            },
          ],
        },
      ],
    ]);
    invoicesByTenant.set(tenantId, store);
  }
  return store;
}

function returnStore(): Map<string, SalesReturnDto> {
  const tenantId = TenantContext.requireTenantId();
  let store = returnsByTenant.get(tenantId);
  if (!store) {
    store = new Map([
      [
        'SR-2E85CE82-6333',
        {
          id: 'SR-2E85CE82-6333',
          customerName: 'زهرا نوری (خریدار عمده)',
          customerCode: 'CUS-1110',
          sourceInvoice: 'INV-140508-007',
          date: '۱۴۰۵/۰۸/۰۹',
          reason: 'آسیب ظاهری و شکستگی قوطی‌ها در حین حمل و نقل',
          grossToman: 99_000,
          taxToman: 8_910,
          creditToman: 107_910,
          status: 'posted',
          glDoc: 'N-2454',
          glJournalId: '00000000-0000-4000-8000-return6333',
          lines: SAMPLE_LINES.slice(0, 1).map((l) => ({ ...l, quantity: 5, lineTotalRial: l.unitPriceRial * 5 })),
        },
      ],
    ]);
    returnsByTenant.set(tenantId, store);
  }
  return store;
}

function rialToToman(rial: number): number {
  return Math.round(rial / 10);
}

function tomanToRial(toman: number): bigint {
  return BigInt(toman) * 10n;
}

function normalizeLines(lines: SalesDocLineDto[]): SalesDocLineDto[] {
  return lines.map((l) => {
    const qty = Number(l.quantity);
    const unit = Number(l.unitPriceRial);
    const discount = Number(l.discountRial ?? 0);
    const lineTotal =
      l.lineTotalRial > 0 ? l.lineTotalRial : Math.max(0, Math.round(qty * unit - discount));
    return { ...l, quantity: qty, unitPriceRial: unit, discountRial: discount, lineTotalRial: lineTotal };
  });
}

function totalTomanFromLines(lines: SalesDocLineDto[]): number {
  const rial = lines.reduce((s, l) => s + l.lineTotalRial, 0);
  return rialToToman(rial);
}

function jalaliTodayPlaceholder(): string {
  return '۱۴۰۵/۰۸/۲۰';
}

function defaultDueDate(): string {
  return '۱۴۰۵/۰۹/۲۰';
}

function mapPrismaOrder(row: Awaited<ReturnType<typeof listSalesOrdersPrisma>>[number]): SalesOrderDto {
  const totalRial = Number(row.total.toString());
  return {
    number: row.orderNumber,
    accountCode: row.customerId,
    supplyStatus: row.status === 'Confirmed' ? 'partial' : row.status === 'Fulfilled' ? 'ready' : 'not_reserved',
    deliveredLabel: row.status === 'Fulfilled' ? 'تحویل کامل' : '۰ از خطوط',
    amountToman: rialToToman(totalRial),
    status: row.status,
    lines: row.lines.map((l) => ({
      sku: l.productId,
      description: `کالا ${l.productId.slice(0, 8)}`,
      quantity: Number(l.quantity),
      unit: 'عدد',
      unitPriceRial: Number(l.unitPrice.toString()),
      discountRial: 0,
      lineTotalRial: Number(l.lineTotal.toString()),
    })),
  };
}

export async function listQuotes(): Promise<SalesQuoteDto[]> {
  return [...quoteStore().values()];
}

export async function getQuote(number: string): Promise<SalesQuoteDto | null> {
  return quoteStore().get(number) ?? null;
}

export async function listOrders(): Promise<SalesOrderDto[]> {
  const persistence = process.env.CRM_PERSISTENCE === '1' || process.env.CRM_PERSISTENCE === 'true';
  if (!persistence) return [...orderStore().values()];
  return (await listSalesOrdersPrisma()).map(mapPrismaOrder);
}

export async function getOrder(number: string): Promise<SalesOrderDto | null> {
  const persistence = process.env.CRM_PERSISTENCE === '1' || process.env.CRM_PERSISTENCE === 'true';
  if (persistence) {
    const db = await getSalesOrderByNumberPrisma(number);
    if (db) return mapPrismaOrder(db);
  }
  return orderStore().get(number) ?? null;
}

export async function findInvoiceByOrderNumber(orderNumber: string): Promise<SalesInvoiceDto | null> {
  const key = orderNumber.trim();
  for (const inv of invoiceStore().values()) {
    if (inv.orderNumber === key) return inv;
  }
  return null;
}

export async function listInvoices(): Promise<SalesInvoiceDto[]> {
  return [...invoiceStore().values()];
}

export async function getInvoice(number: string): Promise<SalesInvoiceDto | null> {
  return invoiceStore().get(number) ?? null;
}

export function salesDocSource(): string {
  return process.env.CRM_PERSISTENCE === '1' || process.env.CRM_PERSISTENCE === 'true'
    ? 'erp_operations'
    : 'in-memory';
}

export async function listReturns(): Promise<SalesReturnDto[]> {
  return [...returnStore().values()];
}

export async function getReturn(id: string): Promise<SalesReturnDto | null> {
  return returnStore().get(id) ?? null;
}

export async function createQuote(body: CreateQuoteBody): Promise<SalesQuoteDto> {
  if (!body.accountCode?.trim()) throw new BadRequestException('accountCode is required');
  const lines = normalizeLines(body.lines ?? []);
  if (lines.length === 0) throw new BadRequestException('At least one line is required');

  const quote: SalesQuoteDto = {
    number: nextSalesNumber('QT'),
    accountCode: body.accountCode.trim(),
    validUntil: body.validUntil?.trim() || defaultDueDate(),
    status: body.status ?? 'draft',
    totalToman: totalTomanFromLines(lines),
    lines,
    relatedLead: body.relatedLead,
  };
  quoteStore().set(quote.number, quote);
  return quote;
}

export async function createOrder(body: CreateOrderBody): Promise<SalesOrderDto> {
  if (!body.accountCode?.trim()) throw new BadRequestException('accountCode is required');
  const lines = normalizeLines(body.lines ?? []);
  if (lines.length === 0) throw new BadRequestException('At least one line is required');

  const order: SalesOrderDto = {
    number: nextSalesNumber('SO'),
    accountCode: body.accountCode.trim(),
    quoteNumber: body.quoteNumber,
    supplyStatus: 'not_reserved',
    deliveredLabel: '۰ از خطوط',
    amountToman: totalTomanFromLines(lines),
    status: 'Draft',
    lines,
  };
  orderStore().set(order.number, order);

  if (body.quoteNumber) {
    const q = quoteStore().get(body.quoteNumber);
    if (q && q.status === 'draft') {
      quoteStore().set(body.quoteNumber, { ...q, status: 'accepted' });
    }
  }

  await recordDomainEvent({
    eventType: SALES_EVENTS.SALES_ORDER_CONFIRMED,
    aggregateId: order.number,
    payload: {
      orderNumber: order.number,
      tenantId: TenantContext.requireTenantId(),
      accountCode: order.accountCode,
      amountToman: order.amountToman,
    },
  });

  return order;
}

function countSupplyOrders(): SalesFulfillmentKpis {
  const orders = [...orderStore().values()];
  return {
    ordersReadyToShip: orders.filter((o) => o.supplyStatus === 'ready').length,
    ordersShipped: orders.filter((o) => o.supplyStatus === 'shipped').length,
    ordersAwaitingSupply: orders.filter(
      (o) => o.supplyStatus === 'not_reserved' || o.supplyStatus === 'partial',
    ).length,
  };
}

export function syncSalesFulfillmentProjection(): SalesFulfillmentKpis {
  const tenantId = TenantContext.requireTenantId();
  const kpis = countSupplyOrders();
  publishSalesFulfillmentProjection(tenantId, kpis);
  return kpis;
}

function countPostedReturns(): SalesReverseSupplyKpis {
  const posted = [...returnStore().values()].filter((r) => r.status === 'posted');
  return {
    returnsPostedMonth: posted.length,
    restockReceiptsMonth: posted.filter((r) => r.wmsReceiptDocNo).length,
    returnCreditTomanMonth: posted.reduce((sum, r) => sum + r.creditToman, 0),
  };
}

export function syncSalesReverseSupplyProjection(): SalesReverseSupplyKpis {
  const tenantId = TenantContext.requireTenantId();
  const kpis = countPostedReturns();
  publishSalesReverseSupplyProjection(tenantId, kpis);
  return kpis;
}

export async function recordSalesReturnRestocked(returnId: string, receiptDocNo: string): Promise<void> {
  const tenantId = TenantContext.requireTenantId();
  const reverseSupplyKpis = syncSalesReverseSupplyProjection();
  await recordDomainEvent({
    eventType: SALES_EVENTS.SALES_RETURN_RESTOCKED,
    aggregateId: returnId,
    payload: {
      returnId,
      receiptDocNo,
      tenantId,
      reverseSupplyKpis,
    },
    sourceSchema: 'erp_operations',
  });
}

export async function getSalesFulfillmentOverview(): Promise<{
  ordersReadyToShip: number;
  ordersShipped: number;
  ordersAwaitingSupply: number;
  returnsPostedMonth: number;
  restockReceiptsMonth: number;
  returnCreditTomanMonth: number;
  sources: string[];
}> {
  const tenantId = TenantContext.requireTenantId();
  const fulfillment =
    readSalesFulfillmentKpis(tenantId) ??
    (() => {
      const kpis = syncSalesFulfillmentProjection();
      return { ...kpis, sources: ['projection_sales_fulfillment'] as string[] };
    })();

  const reverse =
    readSalesReverseSupplyKpis(tenantId) ??
    (() => {
      const kpis = syncSalesReverseSupplyProjection();
      return { ...kpis, sources: ['projection_sales_reverse_supply'] as string[] };
    })();

  return {
    ordersReadyToShip: fulfillment.ordersReadyToShip,
    ordersShipped: fulfillment.ordersShipped,
    ordersAwaitingSupply: fulfillment.ordersAwaitingSupply,
    returnsPostedMonth: reverse.returnsPostedMonth,
    restockReceiptsMonth: reverse.restockReceiptsMonth,
    returnCreditTomanMonth: reverse.returnCreditTomanMonth,
    sources: [...new Set([...fulfillment.sources, ...reverse.sources])],
  };
}

export async function markSalesOrderShipped(orderNumber: string, issueDocNo: string): Promise<SalesOrderDto> {
  const key = orderNumber.trim();
  const order = orderStore().get(key);
  if (!order) throw new NotFoundException(`Order ${key} not found`);
  if (order.supplyStatus === 'shipped') return order;

  const updated: SalesOrderDto = {
    ...order,
    supplyStatus: 'shipped',
    status: 'Fulfilled',
    deliveredLabel: `تحویل انبار — ${issueDocNo}`,
  };
  orderStore().set(key, updated);

  const tenantId = TenantContext.requireTenantId();
  const fulfillmentKpis = syncSalesFulfillmentProjection();
  await recordDomainEvent({
    eventType: SALES_EVENTS.SALES_ORDER_SHIPPED,
    aggregateId: key,
    payload: {
      orderNumber: key,
      issueDocNo,
      tenantId,
      accountCode: updated.accountCode,
      fulfillmentKpis,
    },
    sourceSchema: 'erp_operations',
  });
  await recordDomainEvent({
    eventType: OPS_EVENTS.DELIVERY_CONFIRMED,
    aggregateId: issueDocNo,
    payload: {
      orderNumber: key,
      issueDocNo,
      tenantId,
    },
    sourceSchema: 'erp_operations',
  });

  return updated;
}

export async function confirmOrderSupply(orderNumber: string): Promise<{
  order: SalesOrderDto;
  reservations: Array<{ id: string; sku: string; qty: number }>;
}> {
  const key = orderNumber.trim();
  const order = orderStore().get(key);
  if (!order) throw new NotFoundException(`Order ${key} not found`);
  if (order.supplyStatus === 'ready') {
    return { order, reservations: [] };
  }
  if (!order.lines.length) throw new BadRequestException('Order has no lines to reserve');

  const reservations = await reserveWmsForSalesOrder(key, order.lines);

  const updated: SalesOrderDto = {
    ...order,
    supplyStatus: 'ready',
    status: 'Confirmed',
    deliveredLabel: `${order.lines.length} از ${order.lines.length} ردیف رزرو شد`,
  };
  orderStore().set(key, updated);

  const tenantId = TenantContext.requireTenantId();
  const fulfillmentKpis = syncSalesFulfillmentProjection();
  await recordDomainEvent({
    eventType: SALES_EVENTS.SALES_ORDER_CONFIRMED,
    aggregateId: key,
    payload: {
      orderNumber: key,
      tenantId,
      accountCode: updated.accountCode,
      amountToman: updated.amountToman,
      supplyStatus: updated.supplyStatus,
      reservationIds: reservations.map((r) => r.id),
      fulfillmentKpis,
    },
  });

  return {
    order: updated,
    reservations: reservations.map((r) => ({ id: r.id, sku: r.sku, qty: r.qty })),
  };
}

export async function createInvoice(body: CreateInvoiceBody): Promise<SalesInvoiceDto> {
  if (!body.customerName?.trim()) throw new BadRequestException('customerName is required');
  if (!body.orderNumber?.trim()) throw new BadRequestException('orderNumber is required');
  const lines = normalizeLines(body.lines ?? []);
  if (lines.length === 0) throw new BadRequestException('At least one line is required');

  const invoice: SalesInvoiceDto = {
    number: nextSalesNumber('INV'),
    customerName: body.customerName.trim(),
    customerCode: body.customerCode?.trim(),
    orderNumber: body.orderNumber.trim(),
    invoiceDate: body.invoiceDate?.trim() || jalaliTodayPlaceholder(),
    dueDate: body.dueDate?.trim() || defaultDueDate(),
    status: 'draft',
    amountToman: totalTomanFromLines(lines),
    lines,
  };
  invoiceStore().set(invoice.number, invoice);
  return invoice;
}

export async function postInvoice(number: string, approverUserId: string): Promise<SalesInvoiceDto> {
  const invoice = invoiceStore().get(number);
  if (!invoice) throw new NotFoundException(`Invoice ${number} not found`);
  if (invoice.status === 'posted') return invoice;

  const tenantId = TenantContext.requireTenantId();
  const amountRial = tomanToRial(invoice.amountToman);
  const gl = await postSalesInvoiceGl({
    tenantId,
    approverUserId,
    invoiceNumber: invoice.number,
    customerLabel: invoice.customerName,
    amountRial,
  });

  const posted: SalesInvoiceDto = {
    ...invoice,
    status: 'posted',
    glJournalId: gl.journalEntryId,
    glDocNumber: gl.glDocNumber,
  };
  invoiceStore().set(number, posted);

  await recordDomainEvent({
    eventType: SALES_EVENTS.SALES_INVOICE_POSTED,
    aggregateId: posted.number,
    payload: {
      invoiceNumber: posted.number,
      tenantId,
      orderNumber: posted.orderNumber,
      amountToman: posted.amountToman,
      glJournalId: gl.journalEntryId,
      glDocNumber: gl.glDocNumber,
    },
  });

  return posted;
}

export async function createReturn(body: CreateReturnBody): Promise<SalesReturnDto> {
  if (!body.sourceInvoice?.trim()) throw new BadRequestException('sourceInvoice is required');
  if (!body.reason?.trim()) throw new BadRequestException('reason is required');
  const lines = normalizeLines(body.lines ?? []);
  if (lines.length === 0) throw new BadRequestException('At least one line is required');

  const grossToman = totalTomanFromLines(lines);
  const taxToman = body.taxToman ?? Math.round(grossToman * 0.09);
  const creditToman = grossToman + taxToman;

  const memo: SalesReturnDto = {
    id: nextSalesNumber('SR'),
    customerName: body.customerName.trim() || 'مشتری',
    customerCode: body.customerCode?.trim(),
    sourceInvoice: body.sourceInvoice.trim(),
    date: body.date?.trim() || jalaliTodayPlaceholder(),
    reason: body.reason.trim(),
    grossToman,
    taxToman,
    creditToman,
    status: 'draft',
    lines,
  };
  returnStore().set(memo.id, memo);
  return memo;
}

export async function createReturnFromInvoice(
  invoiceNumber: string,
  reason = 'برگشت کالا پس از فروش',
): Promise<SalesReturnDto> {
  const key = invoiceNumber.trim();
  const invoice = invoiceStore().get(key);
  if (!invoice) throw new NotFoundException(`Invoice ${key} not found`);
  if (invoice.status !== 'posted') {
    throw new BadRequestException(`Invoice ${key} must be posted before creating a return`);
  }

  return createReturn({
    customerName: invoice.customerName,
    customerCode: invoice.customerCode,
    sourceInvoice: invoice.number,
    reason: reason.trim(),
    lines: invoice.lines,
  });
}

export function attachWmsReceiptToReturn(returnId: string, receiptDocNo: string): SalesReturnDto {
  const memo = returnStore().get(returnId);
  if (!memo) throw new NotFoundException(`Return ${returnId} not found`);
  const updated: SalesReturnDto = { ...memo, wmsReceiptDocNo: receiptDocNo };
  returnStore().set(returnId, updated);
  return updated;
}

export async function postReturn(id: string, approverUserId: string): Promise<SalesReturnDto> {
  const memo = returnStore().get(id);
  if (!memo) throw new NotFoundException(`Return ${id} not found`);
  if (memo.status === 'posted') return memo;

  const tenantId = TenantContext.requireTenantId();
  const creditRial = tomanToRial(memo.creditToman);
  const gl = await postSalesReturnGl({
    tenantId,
    approverUserId,
    returnId: memo.id,
    customerLabel: memo.customerName,
    creditRial,
    sourceInvoice: memo.sourceInvoice,
  });

  const posted: SalesReturnDto = {
    ...memo,
    status: 'posted',
    glJournalId: gl.journalEntryId,
    glDoc: gl.glDocNumber,
  };
  returnStore().set(id, posted);

  const reverseSupplyKpis = syncSalesReverseSupplyProjection();
  await recordDomainEvent({
    eventType: SALES_EVENTS.SALES_RETURN_POSTED,
    aggregateId: posted.id,
    payload: {
      returnId: posted.id,
      tenantId,
      sourceInvoice: posted.sourceInvoice,
      creditToman: posted.creditToman,
      glJournalId: gl.journalEntryId,
      glDoc: gl.glDocNumber,
      reverseSupplyKpis,
    },
    sourceSchema: 'erp_finance',
  });

  return posted;
}
