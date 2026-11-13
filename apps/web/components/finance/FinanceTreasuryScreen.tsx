'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from '@repo/ui';
import { cn } from '@repo/ui';
import { Building2, ChevronLeft, ChevronRight, Landmark, TrendingUp, Wallet } from 'lucide-react';
import {
  DEMO_BANK_MASTER,
  TREASURY_ACCOUNTS,
  TREASURY_MELLI_POSTED_FOOTER,
  TREASURY_MONTHLY_CASH,
  TREASURY_TRANSACTIONS,
  TREASURY_TXN_TOTAL_HINT,
  accountById,
  formatSignedToman,
  formatToman,
  statusLabelFa,
  type TreasuryAccount,
  type TreasuryTxnKind,
  type TreasuryTxnStatus,
} from '../../lib/finance-treasury-demo';

const PAGE_SIZE = 50;

type TypeTab = 'all' | TreasuryTxnKind;
type StatusFilter = 'all' | TreasuryTxnStatus;
type AccountFilter = 'all' | string;

function AccountIcon({ account }: { account: TreasuryAccount }) {
  const Icon = account.kind === 'bank' ? Building2 : Wallet;
  return (
    <span className="grid size-[34px] shrink-0 place-content-center rounded-[10px] bg-primary/10 text-primary">
      <Icon className="size-4" />
    </span>
  );
}

function FilterChipRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-3 py-2 px-3 border-b bg-muted/20">
      <span className="text-xs font-medium text-muted-foreground shrink-0 w-14">{label}</span>
      <div className="flex flex-wrap gap-1">{children}</div>
    </div>
  );
}

