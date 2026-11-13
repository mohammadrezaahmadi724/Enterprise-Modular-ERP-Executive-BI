import { TenantContext } from '@repo/domain';
import { OPS_EVENTS } from '@repo/contracts';
import { outboxBestEffort, recordDomainEvent } from '../outbox/record-domain-event';

export async function emitMasterDataDomainEvent(input: {
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

export const MASTER_DATA_OUTBOX = {
  MASTER_RECORD_ARCHIVED: OPS_EVENTS.MASTER_RECORD_ARCHIVED,
  TENANT_BRANDING_UPDATED: OPS_EVENTS.TENANT_BRANDING_UPDATED,
} as const;
