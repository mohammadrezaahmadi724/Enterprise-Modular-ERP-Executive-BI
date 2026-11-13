import { describe, expect, it, beforeEach } from 'vitest';
import { publishWmsOverviewProjection, readWmsHubKpis, resetMetricQueryStore } from '../src/index';

const TENANT = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';

describe('projection_wms_overview', () => {
  beforeEach(() => resetMetricQueryStore());

  it('stores and reads hub KPIs without OLTP', () => {
    publishWmsOverviewProjection(TENANT, {
      activeWarehouses: 3,
      recentReservations: 5,
      criticalSkus: 2,
      expiringLotsWithin30: 7,
    });
    const kpis = readWmsHubKpis(TENANT);
    expect(kpis?.activeWarehouses).toBe(3);
    expect(kpis?.recentReservations).toBe(5);
    expect(kpis?.expiringLotsWithin30).toBe(7);
    expect(kpis?.sources).toContain('projection_wms_overview');
  });
});
