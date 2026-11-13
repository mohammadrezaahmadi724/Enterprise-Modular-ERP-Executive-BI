import { randomUUID } from 'node:crypto';
import { describe, expect, it, beforeEach } from 'vitest';
import { TenantContext } from '@repo/domain';
import { resetProcurementStoresForTest } from '../src/modules/procurement/procurement.service';
import { getProjectContext, patchTask, resetProjectsStoresForTest } from '../src/modules/projects/projects.service';

const TENANT = 'ffffffff-ffff-4fff-8fff-ffffffffffff';

describe('project context + task patch', () => {
  beforeEach(() => {
    resetProjectsStoresForTest();
    resetProcurementStoresForTest();
  });

  it('links procurement PR for PRJ-0024', async () => {
    await TenantContext.run(
      { tenantId: TENANT, userId: 'u1', correlationId: randomUUID(), traceId: 't', isSuperAdmin: false },
      async () => {
        const ctx = await getProjectContext('PRJ-0024');
        expect(ctx.procurement.purchaseRequests.some((p) => p.number === 'PR-00004')).toBe(true);
        expect(ctx.procurement.purchaseOrders.some((p) => p.number === 'PO-001274')).toBe(true);
        expect(ctx.finance.costCenterCode).toBe('CC-310');
        expect(ctx.finance.budgetUtilizationPct).toBeGreaterThan(70);
        expect(ctx.procurement.readyForPurchaseOrder).toBeDefined();
        expect(ctx.team.length).toBeGreaterThanOrEqual(2);
        expect(ctx.team.some((m) => m.role.includes('مدیر'))).toBe(true);
      },
    );
  });

  it('increments checklist on task', async () => {
    await TenantContext.run(
      { tenantId: TENANT, userId: 'u1', correlationId: randomUUID(), traceId: 't', isSuperAdmin: false },
      async () => {
        const t = await patchTask('TSK-0017', { incrementChecklist: true });
        expect(t.checklistDone).toBeGreaterThanOrEqual(1);
      },
    );
  });
});
