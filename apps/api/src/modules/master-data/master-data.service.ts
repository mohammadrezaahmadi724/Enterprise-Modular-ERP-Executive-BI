import {
  MASTER_DATA_SECTION_MODULES,
  type MasterDataSectionId,
  masterDataUpgradeHints,
  resolveMasterDataEntitlements,
} from '../../bridges/master-data-entitlements.bridge';
import {
  archiveMasterDataRecord,
  readPersistedBranding,
  readPersistedCodeNameRows,
  readPersistedPriceListRows,
  readPersistedTaxRows,
  persistBrandingPatch,
  SECTION_ARCHIVE_KIND,
} from '../../bridges/master-data-persistence.bridge';
import { MASTER_DATA_OUTBOX, emitMasterDataDomainEvent } from '../../bridges/master-data-outbox.bridge';
import {
  MASTER_HUB_COUNTS,
  readMasterDataCostCenters,
  readMasterDataItems,
  readMasterDataParties,
  readMasterDataSectionFallback,
  readMasterDataWarehouses,
} from '../../bridges/master-data-sources.bridge';
import { masterDataPrismaEnabled } from '@repo/db-erp-operations';
import { auditMasterDataSensitive } from '../../bridges/master-data-audit.bridge';
import {
  putTenantBrandingObject,
  type BrandingSlot,
} from '../../storage/tenant-object-storage.service';
import type { MasterDataListResponse, MasterDataOverviewDto } from './master-data.dto';

const BRANDING_URL_FIELD: Record<BrandingSlot, 'logoUrl' | 'stampUrl' | 'signatureUrl'> = {
  logo: 'logoUrl',
  stamp: 'stampUrl',
  signature: 'signatureUrl',
};

const SECTION_LABELS: Record<MasterDataSectionId, string> = {
  parties: 'طرف‌حساب‌ها',
  items: 'کالاها',
  units: 'واحدهای سنجش',
  taxes: 'مالیات‌ها',
  warehouses: 'انبارها',
  locations: 'مکان‌های انبار',
  costCenters: 'مراکز هزینه',
  priceLists: 'لیست‌های قیمت',
  branding: 'مهر و امضا',
};

const DEEP_LINKS: Record<string, string> = {
  parties: '/sales/customers',
  items: '/wms/stock',
  warehouses: '/wms',
  costCenters: '/finance/cost-centers',
  priceLists: '/sales/quotes',
};

export async function getMasterDataOverview(): Promise<MasterDataOverviewDto> {
  const entitlements = await resolveMasterDataEntitlements();
  const hints = masterDataUpgradeHints();

  const sections = (Object.keys(MASTER_DATA_SECTION_MODULES) as MasterDataSectionId[])
    .filter((id) => id !== 'branding')
    .map((id) => ({
      id,
      countLabel: MASTER_HUB_COUNTS[id],
      entitled: entitlements[id],
      requiredModules: MASTER_DATA_SECTION_MODULES[id],
    }));

  return {
    sections,
    entitlements,
    links: {
      subscription: hints.subscriptionHref,
      deepLinks: DEEP_LINKS,
    },
  };
}

async function gateSection<T>(
  section: MasterDataSectionId,
  loader: () =>
    | Promise<{ rows: T[]; source: string; total: number }>
    | { rows: T[]; source: string; total: number },
): Promise<MasterDataListResponse<T>> {
  const entitlements = await resolveMasterDataEntitlements();
  const hints = masterDataUpgradeHints();
  const entitled = entitlements[section];
  if (!entitled) {
    return {
      entitled: false,
      rows: [],
      total: 0,
      source: 'entitlement_blocked',
      requiredModules: MASTER_DATA_SECTION_MODULES[section],
      upgradeHref: hints.subscriptionHref,
    };
  }
  const pack = await loader();
  return {
    entitled: true,
    rows: pack.rows,
    total: pack.total,
    source: pack.source,
  };
}

export async function getMasterDataParties() {
  return gateSection('parties', () => readMasterDataParties());
}

export async function getMasterDataItems() {
  return gateSection('items', async () => {
    if (masterDataPrismaEnabled()) {
      return readPersistedCodeNameRows('ops_item', 'items');
    }
    return readMasterDataItems();
  });
}

export async function getMasterDataUnits() {
  return gateSection('units', async () => {
    if (masterDataPrismaEnabled()) {
      return readPersistedCodeNameRows('unit', 'units');
    }
    return readMasterDataSectionFallback('units');
  });
}

export async function getMasterDataTaxes() {
  return gateSection('taxes', async () => {
    if (masterDataPrismaEnabled()) {
      return readPersistedTaxRows();
    }
    return readMasterDataSectionFallback('taxes');
  });
}

export async function getMasterDataWarehouses() {
  return gateSection('warehouses', () => readMasterDataWarehouses());
}

export async function getMasterDataLocations() {
  return gateSection('locations', async () => {
    if (masterDataPrismaEnabled()) {
      return readPersistedCodeNameRows('warehouse_location', 'locations');
    }
    return readMasterDataSectionFallback('locations');
  });
}

