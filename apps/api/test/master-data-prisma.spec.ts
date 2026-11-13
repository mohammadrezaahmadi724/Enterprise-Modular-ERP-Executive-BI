import { randomUUID } from 'node:crypto';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { loadRootEnv } from '../../../tools/e2e/load-root-env';
import { TenantContext } from '@repo/domain';
import { readTenantBrandingPrisma } from '@repo/db-erp-operations';
import { setTenantModules } from '../src/modules/platform/menu.service';
import {
  archiveMasterDataSectionRecord,
  getMasterDataTaxes,
  uploadMasterDataBrandingSlot,
} from '../src/modules/master-data/master-data.service';

loadRootEnv();

const TENANT = '11111111-1111-4111-8111-111111111111';
const hasDb = Boolean(process.env.DATABASE_URL?.trim());

describe.skipIf(!hasDb)('master data prisma + object storage', () => {
  const prevProjects = process.env.PROJECTS_PERSISTENCE;
  const prevMaster = process.env.MASTER_DATA_PERSISTENCE;

  beforeEach(() => {
    process.env.PROJECTS_PERSISTENCE = 'true';
    process.env.MASTER_DATA_PERSISTENCE = 'true';
    setTenantModules(TENANT, ['projects-base', 'crm-base', 'operations-base', 'finance-base']);
  });

  afterEach(() => {
    process.env.PROJECTS_PERSISTENCE = prevProjects;
    process.env.MASTER_DATA_PERSISTENCE = prevMaster;
  });

  it('archives a tax row in erp_master_records', async () => {
    await TenantContext.run(
      { tenantId: TENANT, userId: 'u1', correlationId: randomUUID(), traceId: 't', isSuperAdmin: false },
      async () => {
        const before = await getMasterDataTaxes();
        expect(before.entitled).toBe(true);
        expect(before.rows.some((r) => r.code === 'VAT10' && r.status === 'active')).toBe(true);

        const archived = await archiveMasterDataSectionRecord('taxes', 'VAT10');
        expect(archived.ok).toBe(true);

        const after = await getMasterDataTaxes();
        const row = after.rows.find((r) => r.code === 'VAT10');
        expect(row?.status).toBe('inactive');
      },
    );
  });

  it('uploads branding slot and persists URL', async () => {
    const png = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
      'base64',
    );
    const file = {
      buffer: png,
      mimetype: 'image/png',
      size: png.length,
      originalname: 'logo.png',
    } as Express.Multer.File;

    await TenantContext.run(
      { tenantId: TENANT, userId: 'u1', correlationId: randomUUID(), traceId: 't', isSuperAdmin: false },
      async () => {
        const res = await uploadMasterDataBrandingSlot('logo', file, '127.0.0.1');
        expect(res.ok).toBe(true);
        const branding = await readTenantBrandingPrisma();
        expect(branding?.logoUrl).toMatch(/^\/api\/v1\/tenant-assets\/branding\/logo\//);
      },
    );
  });
});
