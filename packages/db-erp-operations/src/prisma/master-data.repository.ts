import { TenantContext } from '@repo/domain';
import { masterDataPrismaEnabled } from './client.js';
import { operationsSession } from './rls.js';

export type ErpMasterKind = 'unit' | 'tax' | 'warehouse_location' | 'price_list' | 'ops_item';

export type MasterRecordRow = {
  kind: ErpMasterKind;
  code: string;
  name: string;
  status: 'active' | 'inactive';
  payload?: Record<string, unknown> | null;
};

export type TenantBrandingRow = {
  logoUrl?: string;
  stampUrl?: string;
  signatureUrl?: string;
};

export async function listMasterRecordsPrisma(kind: ErpMasterKind): Promise<MasterRecordRow[]> {
  if (!masterDataPrismaEnabled()) return [];
  const tenantId = TenantContext.requireTenantId();
  const rows = await operationsSession((tx) => tx.erpMasterRecord.findMany({
    where: { tenantId, kind },
    orderBy: { code: 'asc' },
  }));
  return rows.map((r) => ({
    kind: r.kind,
    code: r.code,
    name: r.name,
    status: r.status,
    payload: r.payload as Record<string, unknown> | null,
  }));
}

export async function upsertMasterRecordsPrisma(kind: ErpMasterKind, rows: MasterRecordRow[]): Promise<void> {
  if (!masterDataPrismaEnabled()) return;
  const tenantId = TenantContext.requireTenantId();
  for (const row of rows) {
    await operationsSession((tx) => tx.erpMasterRecord.upsert({
      where: { tenantId_kind_code: { tenantId, kind, code: row.code } },
      create: {
        tenantId,
        kind,
        code: row.code,
        name: row.name,
        status: row.status,
        payload: row.payload ?? undefined,
      },
      update: {
        name: row.name,
        status: row.status,
        payload: row.payload ?? undefined,
      },
    }));
  }
}

export async function archiveMasterRecordPrisma(kind: ErpMasterKind, code: string): Promise<boolean> {
  if (!masterDataPrismaEnabled()) return false;
  const tenantId = TenantContext.requireTenantId();
  const existing = await operationsSession((tx) => tx.erpMasterRecord.findUnique({
    where: { tenantId_kind_code: { tenantId, kind, code } },
  }));
  if (!existing) return false;
  await operationsSession((tx) => tx.erpMasterRecord.update({
    where: { tenantId_kind_code: { tenantId, kind, code } },
    data: { status: 'inactive' },
  }));
  return true;
}

export async function readTenantBrandingPrisma(): Promise<TenantBrandingRow | null> {
  if (!masterDataPrismaEnabled()) return null;
  const tenantId = TenantContext.requireTenantId();
  const row = await operationsSession((tx) => tx.erpTenantBranding.findUnique({ where: { tenantId } }));
  if (!row) return null;
  return {
    logoUrl: row.logoUrl ?? undefined,
    stampUrl: row.stampUrl ?? undefined,
    signatureUrl: row.signatureUrl ?? undefined,
  };
}

export async function upsertTenantBrandingPrisma(patch: TenantBrandingRow): Promise<void> {
  if (!masterDataPrismaEnabled()) return;
  const tenantId = TenantContext.requireTenantId();
  await operationsSession((tx) => tx.erpTenantBranding.upsert({
    where: { tenantId },
    create: {
      tenantId,
      logoUrl: patch.logoUrl,
      stampUrl: patch.stampUrl,
      signatureUrl: patch.signatureUrl,
    },
    update: {
      logoUrl: patch.logoUrl,
      stampUrl: patch.stampUrl,
      signatureUrl: patch.signatureUrl,
    },
  }));
}