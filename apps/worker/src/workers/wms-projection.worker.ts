import { OPS_EVENTS } from '@repo/contracts';
import {
  applyWmsStockDomainEvent,
  publishWmsOverviewProjection,
} from '@repo/db-erp-bi-risk';

export function processWmsStockDomainEvent(input: {
  tenantId: string;
  eventId: string;
  eventType: string;
  payload: Record<string, unknown>;
}): void {
  if (
    input.eventType === OPS_EVENTS.STOCK_RECEIPT_POSTED ||
    input.eventType === OPS_EVENTS.STOCK_ISSUE_POSTED ||
    input.eventType === OPS_EVENTS.STOCK_RESERVATION_CREATED ||
    input.eventType === OPS_EVENTS.STOCK_RECONCILIATION_RUN ||
    input.eventType === OPS_EVENTS.STOCK_COUNT_POSTED ||
    input.eventType === OPS_EVENTS.STOCK_SERIAL_REGISTERED
  ) {
    applyWmsStockDomainEvent(input);
  }

  const reservations = Number(input.payload.recentReservations ?? 0);
  const criticalSkus = Number(input.payload.criticalSkus ?? 0);
  const activeWarehouses = Number(input.payload.activeWarehouses ?? 0);
  const expiringLotsWithin30 = Number(input.payload.expiringLotsWithin30 ?? 0);
  if (activeWarehouses > 0 || expiringLotsWithin30 > 0) {
    publishWmsOverviewProjection(input.tenantId, {
      activeWarehouses,
      recentReservations: reservations,
      criticalSkus,
      expiringLotsWithin30,
    });
  }
}
