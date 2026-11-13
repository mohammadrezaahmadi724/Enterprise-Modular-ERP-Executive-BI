import { randomUUID } from 'node:crypto';
import { TenantContext } from '@repo/domain';
import { platformDb } from '../prisma/platform-db';

export class OutboxTenantMissingError extends Error {
  readonly code = 'OUTBOX_TENANT_REQUIRED';
  constructor() {
    super('OUTBOX_TENANT_CONTEXT_REQUIRED');
    this.name = 'OutboxTenantMissingError';
  }
}

/** Vitest و محیط بدون Postgres نباید جهش دامنه را بخوابانند. */
export function outboxBestEffort(): boolean {
  return process.env.VITEST === 'true' || process.env.OUTBOX_BEST_EFFORT === 'true';
}

/**
 * ثبت رویداد در `platform_outbox.domain_events_outbox`.
 * اسکیمای platform کلاینت جدا از erp_* است؛ فراخوان باید این را بعد از commit دامنه صدا بزند
 * و در پروداکشن خطا را نبلعد تا کلاینت با Idempotency-Key دوباره تلاش کند.
 */
export async function recordDomainEvent(input: {
  eventType: string;
  aggregateId: string;
  payload: object;
  schemaVersion?: number;
  sourceSchema?: string;
  aggregateVersion?: number;
  tenantId?: string;
  correlationId?: string;
}): Promise<void> {
  const ctx = TenantContext.getOrNull();
  const tenantId = input.tenantId ?? ctx?.tenantId;
  if (!tenantId) {
    if (outboxBestEffort()) return;
    throw new OutboxTenantMissingError();
  }
  try {
    await platformDb.domainEventOutbox.create({
      data: {
        eventId: randomUUID(),
        eventType: input.eventType,
        schemaVersion: input.schemaVersion ?? 1,
        aggregateId: input.aggregateId,
        aggregateVersion: input.aggregateVersion ?? 1,
        payload: input.payload,
        tenantId,
        correlationId: input.correlationId ?? ctx?.correlationId ?? randomUUID(),
        causationId: null,
        sourceSchema: input.sourceSchema ?? 'erp_finance',
        status: 'Pending',
      },
    });
  } catch (err) {
    if (outboxBestEffort()) return;
    throw err;
  }
}
