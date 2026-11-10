import type { Prisma } from '@prisma/client';
import { TenantContext } from '@repo/domain';

export interface DomainEventInput {
  eventId: string;
  eventType: string;
  schemaVersion: number;
  aggregateId: string;
  aggregateVersion: number;
  payload: unknown;
  causationId?: string;
  sourceSchema: string;
}

/** ثبت رویداد در outbox در همان transaction فراخوان‌کننده */
export async function writeOutboxEvent(
  tx: Prisma.TransactionClient,
  event: DomainEventInput,
): Promise<void> {
  const ctx = TenantContext.get();
  await tx.domainEventOutbox.create({
    data: {
      eventId: event.eventId,
      eventType: event.eventType,
      schemaVersion: event.schemaVersion,
      aggregateId: event.aggregateId,
      aggregateVersion: event.aggregateVersion,
      payload: event.payload as object,
      tenantId: ctx.tenantId,
      correlationId: ctx.correlationId,
      causationId: event.causationId ?? null,
      sourceSchema: event.sourceSchema,
      status: 'Pending',
    },
  });
}
