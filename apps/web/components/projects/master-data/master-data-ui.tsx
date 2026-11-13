'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Badge, Button, Card, CardContent, cn } from '@repo/ui';
import { Building2, Columns3, Plus, Search, Upload } from 'lucide-react';
import { useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  MASTER_DATA_BASE,
  MASTER_DATA_SECTIONS,
  type MasterStatus,
  type MasterStatusFilter,
  type RowDensity,
} from '../../../lib/projects-master-data-demo';
import { fetchMasterDataBranding, fetchMasterDataOverview, uploadMasterDataBranding } from '../../../lib/projects-master-data-api';
import { useMasterDataEntitlements } from '../../../hooks/use-master-data-entitlements';
import { TenantAssetImage } from './tenant-asset-image';
import type { BrandingUploadSlot } from '../../../lib/projects-master-data-api';

const SECTION_ID_MAP: Record<string, string> = {
  parties: 'parties',
  items: 'items',
  units: 'units',
  taxes: 'taxes',
  warehouses: 'warehouses',
  locations: 'locations',
  'cost-centers': 'costCenters',
  'price-lists': 'priceLists',
};

export function MasterDataUpgradeBanner({
  upgradeHref = '/settings/subscription',
  requiredModules,
}: {
  upgradeHref?: string;
  requiredModules?: string[];
}) {
  return (
    <Card className="border-amber-200 bg-amber-50/80 dark:border-amber-900 dark:bg-amber-950/30">
      <CardContent className="pt-4 text-sm space-y-2">
        <p className="font-medium">این بخش در پلن فعلی شما فعال نیست</p>
        <p className="text-xs text-muted-foreground">
          از پنل ادمین / اشتراک می‌توانید ماژول‌های لازم را به مستاجر اضافه کنید
          {requiredModules?.length ? ` (${requiredModules.join('، ')})` : ''}.
        </p>
        <Link href={upgradeHref} className="text-xs text-primary font-medium">
          مدیریت اشتراک و ماژول‌ها ←
        </Link>
      </CardContent>
    </Card>
  );
}

export const STATUS_TABS: Array<{ id: MasterStatusFilter; label: string }> = [
  { id: 'all', label: 'همه' },
  { id: 'active', label: 'فعال' },
  { id: 'inactive', label: 'غیرفعال' },
];

export const DENSITY_TABS: Array<{ id: RowDensity; label: string }> = [
  { id: 'compact', label: 'فشرده' },
  { id: 'normal', label: 'عادی' },
  { id: 'comfortable', label: 'راحت' },
];

export function MasterStatusBadge({ status }: { status: MasterStatus }) {
  if (status === 'active') {
    return (
      <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 font-normal gap-1">
        <span className="size-1.5 rounded-full bg-emerald-600" />
        فعال
      </Badge>
    );
  }
  return (
    <Badge variant="secondary" className="font-normal gap-1">
      <span className="size-1.5 rounded-full bg-muted-foreground" />
      غیرفعال
    </Badge>
  );
}

export function MasterDataNav({ activeHref }: { activeHref?: string }) {
  const pathname = usePathname();
  const active = activeHref ?? pathname;
  const { entitlements } = useMasterDataEntitlements();

  const visibleSections = MASTER_DATA_SECTIONS.filter((s) => entitlements[s.id] !== false);
  const showBranding = entitlements.branding !== false;

  return (
    <nav className="flex flex-wrap gap-1 border-b pb-2 text-xs" aria-label="بخش‌های اطلاعات پایه">
      <Link
        href={MASTER_DATA_BASE}
        className={cn(
          'rounded-md px-2.5 py-1.5 transition-colors',
          active === MASTER_DATA_BASE ? 'bg-primary text-primary-foreground font-medium' : 'text-muted-foreground hover:bg-muted',
        )}
      >
        نمای کلی
      </Link>
      {visibleSections.map((s) => (
        <Link
          key={s.id}
          href={s.href}
          className={cn(
            'rounded-md px-2.5 py-1.5 transition-colors',
            active === s.href ? 'bg-primary text-primary-foreground font-medium' : 'text-muted-foreground hover:bg-muted',
          )}
        >
          {s.label}
        </Link>
      ))}
      {showBranding ? (
        <Link
          href={`${MASTER_DATA_BASE}/branding`}
          className={cn(
            'rounded-md px-2.5 py-1.5 transition-colors',
            active === `${MASTER_DATA_BASE}/branding`
              ? 'bg-primary text-primary-foreground font-medium'
              : 'text-muted-foreground hover:bg-muted',
          )}
        >
          مهر و امضا
        </Link>
      ) : null}
    </nav>
  );
}

