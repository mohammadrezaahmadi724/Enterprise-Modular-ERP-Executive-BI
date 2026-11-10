import { describe, it, expect, beforeEach } from 'vitest';
import {
  createBillingSubscription,
  getSubscriptionSnapshot,
  registerPlanVersion,
  resetPlanVersionStore,
  updatePlanVersion,
} from '../src/billing/plan-versioning';

describe('Plan versioning — Wave 2', () => {
  const planVersionId = '11111111-1111-4111-8111-111111111111';

  beforeEach(() => resetPlanVersionStore());

  it('تغییر planVersion روی Subscription قبلی اثر نگذارد', () => {
    registerPlanVersion({
      planVersionId,
      version: 1,
      pricingModel: 'PerSeat',
      basePrice: 100,
      features: { api: 'true' },
    });
    const sub = createBillingSubscription('tenant-1', planVersionId, 5);
    const before = getSubscriptionSnapshot(sub.id);
    updatePlanVersion(planVersionId, { basePrice: 200, features: { api: 'false' } });
    const after = getSubscriptionSnapshot(sub.id);
    expect(after?.basePrice).toBe(before?.basePrice);
    expect(after?.features).toEqual(before?.features);
  });
});
