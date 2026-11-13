import { randomUUID } from 'node:crypto';
import { beforeEach, describe, expect, it } from 'vitest';
import { TenantContext } from '@repo/domain';
import { globalModuleRegistry } from '@repo/module-sdk';
import { setTenantModules } from '../src/modules/platform/menu.service';
import {
  archiveMasterDataSectionRecord,
  getMasterDataOverview,
  getMasterDataParties,
  getMasterDataTaxes,
} from '../src/modules/master-data/master-data.service';

const TENANT = '11111111-1111-4111-8111-111111111111';

describe('master data aggregation + entitlements', () => {
  beforeEach(() => {
    setTenantModules(TENANT, ['projects-base', 'crm-base', 'operations-base', 'finance-base']);
  });

  it('overview reflects active SaaS modules', async () => {
    await TenantContext.run(
      { tenantId: TENANT, userId: 'u1', correlationId: randomUUID(), traceId: 't', isSuperAdmin: false },
      async () => {
        const overview = await getMasterDataOverview();
        expect(overview.entitlements.parties).toBe(true);
        expect(overview.entitlements.taxes).toBe(true);
        expect(overview.sections.find((s) => s.id === 'parties')?.entitled).toBe(true);
      },
    );
  });

  it('parties come from CRM read bridge', async () => {
    await TenantContext.run(
      { tenantId: TENANT, userId: 'u1', correlationId: randomUUID(), traceId: 't', isSuperAdmin: false },
      async () => {
        const res = await getMasterDataParties();
        expect(res.entitled).toBe(true);
        expect(res.source).toMatch(/^crm\.customers/);
        expect(res.rows.length).toBeGreaterThan(0);
      },
    );
  });

  it('blocks taxes when finance module inactive', async () => {
    setTenantModules(TENANT, ['projects-base', 'crm-base', 'operations-base']);
    await TenantContext.run(
      { tenantId: TENANT, userId: 'u1', correlationId: randomUUID(), traceId: 't', isSuperAdmin: false },
      async () => {
        const res = await getMasterDataTaxes();
        expect(res.entitled).toBe(false);
        expect(res.source).toBe('entitlement_blocked');
        expect(res.upgradeHref).toBe('/settings/subscription');
      },
    );
  });

  it('registry is bound for entitlement queries', async () => {
    const rows = await globalModuleRegistry.getActiveModules(TENANT);
    expect(rows.some((r) => r.moduleCode === 'crm-base')).toBe(true);
  });

  it('rejects archive on non-persisted sections', async () => {
    await TenantContext.run(
      { tenantId: TENANT, userId: 'u1', correlationId: randomUUID(), traceId: 't', isSuperAdmin: false },
      async () => {
        const res = await archiveMasterDataSectionRecord('parties', 'X-1');
        expect(res.ok).toBe(false);
        expect(res.reason).toBe('section_not_archivable');
      },
    );
  });

  it('archive respects entitlements', async () => {
    setTenantModules(TENANT, ['projects-base', 'crm-base', 'operations-base']);
    await TenantContext.run(
      { tenantId: TENANT, userId: 'u1', correlationId: randomUUID(), traceId: 't', isSuperAdmin: false },
      async () => {
        const res = await archiveMasterDataSectionRecord('taxes', 'VAT10');
        expect(res.ok).toBe(false);
        expect(res.reason).toBe('entitlement_blocked');
      },
    );
  });
});
