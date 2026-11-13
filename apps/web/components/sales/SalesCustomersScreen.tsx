'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { Badge, Button, Card } from '@repo/ui';
import { cn } from '@repo/ui';
import { ChevronLeft, ChevronRight, Columns3, Plus, Search, Users } from 'lucide-react';
import {
  CUSTOMERS_PAGE_SIZE,
  SALES_CUSTOMERS,
  crmPartyToCustomer,
  filterCustomers,
  mergeCustomersWithApi,
  partyTypeLabel,
  type CustomerSortKey,
  type CustomerStatusFilter,
  type RowDensity,
  type SalesCustomer,
} from '../../lib/sales-customers-demo';
import { fetchCrmCustomers } from '../../lib/sales-api';

const STATUS_TABS: Array<{ id: CustomerStatusFilter; label: string }> = [
  { id: 'all', label: 'همه' },
  { id: 'active', label: 'فعال' },
  { id: 'inactive', label: 'غیرفعال' },
];

const DENSITY_TABS: Array<{ id: RowDensity; label: string }> = [
  { id: 'compact', label: 'فشرده' },
  { id: 'normal', label: 'عادی' },
  { id: 'comfortable', label: 'راحت' },
];

export function SalesCustomersScreen() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<CustomerStatusFilter>('all');
  const [sortKey, setSortKey] = useState<CustomerSortKey>('code');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [density, setDensity] = useState<RowDensity>('normal');
  const [page, setPage] = useState(1);
  const [catalog, setCatalog] = useState(SALES_CUSTOMERS);
  const [apiHint, setApiHint] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { customers, source } = await fetchCrmCustomers();
        if (cancelled) return;
        const mapped = customers.map((c) => crmPartyToCustomer(c));
        setCatalog(mergeCustomersWithApi(SALES_CUSTOMERS, mapped));
        if (mapped.length > 0) setApiHint(`${mapped.length} مشتری از ${source}`);
      } catch (e) {
        if (!cancelled) setApiHint(null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(
    () => filterCustomers(catalog, { search, status, sortKey, sortDir }),
    [catalog, search, status, sortKey, sortDir],
  );

  const pageCount = Math.max(1, Math.ceil(filtered.length / CUSTOMERS_PAGE_SIZE));
  const safePage = Math.min(page, pageCount);
  const start = (safePage - 1) * CUSTOMERS_PAGE_SIZE;
  const pageRows = filtered.slice(start, start + CUSTOMERS_PAGE_SIZE);
  const rangeStart = filtered.length === 0 ? 0 : start + 1;
  const rangeEnd = start + pageRows.length;

  const setStatusFilter = (id: CustomerStatusFilter) => {
    setStatus(id);
    setPage(1);
  };

  const onSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-[22px] font-bold m-0">مشتریان</h1>
          <p className="text-[13px] text-muted-foreground mt-1">فقط طرف‌حساب‌های دارای نقش فعال مشتری</p>
          {apiHint ? <p className="text-[11px] text-emerald-700 dark:text-emerald-400 mt-1">{apiHint}</p> : null}
        </div>
        <Button size="sm">
          <Plus className="size-4 ml-1" />
          مشتری جدید
        </Button>
      </div>

      <Card className="overflow-hidden p-0">
        <CustomerTableHeader rangeStart={rangeStart} rangeEnd={rangeEnd} total={filtered.length} />

        <div className="sk-grid-toolbar flex flex-wrap items-center gap-2.5 px-4 py-3 border-b">
          <div className="relative flex-1 min-w-[200px] sm:max-w-[280px]">
            <Search className="absolute right-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              className="w-full rounded-md border bg-background py-2 pr-9 pl-3 text-sm"
              placeholder="نام یا کد مشتری"
              aria-label="نام یا کد مشتری"
              value={search}
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-muted-foreground shrink-0">وضعیت</span>
            <div className="flex gap-0.5 rounded-md border p-0.5" role="radiogroup" aria-label="وضعیت">
              {STATUS_TABS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  role="radio"
                  aria-checked={status === t.id}
                  className={cn(
                    'rounded px-2 py-1 text-xs transition-colors',
                    status === t.id ? 'bg-muted font-semibold' : 'text-muted-foreground hover:bg-muted/50',
                  )}
                  onClick={() => setStatusFilter(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <select
            className="rounded-md border bg-background px-2 py-1.5 text-sm h-8 w-[150px]"
            aria-label="مرتب‌سازی"
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as CustomerSortKey)}
          >
            <option value="code">مرتب‌سازی: کد</option>
            <option value="name">مرتب‌سازی: نام</option>
            <option value="updatedAt">مرتب‌سازی: آخرین تغییر</option>
          </select>
          <select
            className="rounded-md border bg-background px-2 py-1.5 text-sm h-8 w-[100px]"
            aria-label="جهت مرتب‌سازی"
            value={sortDir}
            onChange={(e) => setSortDir(e.target.value as 'asc' | 'desc')}
          >
            <option value="asc">صعودی</option>
            <option value="desc">نزولی</option>
          </select>

          <div className="mr-auto flex items-center gap-2 text-xs">
            <span className="text-muted-foreground">تراکم ردیف</span>
            <div className="flex gap-0.5 rounded-md border p-0.5" role="radiogroup" aria-label="تراکم ردیف">
              {DENSITY_TABS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  role="radio"
                  aria-checked={density === t.id}
                  className={cn(
                    'rounded px-2 py-1 text-xs transition-colors',
                    density === t.id ? 'bg-muted font-semibold' : 'text-muted-foreground hover:bg-muted/50',
                  )}
                  onClick={() => setDensity(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="sk-table-scroll overflow-auto max-h-[560px]">
          <table
            className={cn('sk-crm-grid w-full text-sm', density === 'compact' && 'text-xs', density === 'comfortable' && 'text-[15px]')}
            aria-label="فهرست مشتریان"
            data-density={density}
          >
            <thead className="sticky top-0 bg-muted/80 backdrop-blur-sm z-[1]">
              <tr className="border-b text-muted-foreground text-xs">
                <th scope="col" className="py-2 px-3 text-right min-w-[110px] sticky right-0 bg-muted/95">
                  کد
                </th>
                <th scope="col" className="py-2 px-3 text-right min-w-[200px]">
                  نام مشتری
                </th>
                <th scope="col" className="py-2 px-3 text-right min-w-[200px]">
                  برچسب‌ها
                </th>
                <th scope="col" className="py-2 px-3 text-right min-w-[90px]">
                  نوع
                </th>
                <th scope="col" className="py-2 px-3 text-right min-w-[150px]">
                  نقش‌ها
                </th>
                <th scope="col" className="py-2 px-3 text-right min-w-[100px]">
                  وضعیت
                </th>
                <th scope="col" className="py-2 px-3 text-right min-w-[110px]">
                  آخرین تغییر
                </th>
              </tr>
            </thead>
            <tbody>
              {pageRows.map((row) => (
                <CustomerRow key={row.code} row={row} density={density} />
              ))}
            </tbody>
          </table>
          {pageRows.length === 0 ? (
            <p className="py-12 text-center text-sm text-muted-foreground">مشتری‌ای با این فیلتر یافت نشد.</p>
          ) : null}
        </div>

        <CustomerTableFooter
          page={safePage}
          pageCount={pageCount}
          onPrev={() => setPage((p) => Math.max(1, p - 1))}
          onNext={() => setPage((p) => Math.min(pageCount, p + 1))}
        />
      </Card>
    </div>
  );
}

function CustomerTableHeader({
  rangeStart,
  rangeEnd,
  total,
}: {
  rangeStart: number;
  rangeEnd: number;
  total: number;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b">
      <div className="flex gap-3 min-w-0">
        <span className="grid size-9 place-items-center rounded-lg bg-muted shrink-0">
          <Users className="size-4" />
        </span>
        <div className="min-w-0">
          <p className="font-semibold text-sm">فهرست مشتریان</p>
          <p className="text-xs text-muted-foreground">
            {rangeStart}–{rangeEnd} از {new Intl.NumberFormat('fa-IR').format(total)} مشتری
          </p>
        </div>
      </div>
      <Button type="button" size="sm" variant="outline" aria-haspopup="true">
        <Columns3 className="size-4 ml-1" />
        ستون‌ها
      </Button>
    </div>
  );
}

function CustomerRow({ row, density }: { row: SalesCustomer; density: RowDensity }) {
  const py = density === 'compact' ? 'py-1.5' : density === 'comfortable' ? 'py-3' : 'py-2';
  const href = `/sales/customers/${encodeURIComponent(row.code)}`;
  return (
    <tr className="border-b border-dashed hover:bg-muted/40">
      <td className={cn('px-3 sticky right-0 bg-card', py)}>
        <span className="inline-flex items-center gap-2">
          <span
            className={cn('size-2 rounded-full shrink-0', row.status === 'active' ? 'bg-emerald-500' : 'bg-muted-foreground/40')}
            aria-hidden
          />
          <Link href={href} className="font-mono font-semibold text-xs ltr:inline-block" dir="ltr">
            {row.code}
          </Link>
        </span>
      </td>
      <td className={cn('px-3', py)}>
        <Link href={href} className="font-medium text-primary hover:underline">
          {row.name}
        </Link>
      </td>
      <td className={cn('px-3 text-muted-foreground', py)}>{row.tags ?? '—'}</td>
      <td className={cn('px-3 text-muted-foreground', py)}>{partyTypeLabel(row.partyType)}</td>
      <td className={cn('px-3', py)}>
        <span className="inline-flex flex-wrap gap-1">
          {row.roles.map((r) => (
            <Badge key={r} variant="outline" className="text-[10px] font-normal max-w-[120px] truncate">
              {r}
            </Badge>
          ))}
        </span>
      </td>
      <td className={cn('px-3', py)}>
        {row.status === 'active' ? (
          <Badge className="bg-emerald-600 hover:bg-emerald-600">فعال</Badge>
        ) : (
          <Badge variant="secondary">غیرفعال</Badge>
        )}
      </td>
      <td className={cn('px-3 text-muted-foreground tabular-nums text-xs', py)}>{row.updatedAt}</td>
    </tr>
  );
}

function CustomerTableFooter({
  page,
  pageCount,
  onPrev,
  onNext,
}: {
  page: number;
  pageCount: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="sk-grid-foot flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-t text-xs text-muted-foreground">
      <span className="inline-flex items-center gap-2">
        <span className="size-2 rounded-full bg-muted-foreground/40" aria-hidden />
        غیرفعال
      </span>
      <div className="flex items-center gap-2">
        <span>
          صفحهٔ {new Intl.NumberFormat('fa-IR').format(page)} از {new Intl.NumberFormat('fa-IR').format(pageCount)}،{' '}
          {CUSTOMERS_PAGE_SIZE} ردیف در صفحه
        </span>
        <Button type="button" size="icon" variant="outline" className="size-8" aria-label="صفحهٔ قبل" disabled={page <= 1} onClick={onPrev}>
          <ChevronRight className="size-4" />
        </Button>
        <Button type="button" size="icon" variant="outline" className="size-8" aria-label="صفحهٔ بعد" disabled={page >= pageCount} onClick={onNext}>
          <ChevronLeft className="size-4" />
        </Button>
      </div>
    </div>
  );
}
