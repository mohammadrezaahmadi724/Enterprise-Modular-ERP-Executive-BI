import { describe, it, expect } from 'vitest';
import { PaymentSucceededV1Schema, PAYMENT_SUCCEEDED_V1 } from '@repo/contracts';
import { randomUUID } from 'node:crypto';

describe('PaymentSucceeded pact — خلأ ۱۱', () => {
  it('اجباری idempotencyKey در payload', () => {
    const parsed = PaymentSucceededV1Schema.parse({
      eventType: PAYMENT_SUCCEEDED_V1,
      schemaVersion: 1,
      aggregateId: randomUUID(),
      aggregateVersion: 1,
      tenantId: randomUUID(),
      payload: {
        paymentId: randomUUID(),
        amount: '50000',
        currency: 'IRR',
        idempotencyKey: 'pay-key-1',
      },
    });
    expect(parsed.payload.idempotencyKey).toBe('pay-key-1');
  });
});
