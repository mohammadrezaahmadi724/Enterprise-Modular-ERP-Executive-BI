import { TenantContext } from '@repo/domain';
import { OPS_EVENTS } from '@repo/contracts';
import { outboxBestEffort, recordDomainEvent } from '../outbox/record-domain-event';

export async function emitProjectsDomainEvent(input: {
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

export const PROJECT_OUTBOX = {
  PROJECT_CREATED: OPS_EVENTS.PROJECT_CREATED,
  TASK_CREATED: OPS_EVENTS.PROJECT_TASK_CREATED,
  TASK_UPDATED: OPS_EVENTS.PROJECT_TASK_UPDATED,
} as const;
