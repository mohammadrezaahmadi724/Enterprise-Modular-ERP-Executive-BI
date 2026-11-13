import { TenantContext } from '@repo/domain';
import { outboxBestEffort, recordDomainEvent } from '../outbox/record-domain-event';

export async function emitProcurementDomainEvent(input: {
  eventType: string;
  aggregateId: string;
  payload: object;
}): Promise<void> {
  try {
    const tenantId = TenantContext.requireTenantId();
    await recordDomainEvent({
      eventType: input.eventType,
      aggregateId: input.aggregateId,
      payload: { tenantId, ...input.payload },
      sourceSchema: 'erp_operations',
    });
  } catch (err) {
    if (!outboxBestEffort()) throw err;
  }
}
