'use client';

import { cn } from '@repo/ui';
import {
  MASTER_COST_CENTERS,
  MASTER_COST_CENTERS_META,
  MASTER_DATA_BASE,
  MASTER_ITEMS,
  MASTER_ITEMS_META,
  MASTER_LOCATIONS,
  MASTER_LOCATIONS_META,
  MASTER_PARTIES,
  MASTER_PARTIES_META,
  MASTER_PRICE_LISTS,
  MASTER_PRICE_LISTS_META,
  MASTER_TAXES,
  MASTER_TAXES_META,
  MASTER_UNITS,
  MASTER_UNITS_META,
  MASTER_WAREHOUSES,
  MASTER_WAREHOUSES_META,
} from '../../../lib/projects-master-data-demo';
import {
  MasterDataListShell,
  MasterStatusBadge,
  densityTableClass,
  useMasterListFilters,
} from './master-data-ui';
import { useMasterDataSection } from './use-master-data-section';
import { MasterDataArchiveButton } from './master-data-archive-button';
import type { MasterDataResource } from '../../../lib/master-data-actions';

export function MasterDataPartiesScreen() {
  const api = useMasterDataSection('parties', MASTER_PARTIES, MASTER_PARTIES_META);
  const filters = useMasterListFilters(api.rows);
  const { filtered, density } = filters;

  return (
    <MasterDataListShell
      title="طرف‌حساب‌ها"
      meta={api.total}
      createLabel="ایجاد طرف‌حساب"
      searchPlaceholder="جستجوی طرف‌حساب"
      filters={filters}
      activeHref={`${MASTER_DATA_BASE}/parties`}
      entitled={api.entitled}
      upgradeHref={api.upgradeHref}
      requiredModules={api.requiredModules}
      source={api.source}
    >
      <table className={cn('w-full', densityTableClass(density))} aria-label="طرف‌حساب‌ها">
        <thead className="sticky top-0 bg-muted/80 backdrop-blur-sm">
          <tr className="border-b text-muted-foreground text-xs">
            <th className="py-2 px-3 text-right">کد</th>
            <th className="py-2 px-3 text-right">نام</th>
            <th className="py-2 px-3 text-right">نوع</th>
            <th className="py-2 px-3 text-right">نقش</th>
            <th className="py-2 px-3 text-right">کد / شناسه ملی</th>
            <th className="py-2 px-3 text-right">کد اقتصادی</th>
            <th className="py-2 px-3 text-right">موبایل</th>
            <th className="py-2 px-3 text-right">تلفن</th>
            <th className="py-2 px-3 text-right">ایمیل</th>
            <th className="py-2 px-3 text-right">کد پستی</th>
            <th className="py-2 px-3 text-right min-w-[160px]">آدرس</th>
            <th className="py-2 px-3 text-right">وضعیت</th>
            <th className="py-2 px-3 text-right" />
          </tr>
        </thead>
        <tbody>
          {filtered.map((row) => (
            <tr key={row.code} className="border-b hover:bg-muted/30">
              <td className="py-2 px-3 font-mono text-xs">{row.code}</td>
              <td className="py-2 px-3">{row.name}</td>
              <td className="py-2 px-3 text-muted-foreground">{row.partyType}</td>
              <td className="py-2 px-3">{row.role}</td>
              <td className="py-2 px-3 font-mono text-xs">{row.nationalId}</td>
              <td className="py-2 px-3 font-mono text-xs">{row.economicCode}</td>
              <td className="py-2 px-3 font-mono text-xs">{row.mobile}</td>
              <td className="py-2 px-3 font-mono text-xs">{row.phone}</td>
              <td className="py-2 px-3 text-xs">{row.email}</td>
              <td className="py-2 px-3 font-mono text-xs">{row.postalCode}</td>
              <td className="py-2 px-3 text-xs text-muted-foreground">{row.address}</td>
              <td className="py-2 px-3">
                <MasterStatusBadge status={row.status} />
              </td>
              <td className="py-2 px-3">
                <MasterDataArchiveButton
                  resource="parties"
                  code={row.code}
                  entitled={api.entitled}
                  disabled={row.status === 'inactive'}
                  onArchived={api.reload}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </MasterDataListShell>
  );
}

function CodeNameTable({
  rows,
  density,
  resource,
  entitled,
  onArchived,
}: {
  rows: Array<{ code: string; name: string; status: 'active' | 'inactive' }>;
  density: ReturnType<typeof useMasterListFilters>['density'];
  resource: MasterDataResource;
  entitled: boolean;
  onArchived: () => void;
}) {
  return (
    <table className={cn('w-full', densityTableClass(density))}>
      <thead className="sticky top-0 bg-muted/80 backdrop-blur-sm">
        <tr className="border-b text-muted-foreground text-xs">
          <th className="py-2 px-3 text-right">کد</th>
          <th className="py-2 px-3 text-right">نام</th>
          <th className="py-2 px-3 text-right">وضعیت</th>
          <th className="py-2 px-3 text-right" />
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.code} className="border-b hover:bg-muted/30">
            <td className="py-2 px-3 font-mono text-xs">{row.code}</td>
            <td className="py-2 px-3">{row.name}</td>
            <td className="py-2 px-3">
              <MasterStatusBadge status={row.status} />
            </td>
            <td className="py-2 px-3">
              <MasterDataArchiveButton
                resource={resource}
                code={row.code}
                entitled={entitled}
                disabled={row.status === 'inactive'}
                onArchived={onArchived}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function CodeNameListScreen(props: {
  resource: MasterDataResource;
  title: string;
  createLabel: string;
  searchPlaceholder: string;
  activeHref: string;
  fallbackRows: Array<{ code: string; name: string; status: 'active' | 'inactive' }>;
  fallbackTotal: number;
}) {
  const api = useMasterDataSection(props.resource, props.fallbackRows, props.fallbackTotal);
  const filters = useMasterListFilters(api.rows);
  return (
    <MasterDataListShell
      title={props.title}
      meta={api.total}
      createLabel={props.createLabel}
      searchPlaceholder={props.searchPlaceholder}
      filters={filters}
      activeHref={props.activeHref}
      entitled={api.entitled}
      upgradeHref={api.upgradeHref}
      requiredModules={api.requiredModules}
      source={api.source}
    >
      <CodeNameTable
        rows={filters.filtered}
        density={filters.density}
        resource={props.resource}
        entitled={api.entitled}
        onArchived={api.reload}
      />
    </MasterDataListShell>
  );
}

export function MasterDataItemsScreen() {
  return (
    <CodeNameListScreen
      resource="items"
      title="کالاها"
      createLabel="ایجاد کالا"
      searchPlaceholder="جستجوی کالا"
      activeHref={`${MASTER_DATA_BASE}/items`}
      fallbackRows={MASTER_ITEMS}
      fallbackTotal={MASTER_ITEMS_META}
    />
  );
}

export function MasterDataUnitsScreen() {
  return (
    <CodeNameListScreen
      resource="units"
      title="واحدهای سنجش"
      createLabel="ایجاد واحد سنجش"
      searchPlaceholder="جستجوی واحد سنجش"
      activeHref={`${MASTER_DATA_BASE}/units`}
      fallbackRows={MASTER_UNITS}
      fallbackTotal={MASTER_UNITS_META}
    />
  );
}

export function MasterDataWarehousesScreen() {
  return (
    <CodeNameListScreen
      resource="warehouses"
      title="انبارها"
      createLabel="ایجاد انبار"
      searchPlaceholder="جستجوی انبار"
      activeHref={`${MASTER_DATA_BASE}/warehouses`}
      fallbackRows={MASTER_WAREHOUSES}
      fallbackTotal={MASTER_WAREHOUSES_META}
    />
  );
}

export function MasterDataLocationsScreen() {
  return (
    <CodeNameListScreen
      resource="locations"
      title="مکان‌های انبار"
      createLabel="ایجاد مکان انبار"
      searchPlaceholder="جستجوی مکان انبار"
      activeHref={`${MASTER_DATA_BASE}/locations`}
      fallbackRows={MASTER_LOCATIONS}
      fallbackTotal={MASTER_LOCATIONS_META}
    />
  );
}

export function MasterDataCostCentersScreen() {
  return (
    <CodeNameListScreen
      resource="cost-centers"
      title="مراکز هزینه"
      createLabel="ایجاد مرکز هزینه"
      searchPlaceholder="جستجوی مرکز هزینه"
      activeHref={`${MASTER_DATA_BASE}/cost-centers`}
      fallbackRows={MASTER_COST_CENTERS}
      fallbackTotal={MASTER_COST_CENTERS_META}
    />
  );
}

export function MasterDataTaxesScreen() {
  const api = useMasterDataSection('taxes', MASTER_TAXES, MASTER_TAXES_META);
  const filters = useMasterListFilters(api.rows);
  return (
    <MasterDataListShell
      title="مالیات‌ها"
      meta={api.total}
      createLabel="ایجاد مالیات"
      searchPlaceholder="جستجوی مالیات"
      filters={filters}
      activeHref={`${MASTER_DATA_BASE}/taxes`}
      entitled={api.entitled}
      upgradeHref={api.upgradeHref}
      requiredModules={api.requiredModules}
      source={api.source}
    >
      <table className={cn('w-full', densityTableClass(filters.density))}>
        <thead className="sticky top-0 bg-muted/80 backdrop-blur-sm">
          <tr className="border-b text-muted-foreground text-xs">
            <th className="py-2 px-3 text-right">کد</th>
            <th className="py-2 px-3 text-right">نام</th>
            <th className="py-2 px-3 text-right">نرخ</th>
            <th className="py-2 px-3 text-right">وضعیت</th>
            <th className="py-2 px-3 text-right" />
          </tr>
        </thead>
        <tbody>
          {filters.filtered.map((row) => (
            <tr key={row.code} className="border-b hover:bg-muted/30">
              <td className="py-2 px-3 font-mono text-xs">{row.code}</td>
              <td className="py-2 px-3">{row.name}</td>
              <td className="py-2 px-3 tabular-nums">{row.rate}</td>
              <td className="py-2 px-3">
                <MasterStatusBadge status={row.status} />
              </td>
              <td className="py-2 px-3">
                <MasterDataArchiveButton
                  resource="taxes"
                  code={row.code}
                  entitled={api.entitled}
                  disabled={row.status === 'inactive'}
                  onArchived={api.reload}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </MasterDataListShell>
  );
}

export function MasterDataPriceListsScreen() {
  const api = useMasterDataSection('price-lists', MASTER_PRICE_LISTS, MASTER_PRICE_LISTS_META);
  const filters = useMasterListFilters(api.rows);
  return (
    <MasterDataListShell
      title="لیست‌های قیمت"
      meta={api.total}
      createLabel="ایجاد لیست قیمت"
      searchPlaceholder="جستجوی لیست قیمت"
      filters={filters}
      activeHref={`${MASTER_DATA_BASE}/price-lists`}
      entitled={api.entitled}
      upgradeHref={api.upgradeHref}
      requiredModules={api.requiredModules}
      source={api.source}
    >
      <table className={cn('w-full', densityTableClass(filters.density))}>
        <thead className="sticky top-0 bg-muted/80 backdrop-blur-sm">
          <tr className="border-b text-muted-foreground text-xs">
            <th className="py-2 px-3 text-right">کد</th>
            <th className="py-2 px-3 text-right">نام</th>
            <th className="py-2 px-3 text-right">از تاریخ</th>
            <th className="py-2 px-3 text-right">تا تاریخ</th>
            <th className="py-2 px-3 text-right">تعداد اقلام</th>
            <th className="py-2 px-3 text-right">وضعیت</th>
            <th className="py-2 px-3 text-right" />
          </tr>
        </thead>
        <tbody>
          {filters.filtered.map((row) => (
            <tr key={row.code} className="border-b hover:bg-muted/30">
              <td className="py-2 px-3 font-mono text-xs">{row.code}</td>
              <td className="py-2 px-3">{row.name}</td>
              <td className="py-2 px-3 font-mono text-xs">{row.fromDate}</td>
              <td className="py-2 px-3 font-mono text-xs">{row.toDate ?? '—'}</td>
              <td className="py-2 px-3 tabular-nums">{row.itemCount.toLocaleString('fa-IR')}</td>
              <td className="py-2 px-3">
                <MasterStatusBadge status={row.status} />
              </td>
              <td className="py-2 px-3">
                <MasterDataArchiveButton
                  resource="price-lists"
                  code={row.code}
                  entitled={api.entitled}
                  disabled={row.status === 'inactive'}
                  onArchived={api.reload}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </MasterDataListShell>
  );
}
