import { describe, it, expect, beforeEach } from 'vitest';
import { recordPayment, resetBillingStore } from '@repo/db-platform';

describe('Billing idempotency — خلأ ۸ — بند ۳.۴', () => {
  beforeEach(() => resetBillingStore());

  it('پرداخت تکراری با Idempotency-Key یکسان → پاسخ کش‌شده', () => {
    const input = {
      tenantId: '11111111-1111-4111-8111-111111111111',
      idempotencyKey: 'pay-1',
      amount: 99000,
      currency: 'IRR',
      exchangeRateSnapshot: { base: 'IRR', rate: 1 },
    };
    const first = recordPayment(input);
    const second = recordPayment(input);
    expect(first.cached).toBe(false);
    expect(second.cached).toBe(true);
  });
});
