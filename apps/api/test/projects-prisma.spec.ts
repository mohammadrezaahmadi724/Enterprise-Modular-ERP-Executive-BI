import { randomUUID } from 'node:crypto';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { loadRootEnv } from '../../../tools/e2e/load-root-env';
import { TenantContext } from '@repo/domain';

loadRootEnv();
import { listProjectsPrisma } from '@repo/db-erp-operations';
import {
  createProject,
  listProjects,
  resetProjectsStoresForTest,
} from '../src/modules/projects/projects.service';

const TENANT = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';

const hasDb = Boolean(process.env.DATABASE_URL?.trim());

describe.skipIf(!hasDb)('projects prisma persistence', () => {
  const prevPersistence = process.env.PROJECTS_PERSISTENCE;

  beforeEach(() => {
    process.env.PROJECTS_PERSISTENCE = 'true';
    resetProjectsStoresForTest();
  });

  afterEach(() => {
    process.env.PROJECTS_PERSISTENCE = prevPersistence;
    resetProjectsStoresForTest();
  });

  it('round-trips project create through erp_projects', async () => {
    const unique = `پروژه prisma ${randomUUID().slice(0, 8)}`;
    await TenantContext.run(
      { tenantId: TENANT, userId: 'u1', correlationId: randomUUID(), traceId: 't', isSuperAdmin: false },
      async () => {
        const created = await createProject({ name: unique });
        expect(created.name).toBe(unique);

        resetProjectsStoresForTest();
        const reloaded = await listProjects();
        expect(reloaded.some((p) => p.name === unique)).toBe(true);

        const rows = await listProjectsPrisma();
        expect(rows.some((p) => p.name === unique)).toBe(true);
      },
    );
  });
});
