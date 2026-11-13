import { describe, expect, it, beforeEach } from 'vitest';
import { resetMetricQueryStore } from '../src/dashboard/metric-query';
import { queryFinanceHubReadModel } from '../src/dashboard/finance-hub-read-model';

const TENANT = '11111111-1111-4111-8111-111111111111';

describe('finance hub read model', () => {
  beforeEach(() => {
    resetMetricQueryStore();
  });

  it('returns KPIs and aging from projections only', () => {
    const hub = queryFinanceHubReadModel(TENANT);
    expect(hub.kpis.receivablesIrr).toBeGreaterThan(0);
    expect(hub.agingReceivable.length).toBe(5);
    expect(hub.sources).toContain('metric_snapshots');
  });
});
