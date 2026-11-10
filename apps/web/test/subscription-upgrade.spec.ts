import { beforeEach, describe, expect, it } from 'vitest';
import { getBillingOutbox, resetBillingStore, upgradeSubscription } from '@repo/db-platform';

describe('Subscription upgrade', () => {
  beforeEach(() => resetBillingStore());

  it('ارتقا → ماژول جدید', () => {
    const tenantId = '11111111-1111-4111-8111-111111111111';
    const sub = upgradeSubscription(tenantId, 'professional', 'bi-risk');
    expect(sub.modules).toContain('bi-risk');
    expect(getBillingOutbox().length).toBeGreaterThan(0);
  });
});
