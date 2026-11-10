import { beforeEach, describe, expect, it } from 'vitest';
import { addSeat, resetBillingStore, seedSubscription } from '@repo/db-platform';

describe('Subscription seat limit', () => {
  const tenantId = '11111111-1111-4111-8111-111111111111';

  beforeEach(() => resetBillingStore());

  it('سقف صندلی → needsUpgrade', () => {
    seedSubscription(tenantId, { planCode: 'starter', seats: 5, seatLimit: 5, modules: ['finance'] });
    const r = addSeat(tenantId, 'seat-1');
    expect(r.ok).toBe(false);
    expect(r.needsUpgrade).toBe(true);
  });
});
