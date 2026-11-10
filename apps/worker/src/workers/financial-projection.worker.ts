import { FINANCE_EVENTS } from '@repo/contracts';
import { applyProjectionEvent } from '@repo/db-erp-bi-risk';

export function processGlEntryPostedEvent(event: {
  eventId: string;
  aggregateVersion: number;
  tenantId: string;
  debit: number;
  credit: number;
  accountId: string;
  periodStart: string;
}) {
  return applyProjectionEvent({
    tenantId: event.tenantId,
    projection: 'financial',
    partKey: `${event.accountId}:${event.periodStart}`,
    eventId: event.eventId,
    aggregateVersion: event.aggregateVersion,
    delta: { debit: event.debit, credit: event.credit, balance: event.debit - event.credit },
  });
}

void FINANCE_EVENTS;
