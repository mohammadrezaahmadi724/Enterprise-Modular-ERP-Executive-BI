import { randomUUID } from 'node:crypto';
import { TenantContext } from '@repo/domain';
import { platformDb } from '../prisma/platform-db';

export async function recordDomainEvent(input: {
  eventType: string;
  aggregateId: string;
  payload: object;
  schemaVersion?: number;
  sourceSchema?: string;
  aggregateVersion?: number;
}): Promise<void> {
  const ctx = TenantContext.get();
  if (!ctx?.tenantId) return;
  await platformDb.domainEventOutbox.create({
    data: {
      eventId: randomUUID(),
      eventType: input.eventType,
      schemaVersion: input.schemaVersion ?? 1,
      aggregateId: input.aggregateId,
      aggregateVersion: input.aggregateVersion ?? 1,
      payload: input.payload,
      tenantId: ctx.tenantId,
      correlationId: ctx.correlationId,
      causationId: null,
      sourceSchema: input.sourceSchema ?? 'erp_finance',
      status: 'Pending',
    },
  });
}
