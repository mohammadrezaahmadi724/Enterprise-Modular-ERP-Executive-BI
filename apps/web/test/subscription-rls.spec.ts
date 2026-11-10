import { describe, expect, it, beforeEach } from 'vitest';
import { getSubscriptionForTenant, resetBillingStore } from '@repo/db-platform';

describe('Subscription RLS', () => {
  beforeEach(() => resetBillingStore());

  it('Tenant A نمی‌تواند subscription Tenant B را ببیند', () => {
    const a = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';
    const b = 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb';
    expect(() => getSubscriptionForTenant(a, b)).toThrow('RLS_DENY_SUBSCRIPTION');
  });
});
