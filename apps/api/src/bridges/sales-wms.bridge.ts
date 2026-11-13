import { BadRequestException, NotFoundException } from '@nestjs/common';
import type { SalesOrderDto } from '../modules/sales/sales.dto';
import { getOrder, markSalesOrderShipped } from '../modules/sales/sales.service';
import type { CreateStockDocBody } from '../modules/wms/wms.dto';
import type { SalesDocLineDto, SalesInvoiceDto } from '../modules/sales/sales.dto';
import { ensureInvoiceForShippedOrder } from './sales-fulfillment.bridge';
import type { WmsReservationDto } from '../modules/wms/wms.dto';
import {
  consumeReservationsForReference,
  createIssue,
  createReservation,
} from '../modules/wms/wms.service';
import type { WmsStockDocDto } from '../modules/wms/wms.dto';

/**
 * Application-layer bridge — فروش ↔ انبار بدون import متقابل domain.
 */
export async function reserveWmsForSalesOrder(
  orderNumber: string,
  lines: SalesDocLineDto[],
  warehouseBySku?: Record<string, string>,
): Promise<WmsReservationDto[]> {
  const map = warehouseBySku ?? SALES_WMS_WAREHOUSE_BY_SKU;
  const reservations: WmsReservationDto[] = [];
  for (const line of lines) {
    const warehouse = map[line.sku] ?? 'WH-ESF';
    const reservation = await createReservation({
      sku: line.sku,
      warehouse,
      quantity: line.quantity,
      reference: orderNumber,
    });
    reservations.push(reservation);
  }
  return reservations;
}

export const SALES_WMS_WAREHOUSE_BY_SKU: Record<string, string> = {
  'PRD-1016': 'WH-ESF',
  'PRD-1001': 'WH-ESF',
  'PRD-2044': 'WH-THR',
  'PRD-CHAY': 'WH-MSH',
  'PRD-BRN3': 'WH-THR',
};

const SO_REF = /^SO-/i;

function resolveOrderRef(body: CreateStockDocBody): string | null {
  const ref = body.orderRef?.trim() || body.reference?.trim();
  return ref && SO_REF.test(ref) ? ref : null;
}

function assertIssueLinesMatchOrder(order: SalesOrderDto, body: CreateStockDocBody): void {
  for (const line of body.lines) {
    const orderLine = order.lines.find((l) => l.sku === line.sku);
    if (!orderLine) {
      throw new BadRequestException(`SKU ${line.sku} is not on sales order ${order.number}`);
    }
    if (line.quantity > orderLine.quantity) {
      throw new BadRequestException(
        `Quantity for ${line.sku} exceeds order line (${line.quantity} > ${orderLine.quantity})`,
      );
    }
    const expectedWh = SALES_WMS_WAREHOUSE_BY_SKU[line.sku];
    if (expectedWh && line.warehouse !== expectedWh) {
      throw new BadRequestException(
        `Warehouse for ${line.sku} must be ${expectedWh} (matches supply reservation)`,
      );
    }
  }
}

/**
 * خروج انبار مرتبط با سفارش فروش — فقط پس از supplyStatus=ready؛ آزاد کردن رزرو و ثبت shipped.
 */
export type WmsSalesIssueResult = {
  doc: WmsStockDocDto;
  invoice?: SalesInvoiceDto;
};

export async function createWmsIssueForSalesOrder(
  body: CreateStockDocBody,
  approverUserId?: string,
): Promise<WmsSalesIssueResult> {
  const orderRef = resolveOrderRef(body);
  let order: SalesOrderDto | null = null;

  if (orderRef) {
    order = await getOrder(orderRef);
    if (!order) throw new NotFoundException(`Sales order ${orderRef} not found`);
    if (order.supplyStatus !== 'ready') {
      throw new BadRequestException(
        `Order ${orderRef} is not ready for shipment (supplyStatus=${order.supplyStatus}) — confirm supply first`,
      );
    }
    assertIssueLinesMatchOrder(order, body);
  }

  const doc = await createIssue(body, approverUserId);

  let invoice: SalesInvoiceDto | undefined;

  if (orderRef && order) {
    await consumeReservationsForReference(orderRef, body.lines);
    await markSalesOrderShipped(orderRef, doc.docNo);
    const autoInvoice = body.autoInvoice !== false;
    if (autoInvoice) {
      invoice = await ensureInvoiceForShippedOrder(orderRef, {
        post: body.autoPostInvoice === true,
        approverUserId,
      });
    }
  }

  return { doc, invoice };
}

export function salesOrderLinesToWmsIssueLines(order: SalesOrderDto) {
  return order.lines.map((line) => ({
    sku: line.sku,
    warehouse: SALES_WMS_WAREHOUSE_BY_SKU[line.sku] ?? 'WH-ESF',
    quantity: line.quantity,
    location: 'A-01-02',
  }));
}