export function MasterListPageHeader({
  title,
  meta,
  createLabel,
}: {
  title: string;
  meta: number;
  createLabel: string;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-t-xl border border-b-0 bg-gradient-to-l from-rose-50/80 to-white px-4 py-3 dark:from-rose-950/25">
      <div className="flex items-center gap-2">
        <div className="flex size-9 items-center justify-center rounded-lg bg-violet-600 text-white">
          <Building2 className="size-4" />
        </div>
        <div>
          <h1 className="text-lg font-bold m-0">{title}</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            {meta.toLocaleString('fa-IR')} {title}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button type="button" variant="outline" size="sm">
          <Columns3 className="size-4 ml-1" />
          ستون‌ها
        </Button>
        <Button type="button" size="sm" className="bg-rose-800 hover:bg-rose-900">
          <Plus className="size-4 ml-1" />
          {createLabel}
        </Button>
      </div>
    </div>
  );
}

export function MasterListToolbar({
  searchPlaceholder,
  search,
  onSearch,
  status,
  onStatus,
  density,
  onDensity,
  sortLabel = 'مرتب‌سازی: کد',
}: {
  searchPlaceholder: string;
  search: string;
  onSearch: (v: string) => void;
  status: MasterStatusFilter;
  onStatus: (s: MasterStatusFilter) => void;
  density: RowDensity;
  onDensity: (d: RowDensity) => void;
  sortLabel?: string;
}) {
  return (
    <div className="sk-grid-toolbar flex flex-wrap items-center gap-2.5 px-4 py-3 border-b bg-background">
      <div className="flex items-center gap-2 text-xs w-full sm:w-auto sm:ml-auto order-last sm:order-first">
        <span className="text-muted-foreground shrink-0">تراکم ردیف</span>
        <div className="flex gap-0.5 rounded-md border p-0.5" role="radiogroup" aria-label="تراکم ردیف">
          {DENSITY_TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              className={cn(
                'rounded px-2 py-1 transition-colors',
                density === t.id ? 'bg-muted font-semibold' : 'text-muted-foreground hover:bg-muted/50',
              )}
              onClick={() => onDensity(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative flex-1 min-w-[180px] sm:max-w-[260px]">
        <Search className="absolute right-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <input
          className="w-full rounded-md border bg-background py-2 pr-9 pl-3 text-sm"
          placeholder={searchPlaceholder}
          value={search}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-2 text-xs">
        <span className="text-muted-foreground shrink-0">وضعیت</span>
        <div className="flex gap-0.5 rounded-md border p-0.5">
          {STATUS_TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              className={cn(
                'rounded px-2 py-1 transition-colors',
                status === t.id ? 'bg-muted font-semibold' : 'text-muted-foreground hover:bg-muted/50',
              )}
              onClick={() => onStatus(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <select className="rounded-md border bg-background px-2 py-1.5 text-sm h-8 w-[140px]" defaultValue="code">
        <option value="code">{sortLabel}</option>
      </select>
      <select className="rounded-md border bg-background px-2 py-1.5 text-sm h-8 w-[90px]" defaultValue="asc">
        <option value="asc">صعودی</option>
        <option value="desc">نزولی</option>
      </select>
    </div>
  );
}

export function useMasterListFilters<T extends { status: MasterStatus }>(rows: T[]) {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<MasterStatusFilter>('all');
  const [density, setDensity] = useState<RowDensity>('normal');

  const filtered = useMemo(() => {
    let list = rows;
    if (status !== 'all') list = list.filter((r) => r.status === status);
    const q = search.trim();
    if (q) {
      list = list.filter((r) =>
        Object.values(r).some((v) => String(v).toLowerCase().includes(q.toLowerCase())),
      );
    }
    return list;
  }, [rows, search, status]);

  return { search, setSearch, status, setStatus, density, setDensity, filtered };
}

function densityTableClass(density: RowDensity) {
  if (density === 'compact') return 'text-xs';
  if (density === 'comfortable') return 'text-[15px]';
  return 'text-sm';
}

export function MasterDataListShell({
  title,
  meta,
  createLabel,
  searchPlaceholder,
  filters,
  children,
  activeHref,
  entitled = true,
  upgradeHref,
  requiredModules,
  source,
}: {
  title: string;
  meta: number;
  createLabel: string;
  searchPlaceholder: string;
  filters: ReturnType<typeof useMasterListFilters>;
  children: ReactNode;
  activeHref: string;
  entitled?: boolean;
  upgradeHref?: string;
  requiredModules?: string[];
  source?: string | null;
}) {
  const { search, setSearch, status, setStatus, density, setDensity } = filters;
  return (
    <div className="space-y-4">
      <p className="text-xs text-muted-foreground">
        تنظیمات سازمان / <span className="text-foreground font-medium">اطلاعات پایه</span>
        {source ? <span className="mr-2 text-[10px]">· منبع: {source}</span> : null}
      </p>
      <MasterDataNav activeHref={activeHref} />
      {!entitled ? (
        <MasterDataUpgradeBanner upgradeHref={upgradeHref} requiredModules={requiredModules} />
      ) : null}
      <Card className="overflow-hidden p-0">
        <MasterListPageHeader title={title} meta={meta} createLabel={createLabel} />
        <MasterListToolbar
          searchPlaceholder={searchPlaceholder}
          search={search}
          onSearch={setSearch}
          status={status}
          onStatus={setStatus}
          density={density}
          onDensity={setDensity}
        />
        <div className="sk-table-scroll overflow-auto max-h-[560px]">{children}</div>
      </Card>
    </div>
  );
}

export { densityTableClass };

export function MasterDataHubScreen() {
  const [search, setSearch] = useState('');
  const [entitledBySection, setEntitledBySection] = useState<Record<string, boolean>>({});
  const [countBySection, setCountBySection] = useState<Record<string, string>>({});

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const { data } = await fetchMasterDataOverview();
        if (cancelled) return;
        const map: Record<string, boolean> = { branding: data.entitlements.branding !== false };
        const counts: Record<string, string> = {};
        for (const s of data.sections) {
          map[s.id] = s.entitled;
          counts[s.id] = s.countLabel;
        }
        setEntitledBySection(map);
        setCountBySection(counts);
      } catch {
        /* demo */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const cards = useMemo(() => {
    const q = search.trim();
    let list = MASTER_DATA_SECTIONS.filter((s) => {
      const key = SECTION_ID_MAP[s.id] ?? s.id;
      return entitledBySection[key] !== false;
    });
    if (q) list = list.filter((s) => s.label.includes(q) || s.description.includes(q));
    return list;
  }, [search, entitledBySection]);

  return (
    <div className="space-y-4">
      <p className="text-xs text-muted-foreground">
        تنظیمات سازمان / <span className="text-foreground font-medium">اطلاعات پایه</span>
      </p>
      <div className="rounded-xl border bg-gradient-to-l from-rose-50/90 via-white to-white p-4 shadow-sm dark:from-rose-950/30">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="flex size-11 items-center justify-center rounded-xl bg-violet-600 text-white">
              <Building2 className="size-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold m-0">اطلاعات پایه</h1>
              <p className="text-sm text-muted-foreground mt-0.5">داده‌های مشترک همهٔ ماژول‌ها</p>
            </div>
          </div>
          <div className="relative min-w-[220px] flex-1 sm:max-w-xs">
            <Search className="absolute right-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              className="w-full rounded-md border bg-background py-2 pr-9 pl-3 text-sm"
              placeholder="جست‌وجو در اطلاعات پایه"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>
      <MasterDataNav activeHref={MASTER_DATA_BASE} />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((s) => {
          const sectionKey = SECTION_ID_MAP[s.id] ?? s.id;
          const countLabel = countBySection[sectionKey] ?? s.countLabel;
          return (
          <Card
            key={s.id}
            className="overflow-hidden border-violet-100/80 dark:border-violet-900/40"
          >
            <CardContent className="p-0">
              <div className="h-16 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.12),transparent_70%)] border-b border-dashed" />
              <div className="px-4 pb-4 -mt-8">
                <p className="text-sm font-semibold flex items-center gap-2">
                  {s.label}
                </p>
                <p className="text-2xl font-bold text-violet-700 dark:text-violet-300 mt-1 tabular-nums">{countLabel}</p>
                <p className="text-xs text-muted-foreground mt-2 min-h-[2.5rem]">{s.description}</p>
                <div className="flex gap-3 mt-3 text-xs font-medium">
                  <Link href={s.href} className="text-primary">
                    فهرست
                  </Link>
                  <span className="text-muted-foreground">|</span>
                  <Link href={s.href} className="text-primary">
                    افزودن +
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        );
        })}
      </div>
    </div>
  );
}

function BrandingUploadCard({
  title,
  description,
  configured,
  previewUrl,
  slot,
  entitled,
  onUploaded,
}: {
  title: string;
  description: string;
  configured: boolean;
  previewUrl?: string;
  slot: BrandingUploadSlot;
  entitled: boolean;
  onUploaded: () => void;
}) {
  const [busy, setBusy] = useState(false);
  const inputId = `branding-upload-${slot}`;

  return (
    <Card className="overflow-hidden h-full">
      <div className="h-14 bg-[radial-gradient(circle_at_top,rgba(244,63,94,0.08),transparent)] border-b border-dashed px-4 pt-3">
        <p className="font-semibold text-sm">{title}</p>
        <Badge variant={configured ? 'default' : 'secondary'} className="mt-1 text-[10px] font-normal">
          {configured ? 'تنظیم شده' : 'تنظیم نشده'}
        </Badge>
      </div>
      <CardContent className="pt-4 space-y-3">
        <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
        <div className="rounded-lg border border-dashed py-10 text-center text-xs text-muted-foreground min-h-[120px] flex items-center justify-center">
          {previewUrl ? (
            <TenantAssetImage assetPath={previewUrl} alt={title} className="mx-auto max-h-24 object-contain" />
          ) : (
            'تصویری بارگذاری نشده است'
          )}
        </div>
        <input
          id={inputId}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="sr-only"
          disabled={!entitled || busy}
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            setBusy(true);
            try {
              await uploadMasterDataBranding(slot, file);
              onUploaded();
            } finally {
              setBusy(false);
              e.target.value = '';
            }
          }}
        />
        <Button
          type="button"
          size="sm"
          className="bg-rose-800 hover:bg-rose-900 w-full sm:w-auto"
          disabled={!entitled || busy}
          onClick={() => document.getElementById(inputId)?.click()}
        >
          <Upload className="size-4 ml-1" />
          {busy ? 'در حال بارگذاری…' : 'بارگذاری تصویر'}
        </Button>
      </CardContent>
    </Card>
  );
}

export function MasterDataBrandingScreen() {
  const [branding, setBranding] = useState<Awaited<ReturnType<typeof fetchMasterDataBranding>> | null>(null);

  const loadBranding = () => {
    void (async () => {
      try {
        const data = await fetchMasterDataBranding();
        setBranding(data);
      } catch {
        setBranding(null);
      }
    })();
  };

  useEffect(() => {
    loadBranding();
  }, []);

  const urls = branding?.urls ?? {};
  const entitled = Boolean(branding?.entitled);

  return (
    <div className="space-y-4">
      <p className="text-xs text-muted-foreground">
        تنظیمات سازمان / <span className="text-foreground font-medium">اطلاعات پایه</span>
      </p>
      <MasterDataNav activeHref={`${MASTER_DATA_BASE}/branding`} />
      {branding && !branding.entitled ? (
        <MasterDataUpgradeBanner upgradeHref={branding.upgradeHref} requiredModules={['projects-base']} />
      ) : null}
      <div className="grid gap-4 lg:grid-cols-3">
        <BrandingUploadCard
          title="لوگو"
          slot="logo"
          entitled={entitled}
          onUploaded={loadBranding}
          configured={Boolean(branding?.configured.logo)}
          previewUrl={urls.logoUrl}
          description="در سربرگ پیش‌فاکتور نمایش داده می‌شود. اگر چیزی بارگذاری نکنید، لوگوی زمان ساخت سازمان استفاده می‌شود."
        />
        <BrandingUploadCard
          title="مهر"
          slot="stamp"
          entitled={entitled}
          onUploaded={loadBranding}
          configured={Boolean(branding?.configured.stamp)}
          previewUrl={urls.stampUrl}
          description="در جای «مهر» پایین پیش‌فاکتور چاپ می‌شود. تصویر با پس‌زمینهٔ شفاف (PNG) بهترین نتیجه را می‌دهد."
        />
        <BrandingUploadCard
          title="امضا"
          slot="signature"
          entitled={entitled}
          onUploaded={loadBranding}
          configured={Boolean(branding?.configured.signature)}
          previewUrl={urls.signatureUrl}
          description="در جای «امضا» پایین پیش‌فاکتور چاپ می‌شود. تصویر با پس‌زمینهٔ شفاف (PNG) بهترین نتیجه را می‌دهد."
        />
      </div>
    </div>
  );
}
