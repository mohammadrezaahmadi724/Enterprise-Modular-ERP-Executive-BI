import { beforeEach, describe, expect, it } from 'vitest';
import { addSeat, resetBillingStore, seedSubscription } from '@repo/db-platform';

describe('Subscription seats idempotency', () => {
  const tenantId = '11111111-1111-4111-8111-111111111111';

  beforeEach(() => {
    resetBillingStore();
    seedSubscription(tenantId, { planCode: 'starter', seats: 1, seatLimit: 5, modules: ['finance'] });
  });

  it('کلید تکراری addSeat', () => {
    const first = addSeat(tenantId, 'k1');
    const second = addSeat(tenantId, 'k1');
    expect(first.cached).toBe(false);
    expect(second.cached).toBe(true);
  });
});
