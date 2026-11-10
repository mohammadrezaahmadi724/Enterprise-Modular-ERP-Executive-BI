import { describe, expect, it, beforeEach } from 'vitest';
import { getBillingOutbox, processCheckout, resetBillingStore } from '@repo/db-platform';

describe('Checkout approval — تخفیف > ۲۰٪', () => {
  beforeEach(() => resetBillingStore());

  it('PendingApproval + Outbox', () => {
    const r = processCheckout({
      tenantId: '11111111-1111-4111-8111-111111111111',
      idempotencyKey: 'c1',
      planCode: 'professional',
      seats: 5,
      basePrice: 1_000_000,
      discountPercent: 25,
    });
    expect(r.status).toBe('PendingApproval');
    expect(getBillingOutbox().some((e) => e.type.includes('pending_approval'))).toBe(true);
  });
});
