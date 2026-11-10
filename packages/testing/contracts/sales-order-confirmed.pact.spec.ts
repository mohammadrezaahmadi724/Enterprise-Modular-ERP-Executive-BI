import { describe, it, expect } from 'vitest';
import { SalesOrderConfirmedV1Schema, SALES_ORDER_CONFIRMED_V1 } from '@repo/contracts';
import { createInMemoryPact } from '../src/contracts/pact-helpers';
import { randomUUID } from 'node:crypto';

describe('SalesOrderConfirmed pact — خلأ ۱۱', () => {
  it('schema معتبر', () => {
    const event = SalesOrderConfirmedV1Schema.parse({
      eventType: SALES_ORDER_CONFIRMED_V1,
      schemaVersion: 1,
      aggregateId: randomUUID(),
      aggregateVersion: 1,
      tenantId: randomUUID(),
      payload: { orderId: randomUUID(), total: '100', currency: 'IRR' },
    });
    const pact = createInMemoryPact();
    pact.add({ consumer: 'sales', provider: 'outbox', interaction: event.eventType });
    expect(pact.expectations).toHaveLength(1);
  });
});
