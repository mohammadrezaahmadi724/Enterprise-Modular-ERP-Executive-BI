import {
  archiveMasterRecordPrisma,
  listMasterRecordsPrisma,
  readTenantBrandingPrisma,
  upsertMasterRecordsPrisma,
  upsertTenantBrandingPrisma,
  type ErpMasterKind,
  type TenantBrandingRow,
} from '@repo/db-erp-operations';
import type { MasterDataSectionId } from './master-data-entitlements.bridge';
import {
  readMasterDataItems,
  readMasterDataSectionFallback,
  type MasterCodeNameRow,
  type MasterPriceListRow,
  type MasterTaxRow,
} from './master-data-sources.bridge';

export const SECTION_ARCHIVE_KIND: Partial<Record<MasterDataSectionId, ErpMasterKind>> = {
  units: 'unit',
  taxes: 'tax',
  locations: 'warehouse_location',
  priceLists: 'price_list',
  items: 'ops_item',
};

function fallbackRowsForKind(kind: ErpMasterKind): MasterRecordSeedRow[] {
  if (kind === 'ops_item') {
    const { rows } = readMasterDataItems();
    return rows.map((r) => ({ kind, code: r.code, name: r.name, status: r.status }));
  }
  const section =
    kind === 'unit'
      ? 'units'
      : kind === 'tax'
        ? 'taxes'
        : kind === 'warehouse_location'
          ? 'locations'
          : kind === 'price_list'
            ? 'priceLists'
            : null;
  if (!section) return [];
  const pack = readMasterDataSectionFallback(section);
  return pack.rows.map((row) => mapFallbackToSeed(kind, row));
}

type MasterRecordSeedRow = {
  kind: ErpMasterKind;
  code: string;
  name: string;
  status: 'active' | 'inactive';
  payload?: Record<string, unknown> | null;
};

function mapFallbackToSeed(kind: ErpMasterKind, row: unknown): MasterRecordSeedRow {
  const base = row as { code: string; name: string; status?: 'active' | 'inactive' };
  const status = base.status ?? 'active';
  if (kind === 'tax') {
    const tax = row as MasterTaxRow;
    return { kind, code: tax.code, name: tax.name, status, payload: { rate: tax.rate } };
  }
  if (kind === 'price_list') {
    const pl = row as MasterPriceListRow;
    return {
      kind,
      code: pl.code,
      name: pl.name,
      status,
      payload: { fromDate: pl.fromDate, toDate: pl.toDate, itemCount: pl.itemCount },
    };
  }
  return { kind, code: base.code, name: base.name, status };
}

export async function ensureMasterKindHydrated(kind: ErpMasterKind): Promise<void> {
  const existing = await listMasterRecordsPrisma(kind);
  if (existing.length) return;
  const seed = fallbackRowsForKind(kind);
  if (!seed.length) return;
  await upsertMasterRecordsPrisma(kind, seed);
}

export async function readPersistedCodeNameRows(
  kind: ErpMasterKind,
  section: MasterDataSectionId,
): Promise<{ rows: MasterCodeNameRow[]; source: string; total: number }> {
  await ensureMasterKindHydrated(kind);
  const stored = await listMasterRecordsPrisma(kind);
  if (!stored.length) {
    const fb = readMasterDataSectionFallback(section);
    return {
      rows: fb.rows as MasterCodeNameRow[],
      source: fb.source,
      total: fb.total,
    };
  }
  const rows: MasterCodeNameRow[] = stored.map((r) => ({
    code: r.code,
    name: r.name,
    status: r.status,
  }));
  return { rows, source: 'erp_master_records', total: rows.length };
}

export async function readPersistedTaxRows(): Promise<{ rows: MasterTaxRow[]; source: string; total: number }> {
  await ensureMasterKindHydrated('tax');
  const stored = await listMasterRecordsPrisma('tax');
  if (!stored.length) {
    const fb = readMasterDataSectionFallback('taxes');
    return { rows: fb.rows as MasterTaxRow[], source: fb.source, total: fb.total };
  }
  const rows: MasterTaxRow[] = stored.map((r) => ({
    code: r.code,
    name: r.name,
    rate: typeof r.payload?.rate === 'number' ? r.payload.rate : 0,
    status: r.status,
  }));
  return { rows, source: 'erp_master_records', total: rows.length };
}

export async function readPersistedPriceListRows(): Promise<{
  rows: MasterPriceListRow[];
  source: string;
  total: number;
}> {
  await ensureMasterKindHydrated('price_list');
  const stored = await listMasterRecordsPrisma('price_list');
  if (!stored.length) {
    const fb = readMasterDataSectionFallback('priceLists');
    return { rows: fb.rows as MasterPriceListRow[], source: fb.source, total: fb.total };
  }
  const rows: MasterPriceListRow[] = stored.map((r) => {
    const p = r.payload ?? {};
    return {
      code: r.code,
      name: r.name,
      fromDate: String(p.fromDate ?? '—'),
      toDate: p.toDate == null ? null : String(p.toDate),
      itemCount: typeof p.itemCount === 'number' ? p.itemCount : 0,
      status: r.status,
    };
  });
  return { rows, source: 'erp_master_records', total: rows.length };
}

export async function archiveMasterDataRecord(
  section: MasterDataSectionId,
  code: string,
): Promise<{ ok: boolean; reason?: string }> {
  const kind = SECTION_ARCHIVE_KIND[section];
  if (!kind) return { ok: false, reason: 'section_not_archivable' };
  const ok = await archiveMasterRecordPrisma(kind, code);
  return { ok };
}

export async function readPersistedBranding(): Promise<TenantBrandingRow | null> {
  return readTenantBrandingPrisma();
}

export async function persistBrandingPatch(patch: TenantBrandingRow): Promise<void> {
  await upsertTenantBrandingPrisma(patch);
}
