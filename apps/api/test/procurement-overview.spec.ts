import { randomUUID } from 'node:crypto';
import { describe, expect, it, beforeEach } from 'vitest';
import { TenantContext } from '@repo/domain';
import {
  awardRfq,
  createPurchaseRequest,
  getProcurementOverview,
  getProcurementReports,
  listRfqs,
  resetProcurementStoresForTest,
} from '../src/modules/procurement/procurement.service';

const TENANT = 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb';

describe('procurement overview', () => {
  beforeEach(() => {
    resetProcurementStoresForTest();
  });

  it('returns demo KPI floor and recent requests', async () => {
    await TenantContext.run(
      { tenantId: TENANT, userId: 'u1', correlationId: randomUUID(), traceId: 't', isSuperAdmin: false },
      async () => {
        const overview = await getProcurementOverview();
        expect(overview.kpis.pendingRequestToman).toBeGreaterThanOrEqual(5_419_000_000);
        expect(overview.kpis.openPoToman).toBeGreaterThanOrEqual(5_123_000_000);
        expect(overview.kpis.pendingRequestIds.length).toBeGreaterThan(0);
        expect(overview.monthlyTrend.length).toBeGreaterThanOrEqual(7);
      },
    );
  });

  it('seeds RFQ comparison data', async () => {
    await TenantContext.run(
      { tenantId: TENANT, userId: 'u1', correlationId: randomUUID(), traceId: 't', isSuperAdmin: false },
      async () => {
        const rfqs = await listRfqs();
        expect(rfqs.some((r) => r.number === 'RFQ-00012' && r.quotes.length >= 2)).toBe(true);
      },
    );
  });

  it('awards RFQ and issues purchase order', async () => {
    await TenantContext.run(
      { tenantId: TENANT, userId: 'u1', correlationId: randomUUID(), traceId: 't', isSuperAdmin: false },
      async () => {
        const { rfq, order } = await awardRfq('RFQ-00012', { supplierCode: 'SUP-12116' });
        expect(rfq.status).toBe('awarded');
        expect(rfq.purchaseOrderNumber).toBe(order.number);
        expect(order.supplierCode).toBe('SUP-12116');
        const reports = await getProcurementReports();
        expect(reports.counts.awardedRfqs).toBeGreaterThanOrEqual(1);
      },
    );
  });

  it('creates PR and refreshes list', async () => {
    await TenantContext.run(
      { tenantId: TENANT, userId: 'u1', correlationId: randomUUID(), traceId: 't', isSuperAdmin: false },
      async () => {
        const pr = await createPurchaseRequest({
          title: 'آزمون نیاز',
          requestDate: '۱۴۰۵/۰۸/۱۲',
          lines: [{ quantity: 2, unit: 'عدد', estimatedUnitToman: 1000 }],
        });
        expect(pr.number).toMatch(/^PR-/);
        expect(pr.status).toBe('approved');
      },
    );
  });
});
