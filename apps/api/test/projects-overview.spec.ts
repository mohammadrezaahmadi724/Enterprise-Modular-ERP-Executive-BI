import { randomUUID } from 'node:crypto';
import { describe, expect, it, beforeEach } from 'vitest';
import { TenantContext } from '@repo/domain';
import { createProject, createTask, getProjectsOverview, resetProjectsStoresForTest } from '../src/modules/projects/projects.service';

const TENANT = 'eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee';

describe('projects overview', () => {
  beforeEach(() => {
    resetProjectsStoresForTest();
  });

  it('exposes hub KPIs', async () => {
    await TenantContext.run(
      { tenantId: TENANT, userId: 'u1', correlationId: randomUUID(), traceId: 't', isSuperAdmin: false },
      async () => {
        const overview = await getProjectsOverview();
        expect(overview.kpis.activeProjects).toBeGreaterThanOrEqual(8);
        expect(overview.kpis.overdueTasks).toBeGreaterThanOrEqual(1);
      },
    );
  });

  it('creates project and task', async () => {
    await TenantContext.run(
      { tenantId: TENANT, userId: 'u1', correlationId: randomUUID(), traceId: 't', isSuperAdmin: false },
      async () => {
        const p = await createProject({ name: 'پروژه آزمون', deadline: '۱۴۰۵/۰۹/۰۱' });
        expect(p.code).toMatch(/^PRJ-/);
        const t = await createTask({ title: 'کار آزمون', inProject: true, projectCode: p.code, assignToSelf: true });
        expect(t.number).toMatch(/^TSK-/);
      },
    );
  });
});
