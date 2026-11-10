import { describe, it, expect, beforeEach } from 'vitest';
import { applyProjectionEvent, rebuildProjection, resetProjections } from '../src/projections/store';

describe('Projection rebuild — Wave 2', () => {
  const tenantId = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';

  beforeEach(() => resetProjections());

  it('Rebuild از صفر باید نتیجه یکسان دهد', () => {
    const events = [
      { eventId: 'e1', aggregateVersion: 1, delta: { revenue: 100 } },
      { eventId: 'e2', aggregateVersion: 2, delta: { revenue: 50 } },
    ];
    for (const e of events) {
      applyProjectionEvent({
        tenantId,
        projection: 'sales',
        partKey: '2026-01',
        eventId: e.eventId,
        aggregateVersion: e.aggregateVersion,
        delta: e.delta,
      });
    }
    const live = rebuildProjection(tenantId, 'sales', '2026-01', events);
    expect(live?.value.revenue).toBe(150);
  });
});