export async function getMasterDataCostCenters() {
  return gateSection('costCenters', () => readMasterDataCostCenters());
}

export async function getMasterDataPriceLists() {
  return gateSection('priceLists', async () => {
    if (masterDataPrismaEnabled()) {
      return readPersistedPriceListRows();
    }
    return readMasterDataSectionFallback('priceLists');
  });
}

export async function getMasterDataBranding() {
  const entitlements = await resolveMasterDataEntitlements();
  const hints = masterDataUpgradeHints();
  const stored = masterDataPrismaEnabled() ? await readPersistedBranding() : null;
  return {
    entitled: entitlements.branding,
    slots: ['logo', 'stamp', 'signature'] as const,
    configured: {
      logo: Boolean(stored?.logoUrl),
      stamp: Boolean(stored?.stampUrl),
      signature: Boolean(stored?.signatureUrl),
    },
    urls: stored ?? {},
    upgradeHref: entitlements.branding ? undefined : hints.subscriptionHref,
    source: masterDataPrismaEnabled() ? 'erp_tenant_branding' : 'tenant.branding_read_model',
  };
}

export async function archiveMasterDataSectionRecord(section: MasterDataSectionId, code: string) {
  const entitlements = await resolveMasterDataEntitlements();
  const hints = masterDataUpgradeHints();
  if (!entitlements[section]) {
    return {
      ok: false,
      reason: 'entitlement_blocked' as const,
      upgradeHref: hints.subscriptionHref,
      requiredModules: MASTER_DATA_SECTION_MODULES[section],
    };
  }
  if (!SECTION_ARCHIVE_KIND[section]) {
    return { ok: false, reason: 'section_not_archivable' as const };
  }
  const result = await archiveMasterDataRecord(section, code);
  if (result.ok) {
    await emitMasterDataDomainEvent({
      eventType: MASTER_DATA_OUTBOX.MASTER_RECORD_ARCHIVED,
      aggregateId: `${section}:${code}`,
      payload: { section, code },
    });
  }
  return result;
}

export async function patchMasterDataBranding(input: {
  logoUrl?: string;
  stampUrl?: string;
  signatureUrl?: string;
}) {
  const entitlements = await resolveMasterDataEntitlements();
  const hints = masterDataUpgradeHints();
  if (!entitlements.branding) {
    return {
      ok: false,
      reason: 'entitlement_blocked' as const,
      upgradeHref: hints.subscriptionHref,
    };
  }
  if (masterDataPrismaEnabled()) {
    await persistBrandingPatch(input);
    await emitMasterDataDomainEvent({
      eventType: MASTER_DATA_OUTBOX.TENANT_BRANDING_UPDATED,
      aggregateId: 'tenant-branding',
      payload: { slots: Object.keys(input) },
    });
  }
  await auditMasterDataSensitive({
    action: 'MASTER_DATA_BRANDING_PATCH',
    entityType: 'master_data_branding',
    entityId: 'tenant-branding',
    newValue: { slots: Object.keys(input) },
  });
  return { ok: true, configured: await getMasterDataBranding() };
}

export async function uploadMasterDataBrandingSlot(
  slot: BrandingSlot,
  file: Express.Multer.File,
  ip?: string,
) {
  const entitlements = await resolveMasterDataEntitlements();
  const hints = masterDataUpgradeHints();
  if (!entitlements.branding) {
    return {
      ok: false,
      reason: 'entitlement_blocked' as const,
      upgradeHref: hints.subscriptionHref,
    };
  }

  const before = masterDataPrismaEnabled() ? await readPersistedBranding() : null;
  const urlField = BRANDING_URL_FIELD[slot];
  const oldUrl = before?.[urlField];

  const stored = await putTenantBrandingObject(slot, file);
  const patch = {
    logoUrl: before?.logoUrl,
    stampUrl: before?.stampUrl,
    signatureUrl: before?.signatureUrl,
    [urlField]: stored.publicPath,
  };

  if (masterDataPrismaEnabled()) {
    await persistBrandingPatch(patch);
    await emitMasterDataDomainEvent({
      eventType: MASTER_DATA_OUTBOX.TENANT_BRANDING_UPDATED,
      aggregateId: `tenant-branding:${slot}`,
      payload: { slot, path: stored.publicPath, bytes: stored.bytes },
    });
  }

  await auditMasterDataSensitive({
    action: 'MASTER_DATA_BRANDING_UPLOAD',
    entityType: 'master_data_branding',
    entityId: slot,
    oldValue: { url: oldUrl ?? null },
    newValue: {
      url: stored.publicPath,
      contentType: stored.contentType,
      bytes: stored.bytes,
      filename: stored.filename,
      storage: stored.storage,
    },
    ip,
  });

  return { ok: true, slot, ...stored, branding: await getMasterDataBranding() };
}

export function masterDataSectionLabel(section: MasterDataSectionId): string {
  return SECTION_LABELS[section];
}
