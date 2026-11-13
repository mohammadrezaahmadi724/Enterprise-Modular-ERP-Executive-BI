import { randomUUID } from 'node:crypto';
import { existsSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { TenantContext } from '@repo/domain';
import { createProject, listProjects, resetProjectsStoresForTest } from '../src/modules/projects/projects.service';

const TENANT = 'eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee';

describe('projects file persistence', () => {
  const prev = process.env.PROJECTS_PERSISTENCE;

  beforeEach(() => {
    process.env.PROJECTS_PERSISTENCE = 'true';
    process.env.PROJECTS_STORE_DIR = join(process.cwd(), '.data-test', 'projects-store');
    resetProjectsStoresForTest();
  });

  afterEach(() => {
    process.env.PROJECTS_PERSISTENCE = prev;
    const file = join(process.env.PROJECTS_STORE_DIR!, `${TENANT}.json`);
    if (existsSync(file)) rmSync(file, { force: true });
    resetProjectsStoresForTest();
  });

  it('hydrates store from snapshot after restart', async () => {
    await TenantContext.run(
      { tenantId: TENANT, userId: 'u1', correlationId: randomUUID(), traceId: 't', isSuperAdmin: false },
      async () => {
        const created = await createProject({ name: 'پروژه persist' });
        expect(created.name).toBe('پروژه persist');
      },
    );
    resetProjectsStoresForTest();
    await TenantContext.run(
      { tenantId: TENANT, userId: 'u1', correlationId: randomUUID(), traceId: 't', isSuperAdmin: false },
      async () => {
        const rows = await listProjects();
        expect(rows.some((p) => p.name === 'پروژه persist')).toBe(true);
      },
    );
  });
});