function SegmentedTab({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      className={cn(
        'shrink-0 rounded-md px-2.5 py-1 text-xs transition-colors border',
        active ? 'bg-background border-border font-semibold shadow-sm' : 'border-transparent text-muted-foreground hover:bg-muted/50',
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function FinanceTreasuryScreen() {
  const defaultAccountId = TREASURY_ACCOUNTS[0]?.id ?? '';
  const [selectedAccountId, setSelectedAccountId] = useState<string>(defaultAccountId);
  const [typeTab, setTypeTab] = useState<TypeTab>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [accountFilter, setAccountFilter] = useState<AccountFilter>(defaultAccountId);
  const [page, setPage] = useState(1);

  const selectAccount = (id: string) => {
    setSelectedAccountId(id);
    setAccountFilter(id);
    setPage(1);
  };

  const filtered = useMemo(() => {
    return TREASURY_TRANSACTIONS.filter((t) => {
      if (typeTab === 'receipt' && t.kind !== 'receipt') return false;
      if (typeTab === 'payment' && t.kind !== 'payment') return false;
      if (statusFilter !== 'all' && t.status !== statusFilter) return false;
      if (accountFilter !== 'all' && t.accountId !== accountFilter) return false;
      return true;
    });
  }, [typeTab, statusFilter, accountFilter]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageRows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const footerTotals = useMemo(() => {
    const posted = filtered.filter((t) => t.status === 'posted');
    const inflow = posted.reduce((s, t) => s + (t.inflowToman ?? 0), 0);
    const outflow = posted.reduce((s, t) => s + (t.outflowToman ?? 0), 0);
    if (
      accountFilter === 'TR-BANK-1' &&
      statusFilter === 'all' &&
      typeTab === 'all' &&
      posted.length >= 10
    ) {
      return TREASURY_MELLI_POSTED_FOOTER;
    }
    return { inflowToman: inflow, outflowToman: outflow };
  }, [filtered, accountFilter, statusFilter, typeTab]);

  return (
    <div className="flex flex-col gap-5">
      <p className="text-sm text-muted-foreground">
        هر دریافت یا پرداخت یک سند حسابداری پیش‌نویس می‌سازد؛ پس از تأیید و قطعی‌شدن سند، مانده‌ی صندوق/بانک و اقلام
        باز تسویه‌شده به‌روز می‌شود.
      </p>

      <div className="flex flex-col lg:flex-row gap-3 items-start">
        {/* حساب‌ها — در RTL اولین ستون سمت راست */}
        <div className="w-full lg:w-[min(100%,380px)] lg:shrink-0">
          <AccountsCard selectedId={selectedAccountId} onSelect={selectAccount} />
        </div>

        <div className="flex-1 min-w-0 w-full">
          <TurnoverCard
            typeTab={typeTab}
            setTypeTab={(t) => {
              setTypeTab(t);
              setPage(1);
            }}
            statusFilter={statusFilter}
            setStatusFilter={(s) => {
              setStatusFilter(s);
              setPage(1);
            }}
            accountFilter={accountFilter}
            setAccountFilter={(a) => {
              setAccountFilter(a);
              setSelectedAccountId(a === 'all' ? selectedAccountId : a);
              setPage(1);
            }}
            filteredCount={filtered.length}
            pageRows={pageRows}
            page={page}
            pageCount={pageCount}
            setPage={setPage}
            footerTotals={footerTotals}
          />
        </div>
      </div>

      <MonthlyCashFlowCard />

      <BankMasterCard />

      <NewTreasuryAccountCard />

      <RegisterTxnCard />
    </div>
  );
}

function AccountsCard({ selectedId, onSelect }: { selectedId: string; onSelect: (id: string) => void }) {
  return (
    <Card className="finance-aging-card overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex gap-3">
          <span className="grid size-9 place-items-center rounded-lg bg-muted">
            <Landmark className="size-4" />
          </span>
          <div>
            <CardTitle className="text-base">حساب‌های بانکی و صندوق</CardTitle>
            <p className="text-xs text-muted-foreground">{formatToman(TREASURY_ACCOUNTS.length)} حساب</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex flex-col divide-y">
          {TREASURY_ACCOUNTS.map((a) => {
            const pressed = selectedId === a.id;
            return (
              <button
                key={a.id}
                type="button"
                aria-pressed={pressed}
                title="نمایش گردش این حساب"
                onClick={() => onSelect(a.id)}
                className={cn(
                  'flex w-full items-center gap-3 px-3.5 py-3 text-right transition-colors',
                  pressed ? 'bg-primary/10' : 'hover:bg-muted/40',
                )}
              >
                <AccountIcon account={a} />
                <span className="flex-1 min-w-0 flex flex-col gap-1">
                  <span className="flex items-baseline justify-between gap-2">
                    <span className="text-[13px] font-bold text-foreground text-right">{a.name}</span>
                    <span
                      className="text-sm font-extrabold tabular-nums shrink-0"
                      title="خالص گردش قطعی (دریافت‌ها منهای پرداخت‌های ثبت‌شده)"
                    >
                      {formatSignedToman(a.netToman)}
                    </span>
                  </span>
                  <span className="flex items-center justify-between gap-2 text-[11.5px] text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <span className="font-mono text-xs" dir="ltr">
                        {a.code}
                      </span>
                      <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-5">
                        {a.kind === 'bank' ? 'بانک' : 'صندوق'}
                      </Badge>
                    </span>
                    <Badge className="bg-emerald-600 hover:bg-emerald-600 text-[10px] px-1.5 py-0 h-5">فعال</Badge>
                  </span>
                </span>
              </button>
            );
          })}
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed px-3.5 py-2.5 border-t border-dashed">
          مبلغ هر حساب «خالص گردش قطعی» است؛ دریافت‌های ثبت‌شده منهای پرداخت‌های ثبت‌شدهٔ همان حساب. مانده‌ی دفتری
          حساب از این API در دسترس نیست.
        </p>
      </CardContent>
    </Card>
  );
}

function TurnoverCard(props: {
  typeTab: TypeTab;
  setTypeTab: (t: TypeTab) => void;
  statusFilter: StatusFilter;
  setStatusFilter: (s: StatusFilter) => void;
  accountFilter: AccountFilter;
  setAccountFilter: (a: AccountFilter) => void;
  filteredCount: number;
  pageRows: typeof TREASURY_TRANSACTIONS;
  page: number;
  pageCount: number;
  setPage: (p: number) => void;
  footerTotals: { inflowToman: number; outflowToman: number };
}) {
  const {
    typeTab,
    setTypeTab,
    statusFilter,
    setStatusFilter,
    accountFilter,
    setAccountFilter,
    filteredCount,
    pageRows,
    page,
    pageCount,
    setPage,
    footerTotals,
  } = props;

  const subtitle =
    filteredCount === TREASURY_TXN_TOTAL_HINT && accountFilter === 'TR-BANK-1' && statusFilter === 'all' && typeTab === 'all'
      ? `${formatToman(TREASURY_TXN_TOTAL_HINT)} تراکنش`
      : `${formatToman(filteredCount)} تراکنش (فیلترشده)`;

  return (
    <Card className="finance-aging-card overflow-hidden min-w-0">
      <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between pb-2">
        <div className="flex gap-3">
          <span className="grid size-9 place-items-center rounded-lg bg-muted">
            <TrendingUp className="size-4" />
          </span>
          <div>
            <CardTitle className="text-base">گردش اخیر خزانه</CardTitle>
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          </div>
        </div>
        <div className="flex gap-1 border rounded-lg p-0.5 bg-muted/30" role="tablist">
          {(
            [
              ['all', 'همه'],
              ['receipt', 'دریافت'],
              ['payment', 'پرداخت'],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={typeTab === id}
              className={cn(
                'rounded-md px-3 py-1 text-xs',
                typeTab === id ? 'bg-background font-semibold shadow-sm' : 'text-muted-foreground',
              )}
              onClick={() => setTypeTab(id)}
            >
              {label}
            </button>
          ))}
        </div>
      </CardHeader>

      <FilterChipRow label="وضعیت">
        <SegmentedTab active={statusFilter === 'all'} onClick={() => setStatusFilter('all')}>
          همهٔ وضعیت‌ها
        </SegmentedTab>
        <SegmentedTab active={statusFilter === 'draft'} onClick={() => setStatusFilter('draft')}>
          پیش‌نویس
        </SegmentedTab>
        <SegmentedTab active={statusFilter === 'posted'} onClick={() => setStatusFilter('posted')}>
          ثبت‌شده
        </SegmentedTab>
        <SegmentedTab active={statusFilter === 'returned'} onClick={() => setStatusFilter('returned')}>
          برگشت‌خورده
        </SegmentedTab>
      </FilterChipRow>

      <FilterChipRow label="حساب">
        <SegmentedTab active={accountFilter === 'all'} onClick={() => setAccountFilter('all')}>
          همهٔ حساب‌ها
        </SegmentedTab>
        {TREASURY_ACCOUNTS.map((a) => (
          <SegmentedTab key={a.id} active={accountFilter === a.id} onClick={() => setAccountFilter(a.id)}>
            <span className="max-w-[200px] truncate inline-block">{a.name}</span>
          </SegmentedTab>
        ))}
      </FilterChipRow>

      <div className="max-h-[560px] overflow-auto">
        <table className="w-full text-sm finance-hub-table" aria-label="گردش اخیر خزانه">
          <thead className="sticky top-0 bg-card border-b z-10 text-muted-foreground">
            <tr>
              <th className="py-2 px-2 text-right font-medium">تاریخ</th>
              <th className="py-2 px-2 text-right">طرف‌حساب</th>
              <th className="py-2 px-2 text-right min-w-[120px]">حساب</th>
              <th className="py-2 px-2 text-left">ورودی (تومان)</th>
              <th className="py-2 px-2 text-left">خروجی (تومان)</th>
              <th className="py-2 px-2 text-right hidden xl:table-cell">روش تسویه</th>
              <th className="py-2 px-2 text-right hidden 2xl:table-cell">شمارهٔ منبع</th>
              <th className="py-2 px-2 text-right">سند</th>
              <th className="py-2 px-2 text-right hidden lg:table-cell">شرح</th>
              <th className="py-2 px-2 text-right">وضعیت</th>
              <th className="py-2 px-2" />
            </tr>
          </thead>
          <tbody>
            {pageRows.map((row, i) => {
              const acc = accountById(row.accountId);
              return (
                <tr key={row.id} className={cn('border-b border-dashed', i % 2 === 1 && 'bg-muted/25')}>
                  <td className="py-2 px-2">
                    <span className="inline-flex items-center gap-1.5 tabular-nums">
                      <span
                        className={cn(
                          'size-1.5 rounded-full shrink-0',
                          row.status === 'posted' && 'bg-emerald-500',
                          row.status === 'draft' && 'bg-amber-500',
                          row.status === 'returned' && 'bg-red-500',
                        )}
                        aria-hidden
                      />
                      {row.date}
                    </span>
                  </td>
                  <td className="py-2 px-2 font-medium">{row.party}</td>
                  <td className="py-2 px-2 text-xs text-muted-foreground">{acc?.name ?? row.accountId}</td>
                  <td className="py-2 px-2 text-left tabular-nums font-semibold text-emerald-600">
                    {row.inflowToman != null ? formatToman(row.inflowToman) : ''}
                  </td>
                  <td className="py-2 px-2 text-left tabular-nums font-semibold text-rose-600">
                    {row.outflowToman != null ? formatToman(row.outflowToman) : ''}
                  </td>
                  <td className="py-2 px-2 text-xs hidden xl:table-cell">
                    {row.method}
                    {row.methodRef ? (
                      <span className="text-muted-foreground font-mono" dir="ltr">
                        {' '}
                        · {row.methodRef}
                      </span>
                    ) : null}
                  </td>
                  <td className="py-2 px-2 font-mono text-[11px] hidden 2xl:table-cell" dir="ltr">
                    {row.sourceNo}
                  </td>
                  <td className="py-2 px-2">
                    <Link href="/finance/journal-entries" className="font-mono text-xs font-semibold text-primary">
                      {row.journalNo}
                    </Link>
                  </td>
                  <td className="py-2 px-2 text-xs text-muted-foreground max-w-[200px] truncate hidden lg:table-cell">
                    {row.description}
                  </td>
                  <td className="py-2 px-2">
                    <StatusBadge status={row.status} />
                  </td>
                  <td className="py-2 px-2">
                    <Button variant="link" size="sm" className="h-7 px-1 text-xs">
                      جزئیات
                    </Button>
                  </td>
                </tr>
              );
            })}
            {pageRows.length === 0 && (
              <tr>
                <td colSpan={11} className="py-8 text-center text-muted-foreground text-sm">
                  تراکنشی با این فیلتر یافت نشد.
                </td>
              </tr>
            )}
          </tbody>
          <tfoot className="border-t bg-muted/30 font-medium">
            <tr>
              <td className="py-2 px-2">جمع تراکنش‌های ثبت‌شده</td>
              <td colSpan={2} />
              <td className="py-2 px-2 text-left tabular-nums">{formatToman(footerTotals.inflowToman)}</td>
              <td className="py-2 px-2 text-left tabular-nums">{formatToman(footerTotals.outflowToman)}</td>
              <td colSpan={6} />
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between px-3 py-2 border-t text-xs text-muted-foreground">
        <span>پرداخت از بانک فقط بعد از تأیید سند انجام می‌شود؛ تراکنش‌های «پیش‌نویس» هنوز در گردش قطعی حساب‌ها نیامده‌اند.</span>
        <div className="flex items-center gap-2 shrink-0">
          <span>
            صفحهٔ {formatToman(page)} از {formatToman(pageCount)}، {formatToman(PAGE_SIZE)} ردیف در صفحه
          </span>
          <Button
            variant="outline"
            size="icon"
            className="size-7"
            disabled={page <= 1}
            aria-label="صفحهٔ قبل"
            onClick={() => setPage(page - 1)}
          >
            <ChevronRight className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-7"
            disabled={page >= pageCount}
            aria-label="صفحهٔ بعد"
            onClick={() => setPage(page + 1)}
          >
            <ChevronLeft className="size-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}

function StatusBadge({ status }: { status: TreasuryTxnStatus }) {
  if (status === 'posted') return <Badge className="bg-emerald-600 hover:bg-emerald-600">{statusLabelFa(status)}</Badge>;
  if (status === 'draft') return <Badge variant="secondary">{statusLabelFa(status)}</Badge>;
  return <Badge variant="destructive">{statusLabelFa(status)}</Badge>;
}

function MonthlyCashFlowCard() {
  const max = Math.max(...TREASURY_MONTHLY_CASH.flatMap((m) => [m.inflowToman, m.outflowToman]));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">گردش نقدی ماهانه</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-end gap-3 h-52 border rounded-lg p-4 bg-background" role="img" aria-label="گردش نقدی ماهانه">
          {TREASURY_MONTHLY_CASH.map((m) => (
            <div key={m.label} className="flex-1 flex flex-col items-center gap-1 min-w-0">
              <div className="flex items-end gap-0.5 h-36 w-full justify-center">
                <div
                  className="w-[38%] bg-emerald-500 rounded-t"
                  style={{ height: `${Math.max(8, (m.inflowToman / max) * 100)}%` }}
                  title={`ورودی ${formatToman(m.inflowToman)}`}
                />
                <div
                  className="w-[38%] bg-rose-500 rounded-t"
                  style={{ height: `${Math.max(8, (m.outflowToman / max) * 100)}%` }}
                  title={`خروجی ${formatToman(m.outflowToman)}`}
                />
              </div>
              <span className="text-[10px] text-muted-foreground tabular-nums">{m.label}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <span className="size-2 rounded-sm bg-emerald-500" />
            ورودی
          </span>
          <span className="flex items-center gap-1">
            <span className="size-2 rounded-sm bg-rose-500" />
            خروجی
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

function BankMasterCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">حساب‌های بانکی</CardTitle>
        <p className="text-xs text-muted-foreground">اطلاعات کامل حساب: بانک، شعبه، شماره حساب، شبا و شماره کارت</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 text-sm">
          {['کد', 'عنوان حساب', 'نام بانک', 'شماره شبا'].map((l) => (
            <label key={l} className="flex flex-col gap-1">
              <span className="text-xs text-muted-foreground">{l}</span>
              <input className="rounded-md border bg-background px-2 py-1.5 text-sm" defaultValue={l === 'کد' ? 'BA-000001' : ''} />
            </label>
          ))}
        </div>
        <div className="flex justify-end">
          <Button size="sm">ثبت حساب بانکی</Button>
        </div>
        <div className="overflow-x-auto border rounded-lg">
          <table className="w-full text-sm">
            <thead className="border-b text-muted-foreground">
              <tr>
                <th className="py-2 px-3 text-right">کد</th>
                <th className="py-2 px-3 text-right">عنوان</th>
                <th className="py-2 px-3 text-right">بانک / شعبه</th>
                <th className="py-2 px-3 text-right">شماره حساب</th>
              </tr>
            </thead>
            <tbody>
              {DEMO_BANK_MASTER.map((b) => (
                <tr key={b.code} className="border-b border-dashed">
                  <td className="py-2 px-3 font-mono text-xs" dir="ltr">
                    {b.code}
                  </td>
                  <td className="py-2 px-3">{b.title}</td>
                  <td className="py-2 px-3 text-muted-foreground">—</td>
                  <td className="py-2 px-3 text-muted-foreground">—</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

function NewTreasuryAccountCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">حساب خزانه جدید</CardTitle>
        <p className="text-xs text-muted-foreground">افزودن صندوق یا حساب بانکی</p>
      </CardHeader>
      <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 text-sm">
        <label className="flex flex-col gap-1">
          <span className="text-xs text-muted-foreground">کد *</span>
          <input className="rounded-md border px-2 py-1.5 font-mono text-xs" dir="ltr" defaultValue="TR-000001" />
        </label>
        <label className="flex flex-col gap-1 sm:col-span-2">
          <span className="text-xs text-muted-foreground">نام *</span>
          <input className="rounded-md border px-2 py-1.5" placeholder="مثلاً صندوق فروشگاه" />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-xs text-muted-foreground">نوع *</span>
          <select className="rounded-md border px-2 py-1.5 bg-background">
            <option value="cash">صندوق</option>
            <option value="bank">بانک</option>
          </select>
        </label>
        <div className="sm:col-span-4 flex justify-end">
          <Button size="sm">ایجاد حساب خزانه</Button>
        </div>
      </CardContent>
    </Card>
  );
}

function RegisterTxnCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">ثبت دریافت یا پرداخت</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 text-sm">
        <label className="flex flex-col gap-1">
          <span className="text-xs text-muted-foreground">نوع تراکنش *</span>
          <select className="rounded-md border px-2 py-1.5 bg-background">
            <option value="receipt">دریافت</option>
            <option value="payment">پرداخت</option>
          </select>
        </label>
        <label className="flex flex-col gap-1 sm:col-span-2">
          <span className="text-xs text-muted-foreground">حساب خزانه *</span>
          <select className="rounded-md border px-2 py-1.5 bg-background">
            <option value="">انتخاب حساب</option>
            {TREASURY_ACCOUNTS.map((a) => (
              <option key={a.id} value={a.id}>
                {a.code} — {a.name}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-xs text-muted-foreground">مبلغ (تومان) *</span>
          <input className="rounded-md border px-2 py-1.5 font-mono" dir="ltr" inputMode="numeric" />
        </label>
        <label className="flex flex-col gap-1 sm:col-span-2">
          <span className="text-xs text-muted-foreground">شرح</span>
          <input className="rounded-md border px-2 py-1.5" />
        </label>
        <div className="sm:col-span-3 flex justify-end">
          <Button size="sm">ثبت تراکنش</Button>
        </div>
      </CardContent>
    </Card>
  );
}
