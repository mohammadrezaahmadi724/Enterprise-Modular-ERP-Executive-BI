import { describe, it, expect, beforeEach } from 'vitest';
import { recordPayment, resetBillingStore, refundWithOriginalRate } from '@repo/db-platform';

describe('Multi-currency billing — Wave 2', () => {
  beforeEach(() => resetBillingStore());

  it('پرداخت IRR و محاسبه refund', () => {
    recordPayment({
      tenantId: '11111111-1111-4111-8111-111111111111',
      idempotencyKey: 'irr-1',
      amount: 1_000_000,
      currency: 'IRR',
      exchangeRateSnapshot: { base: 'IRR', rate: 1 },
    });
    const refund = refundWithOriginalRate({
      paymentAmount: 100,
      paymentCurrency: 'USD',
      paymentRate: 0.01,
      refundCurrency: 'USD',
      currentRate: 0.012,
    });
    expect(refund.usedRate).toBe(0.01);
    expect(refund.refundAmount).toBe(100);
  });
});
