import { describe, it, expect, beforeEach } from 'vitest';
import { applyProjectionEvent, resetProjections } from '@repo/db-erp-bi-risk';

describe('Projection idempotency — Wave 2', () => {
  beforeEach(() => resetProjections());

  it('رویداد تکراری دوبار اعمال نشود', () => {
    const input = {
      tenantId: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      projection: 'sales',
      partKey: '2026-01',
      eventId: 'evt-1',
      aggregateVersion: 1,
      delta: { revenue: 100 },
    };
    expect(applyProjectionEvent(input)).toBe('applied');
    expect(applyProjectionEvent(input)).toBe('duplicate');
  });
});
