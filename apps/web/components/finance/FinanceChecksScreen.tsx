'use client';

import { useMemo, useState } from 'react';
import { Badge, Button, Card, CardContent, Input, cn } from '@repo/ui';
import { Camera, Search } from 'lucide-react';
import {
  CHECK_STATUS_OPTIONS,
  DEMO_CHECKBOOKS,
  DEMO_PAYABLE_CHECKS,
  DEMO_RECEIVED_CHECKS,
  computeCheckKpis,
  formatCheckCount,
  formatToman,
  statusLabelFa,
  type CheckLifecycle,
  type Checkbook,
  type PayableCheck,
  type ReceivedCheck,
} from '../../lib/finance-checks-demo';

const CHECKS_DENY = process.env.NEXT_PUBLIC_FINANCE_CHECKS_DENY === 'true';

type MainTab = 'received' | 'payable' | 'checkbooks';

function matchSearch(q: string, fields: string[]) {
  if (!q.trim()) return true;
  const needle = q.trim().toLowerCase();
  return fields.some((f) => f.toLowerCase().includes(needle));
}

export function FinanceChecksScreen() {
  const [tab, setTab] = useState<MainTab>('received');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<CheckLifecycle | 'all'>('all');

  const allForKpi = useMemo(
    () => [...DEMO_RECEIVED_CHECKS, ...DEMO_PAYABLE_CHECKS],
    [],
  );
  const kpis = computeCheckKpis(allForKpi);

  const filteredReceived = useMemo(() => {
    return DEMO_RECEIVED_CHECKS.filter((c) => {
      if (statusFilter !== 'all' && c.status !== statusFilter) return false;
      return matchSearch(search, [c.sayadId, c.bank, c.party, c.serial]);
    });
  }, [search, statusFilter]);

  const filteredPayable = useMemo(() => {
    return DEMO_PAYABLE_CHECKS.filter((c) => {
      if (statusFilter !== 'all' && c.status !== statusFilter) return false;
      return matchSearch(search, [c.sayadId, c.bank, c.party, c.serial]);
    });
  }, [search, statusFilter]);

  const filteredBooks = useMemo(() => {
    return DEMO_CHECKBOOKS.filter((b) => matchSearch(search, [b.bank, b.series, b.accountName]));
  }, [search]);

  return (
    <div className="chq-page flex flex-col gap-4" data-testid="cheques-page">
      <div className="chq-bar flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-sm text-muted-foreground max-w-xl">
          ثبت هوشمند با دوربین، استعلام صیاد، چرخهٔ وصول و اسناد حسابداری خودکار
        </span>
        <div className="chq-actions flex flex-wrap gap-2">
          <Button size="sm">
            <Camera className="size-4 ml-1" />
            اسکن چک با دوربین
          </Button>
          <Button size="sm" variant="secondary">
            ثبت چک دریافتی
          </Button>
          <Button size="sm" variant="secondary">
            صدور چک پرداختی
          </Button>
          <Button size="sm" variant="secondary">
            تعریف دسته‌چک
          </Button>
        </div>
      </div>

      <div className="chq-kpis grid grid-cols-2 lg:grid-cols-4 gap-3">
        <KpiCard label="نزد صندوق" value={kpis.in_safe} tone="info" />
        <KpiCard label="در جریان وصول" value={kpis.in_collection} tone="warn" />
        <KpiCard label="وصول‌شده" value={kpis.cleared} tone="success" />
        <KpiCard label="برگشتی" value={kpis.bounced} tone="danger" />
      </div>

      <div className="chq-tabs flex flex-wrap gap-1 border-b" role="tablist">
        {(
          [
            ['received', 'چک‌های دریافتی'],
            ['payable', 'چک‌های پرداختی'],
            ['checkbooks', 'دسته‌چک‌ها'],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={tab === id}
            className={cn(
              'chq-tab px-3 py-2 text-sm border-b-2 -mb-px transition-colors',
              tab === id
                ? 'border-primary font-semibold text-foreground'
                : 'border-transparent text-muted-foreground hover:text-foreground',
            )}
            onClick={() => setTab(id)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="chq-filters flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <Input
            type="search"
            aria-label="جست‌وجو"
            placeholder="جست‌وجو با شناسه صیاد، بانک، طرف حساب، سریال…"
            className="pr-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          aria-label="فیلتر وضعیت"
          className="rounded-md border bg-background px-3 py-2 text-sm min-w-[180px]"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as CheckLifecycle | 'all')}
          disabled={tab === 'checkbooks'}
        >
          {CHECK_STATUS_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      {CHECKS_DENY ? (
        <section
          className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-8 text-center"
          role="alert"
        >
          <h2 className="text-base font-semibold text-amber-950 dark:text-amber-100">
            دسترسی به بخش چک ندارید
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            نقش «خزانه / چک» یا مجوز <span className="font-mono text-xs">finance.checks.read</span> لازم است.
          </p>
        </section>
      ) : (
        <>
          {tab === 'received' && <ReceivedTable rows={filteredReceived} />}
          {tab === 'payable' && <PayableTable rows={filteredPayable} />}
          {tab === 'checkbooks' && <CheckbooksTable rows={filteredBooks} />}
        </>
      )}
    </div>
  );
}

function KpiCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: 'info' | 'warn' | 'success' | 'danger';
}) {
  const color =
    tone === 'info'
      ? 'text-sky-600'
      : tone === 'warn'
        ? 'text-amber-600'
        : tone === 'success'
          ? 'text-emerald-600'
          : 'text-rose-600';

  return (
    <Card className="chq-kpi">
      <CardContent className="pt-4 pb-3 text-center">
        <div className="chq-kpi-label text-xs text-muted-foreground">{label}</div>
        <div className={cn('chq-kpi-value text-2xl font-bold tabular-nums mt-1', color)}>
          {new Intl.NumberFormat('fa-IR').format(value)}
        </div>
        <div className="chq-kpi-count text-[11px] text-muted-foreground mt-0.5">{formatCheckCount(value)}</div>
      </CardContent>
    </Card>
  );
}

function StatusBadge({ status }: { status: CheckLifecycle }) {
  if (status === 'cleared') return <Badge className="bg-emerald-600 hover:bg-emerald-600">{statusLabelFa(status)}</Badge>;
  if (status === 'bounced') return <Badge variant="destructive">{statusLabelFa(status)}</Badge>;
  if (status === 'in_collection') return <Badge className="bg-amber-500 hover:bg-amber-500">{statusLabelFa(status)}</Badge>;
  if (status === 'in_safe') return <Badge className="bg-sky-600 hover:bg-sky-600">{statusLabelFa(status)}</Badge>;
  return <Badge variant="secondary">{statusLabelFa(status)}</Badge>;
}

function EmptyList({ title }: { title: string }) {
  return (
    <Card>
      <CardContent className="py-14 text-center text-sm text-muted-foreground">
        <p className="font-medium text-foreground">{title}</p>
        <p className="mt-1">دادهٔ نمونه از projection چک و صیاد در موج بعد همگام می‌شود.</p>
      </CardContent>
    </Card>
  );
}

function ReceivedTable({ rows }: { rows: ReceivedCheck[] }) {
  if (rows.length === 0) return <EmptyList title="چک دریافتی‌ای ثبت نشده" />;
  return <ChecksTable rows={rows} />;
}

function PayableTable({ rows }: { rows: PayableCheck[] }) {
  if (rows.length === 0) return <EmptyList title="چک پرداختی‌ای صادر نشده" />;
  return <ChecksTable rows={rows} />;
}

function ChecksTable({ rows }: { rows: Array<ReceivedCheck | PayableCheck> }) {
  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm finance-hub-table">
          <thead className="border-b bg-muted/30 text-muted-foreground">
            <tr>
              <th className="py-2 px-3 text-right">شناسه صیاد</th>
              <th className="py-2 px-3 text-right">بانک</th>
              <th className="py-2 px-3 text-right">طرف‌حساب</th>
              <th className="py-2 px-3 text-right">سریال</th>
              <th className="py-2 px-3 text-left">مبلغ (تومان)</th>
              <th className="py-2 px-3 text-right">سررسید</th>
              <th className="py-2 px-3 text-right">وضعیت</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b border-dashed">
                <td className="py-2 px-3 font-mono text-xs" dir="ltr">
                  {r.sayadId}
                </td>
                <td className="py-2 px-3">{r.bank}</td>
                <td className="py-2 px-3 font-medium">{r.party}</td>
                <td className="py-2 px-3 font-mono text-xs" dir="ltr">
                  {r.serial}
                </td>
                <td className="py-2 px-3 text-left tabular-nums">{formatToman(r.amountToman)}</td>
                <td className="py-2 px-3 tabular-nums">{r.dueDate}</td>
                <td className="py-2 px-3">
                  <StatusBadge status={r.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function CheckbooksTable({ rows }: { rows: Checkbook[] }) {
  if (rows.length === 0) return <EmptyList title="دسته‌چکی تعریف نشده" />;
  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b text-muted-foreground">
            <tr>
              <th className="py-2 px-3 text-right">بانک</th>
              <th className="py-2 px-3 text-right">سری</th>
              <th className="py-2 px-3 text-right">برگ‌ها</th>
              <th className="py-2 px-3 text-right">مصرف‌شده</th>
              <th className="py-2 px-3 text-right">حساب جاری</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((b) => (
              <tr key={b.id} className="border-b border-dashed">
                <td className="py-2 px-3">{b.bank}</td>
                <td className="py-2 px-3 font-mono text-xs" dir="ltr">
                  {b.series}
                </td>
                <td className="py-2 px-3 tabular-nums">
                  {b.leafFrom}–{b.leafTo}
                </td>
                <td className="py-2 px-3 tabular-nums">{b.used}</td>
                <td className="py-2 px-3 text-xs">{b.accountName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
