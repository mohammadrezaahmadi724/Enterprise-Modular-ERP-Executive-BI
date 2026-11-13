import { randomUUID } from 'node:crypto';
import { describe, expect, it, beforeEach } from 'vitest';
import { TenantContext } from '@repo/domain';
import { getProjectsAssistantInsights, resetProjectsStoresForTest } from '../src/modules/projects/projects.service';
import { resetProcurementStoresForTest } from '../src/modules/procurement/procurement.service';

const TENANT = 'ffffffff-ffff-4fff-8fff-ffffffffffff';

describe('projects assistant insights', () => {
  beforeEach(() => {
    resetProjectsStoresForTest();
    resetProcurementStoresForTest();
  });

  it('returns rule-based insights', async () => {
    await TenantContext.run(
      { tenantId: TENANT, userId: 'u1', correlationId: randomUUID(), traceId: 't', isSuperAdmin: false },
      async () => {
        const data = await getProjectsAssistantInsights();
        expect(data.enabled).toBe(true);
        expect(data.insights.length).toBeGreaterThan(0);
        expect(data.insights.some((i) => i.severity === 'warning' || i.severity === 'critical')).toBe(true);
      },
    );
  });
});
