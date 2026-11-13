import { randomUUID } from 'node:crypto';
import { describe, expect, it, beforeEach } from 'vitest';
import { TenantContext } from '@repo/domain';
import { createProject, resetProjectsStoresForTest } from '../src/modules/projects/projects.service';

const TENANT = 'ffffffff-ffff-4fff-8fff-ffffffffffff';

describe('projects outbox hooks', () => {
  beforeEach(() => {
    resetProjectsStoresForTest();
  });

  it('creates project without throwing when outbox unavailable', async () => {
    await TenantContext.run(
      { tenantId: TENANT, userId: 'u1', correlationId: randomUUID(), traceId: 't', isSuperAdmin: false },
      async () => {
        const p = await createProject({ name: 'پروژه آزمون outbox' });
        expect(p.code).toMatch(/^PRJ-/);
      },
    );
  });
});
