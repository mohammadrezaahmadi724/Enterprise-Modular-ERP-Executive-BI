import { BadRequestException, NotFoundException } from '@nestjs/common';
import type {
  FulfillSalesOrderBody,
  SalesInvoiceDto,
  SalesOrderDto,
  SalesOrderFulfillmentDto,
} from '../modules/sales/sales.dto';
import {
  createInvoice,
  findInvoiceByOrderNumber,
  getOrder,
  postInvoice,
} from '../modules/sales/sales.service';
import {
  createWmsIssueForSalesOrder,
  salesOrderLinesToWmsIssueLines,
} from './sales-wms.bridge';
import type { WmsStockDocDto } from '../modules/wms/wms.dto';
import {
  ensureBatchesForIssueLines,
  listIssues,
  listReservations,
} from '../modules/wms/wms.service';

const ACCOUNT_CUSTOMER_LABEL: Record<string, string> = {
  'CUS-1110': 'مشتری نمونه — شرکت ید',
  'CUS-DEMO-020': 'مشتری دمو',
};

export async function createInvoiceFromShippedOrder(orderNumber: string): Promise<SalesInvoiceDto> {
  const key = orderNumber.trim();
  const order = await getOrder(key);
  if (!order) throw new NotFoundException(`Order ${key} not found`);
  if (order.supplyStatus !== 'shipped') {
    throw new BadRequestException(
      `Order ${key} must be shipped before invoicing (supplyStatus=${order.supplyStatus})`,
    );
  }

  const existing = await findInvoiceByOrderNumber(key);
  if (existing) return existing;

  return createInvoice({
    customerName: ACCOUNT_CUSTOMER_LABEL[order.accountCode] ?? order.accountCode,
    customerCode: order.accountCode,
    orderNumber: order.number,
    lines: order.lines,
  });
}

export async function ensureInvoiceForShippedOrder(
  orderNumber: string,
  options?: { post?: boolean; approverUserId?: string },
): Promise<SalesInvoiceDto> {
  let invoice = await findInvoiceByOrderNumber(orderNumber.trim());
  if (!invoice) {
    invoice = await createInvoiceFromShippedOrder(orderNumber);
  }
  if (options?.post && options.approverUserId?.trim() && invoice.status === 'draft') {
    invoice = await postInvoice(invoice.number, options.approverUserId.trim());
  }
  return invoice;
}

export async function getOrderFulfillment(orderNumber: string): Promise<SalesOrderFulfillmentDto> {
  const key = orderNumber.trim();
  const order = await getOrder(key);
  if (!order) throw new NotFoundException(`Order ${key} not found`);

  const invoice = await findInvoiceByOrderNumber(key);
  const issue = (await listIssues()).find((i) => i.orderRef === key) ?? null;
  const activeReservationCount = (await listReservations()).filter(
    (r) => r.reference === key && r.status === 'active',
  ).length;

  return {
    orderNumber: key,
    supplyStatus: order.supplyStatus,
    wmsIssueDocNo: issue?.docNo ?? null,
    wmsIssueGlDocNumber: issue?.glDocNumber,
    invoiceNumber: invoice?.number ?? null,
    invoiceStatus: invoice?.status ?? null,
    invoiceGlDocNumber: invoice?.glDocNumber,
    activeReservationCount,
  };
}

export type FulfillSalesOrderResult = {
  order: SalesOrderDto;
  issue: WmsStockDocDto;
  invoice?: SalesInvoiceDto;
  replay: boolean;
};

/**
 * Saga تحویل: خروج WMS + shipped + پیش‌فاکتور (+ COGS / post اختیاری).
 * در وضعیت shipped قبلی — idempotent replay بدون سند تکراری.
 */
export async function fulfillSalesOrder(
  orderNumber: string,
  body: FulfillSalesOrderBody,
  approverUserId?: string,
): Promise<FulfillSalesOrderResult> {
  const key = orderNumber.trim();
  const order0 = await getOrder(key);
  if (!order0) throw new NotFoundException(`Order ${key} not found`);

  if (order0.supplyStatus === 'shipped') {
    const issue = (await listIssues()).find((i) => i.orderRef === key);
    if (!issue) {
      throw new BadRequestException(`Order ${key} is shipped but WMS issue document was not found`);
    }
    const invoice = await findInvoiceByOrderNumber(key);
    return {
      order: order0,
      issue,
      invoice: invoice ?? undefined,
      replay: true,
    };
  }

  if (order0.supplyStatus !== 'ready') {
    throw new BadRequestException(
      `Order ${key} is not ready to fulfill (supplyStatus=${order0.supplyStatus}) — run confirm supply first`,
    );
  }

  const lines = salesOrderLinesToWmsIssueLines(order0);
  await ensureBatchesForIssueLines(lines);

  const needsUser = body.postCogs || body.autoPostInvoice;
  const { doc, invoice } = await createWmsIssueForSalesOrder(
    {
      orderRef: key,
      lines,
      postCogs: body.postCogs,
      autoPostInvoice: body.autoPostInvoice,
      autoInvoice: true,
    },
    needsUser ? approverUserId : undefined,
  );

  const order = (await getOrder(key))!;
  return { order, issue: doc, invoice, replay: false };
}
