import { beforeEach, describe, expect, it } from 'vitest';
import { processCheckout, resetBillingStore } from '@repo/db-platform';

describe('Checkout idempotency', () => {
  beforeEach(() => resetBillingStore());

  it('کلید یکسان → cached', () => {
    const input = {
      tenantId: '11111111-1111-4111-8111-111111111111',
      idempotencyKey: 'dup',
      planCode: 'starter',
      seats: 3,
      basePrice: 500_000,
      discountPercent: 0,
    };
    const a = processCheckout(input);
    const b = processCheckout(input);
    expect(a.cached).toBe(false);
    expect(b.cached).toBe(true);
  });
});
