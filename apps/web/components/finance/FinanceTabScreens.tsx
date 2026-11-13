'use client';

import Link from 'next/link';
import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from '@repo/ui';
import { DEMO_COA } from '../../lib/finance-demo-data';
import { FinancePayablesScreen } from './FinancePayablesScreen';
import { FinanceReceivablesScreen } from './FinanceReceivablesScreen';
import { FinanceTreasuryScreen } from './FinanceTreasuryScreen';
import { FinanceChecksScreen } from './FinanceChecksScreen';
import { FinanceBankReconScreen } from './FinanceBankReconScreen';
import { FinanceSalesAccountsScreen } from './FinanceSalesAccountsScreen';
import { FinanceCostCentersScreen } from './FinanceCostCentersScreen';
import { FinanceYearCloseScreen } from './FinanceYearCloseScreen';
import { FinanceReportsScreen } from './FinanceReportsScreen';
import { FinanceLedgersScreen } from './FinanceLedgersScreen';

function SectionToolbar({ actions }: { actions: React.ReactNode }) {
  return <div className="flex flex-wrap items-center justify-between gap-2">{actions}</div>;
}

export function FinancePeriodsScreen() {
  const months = [
    'فروردین',
    'اردیبهشت',
    'خرداد',
    'تیر',
    'مرداد',
    'شهریور',
    'مهر',
    'آبان',
    'آذر',
    'دی',
    'بهمن',
    'اسفند',
  ];
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">وضعیت پیکربندی مالی و حساب‌های کنترلی</CardTitle>
          <p className="text-sm text-muted-foreground">واحد پول: ریال (نمایش تومان) · وضعیت: آماده عملیات</p>
        </CardHeader>
        <CardContent className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4 text-sm">
          {['حساب دریافتنی', 'حساب پرداختنی', 'بانک و صندوق', 'فروش', 'بهای تمام‌شده', 'VAT', 'موجودی', 'سود انباشته'].map(
            (l) => (
              <div key={l} className="rounded-lg border px-3 py-2">
                ✓ {l}
              </div>
            ),
          )}
        </CardContent>
      </Card>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">چک‌لیست بستن اردیبهشت ۱۴۰۵</CardTitle>
            <p className="text-xs text-muted-foreground">۶ از ۱۶ مورد انجام شده</p>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {['دوره باز است', '۴ سند منتظر ثبت قطعی', 'استهلاک دارایی ثابت', 'تسعیر پایان سال'].map((t, i) => (
              <div key={t} className="flex justify-between border-b border-dashed py-1">
                <span>{t}</span>
                <Badge variant={i < 2 ? 'default' : 'secondary'}>{i < 2 ? 'انجام شد' : 'باز'}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">سال مالی ۱۴۰۵</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {months.map((m, i) => (
              <MotionSafeMonth
                key={m}
                className={`rounded-lg border px-2 py-3 text-center text-xs ${i === 7 ? 'border-emerald-500 bg-emerald-500/10 font-semibold' : i === 1 ? 'ring-2 ring-emerald-400/50' : ''}`}
              >
                {m}
                <div className="text-[10px] text-muted-foreground mt-1">{i === 7 ? 'باز · جاری' : 'باز'}</div>
              </MotionSafeMonth>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function FinanceMoadianScreen() {
  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="pt-6 text-sm space-y-3">
          <p>
            سامانه مودیان — صورتحساب الکترونیکی با شناسه یکتای ۲۲ رقمی؛ ارسال با امضای دیجیتال و استعلام وضعیت.
          </p>
        </CardContent>
      </Card>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">تنظیمات اتصال</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 text-sm">
            <label className="grid gap-1">
              <span className="text-muted-foreground">شناسه یکتای حافظه مالیاتی</span>
              <input className="rounded-md border px-2 py-1.5 font-mono text-xs" placeholder="۲۲ رقم" dir="ltr" />
            </label>
            <label className="grid gap-1">
              <span className="text-muted-foreground">شماره اقتصادی فروشگاه</span>
              <input className="rounded-md border px-2 py-1.5 font-mono text-xs" dir="ltr" />
            </label>
            <label className="grid gap-1">
              <span className="text-muted-foreground">روش امضا</span>
              <select className="rounded-md border px-2 py-1.5">
                <option>RSA / گواهی سخت‌افزاری</option>
                <option>HSM سازمانی</option>
              </select>
            </label>
            <label className="grid gap-1">
              <span className="text-muted-foreground">محیط</span>
              <select className="rounded-md border px-2 py-1.5">
                <option>آزمایشی (Sandbox)</option>
                <option>عملیاتی</option>
              </select>
            </label>
            <Button size="sm" className="justify-self-start">
              ذخیره تنظیمات اتصال
            </Button>
            <p className="text-xs text-amber-600">اتصال الزامی است — صف ارسال تا تکمیل تنظیمات خالی می‌ماند.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">صف ارسال و استعلام</CardTitle>
          </CardHeader>
          <CardContent className="py-12 text-center text-muted-foreground text-sm">
            فاکتوری در صف نیست. پس از اتصال، فاکتورهای دفتر قانونی اینجا نمایش داده می‌شوند.
          </CardContent>
        </Card>
      </div>
      <ol className="grid gap-2 sm:grid-cols-4 text-sm">
        {['صدور فاکتور فروش', 'ارسال به سامانه', 'استعلام وضعیت', 'واکنش خریدار'].map((s, i) => (
          <li key={s} className="rounded-lg border p-3">
            <span className="text-muted-foreground">مرحله {i + 1}</span>
            <div className="font-medium">{s}</div>
          </li>
        ))}
      </ol>
      <Card>
        <CardContent className="py-10 text-center text-muted-foreground text-sm">
          صفی ارسال خالی است — ابتدا تنظیمات اتصال (حافظه مالیاتی / امضای دیجیتال) را تکمیل کنید.
        </CardContent>
      </Card>
    </div>
  );
}

export function FinanceAssistantScreen() {
  return (
    <Card>
      <CardContent className="py-10 text-center space-y-3">
        <p className="font-semibold">مالی یار — ERP Roshd</p>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          در محیط نمایشی پاسخ‌دهی غیرفعال است. با اشتراک کامل، پایش مغایرت، سررسید چک و اقلام باز فعال می‌شود.
        </p>
        <Button asChild>
          <Link href="/ai/conversations">رفتن به دستیار</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export function FinanceChartOfAccountsScreen() {
  return (
    <Card className="finance-aging-card">
      <CardHeader>
        <CardTitle className="text-base">کدینگ حساب‌ها (استاندارد ایران)</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-muted-foreground">
              <th className="py-2 text-right">کد</th>
              <th className="py-2 text-right">عنوان حساب</th>
              <th className="py-2 text-right">سطح</th>
            </tr>
          </thead>
          <tbody>
            {DEMO_COA.map((a) => (
              <tr key={a.code} className="border-b border-dashed">
                <td className="py-2 font-mono" style={{ paddingInlineStart: `${(a.level - 1) * 12}px` }}>
                  {a.code}
                </td>
                <td className="py-2">{a.name}</td>
                <td className="py-2 text-muted-foreground">{a.level}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}

export function FinanceTreasuryBankAccountsScreen() {
  return <FinanceTreasuryScreen />;
}

const FINANCE_SCREEN_MAP: Record<string, () => React.ReactNode> = {
  '/finance/receivables': FinanceReceivablesScreen,
  '/finance/payables': FinancePayablesScreen,
  '/finance/periods': FinancePeriodsScreen,
  '/finance/moadian': FinanceMoadianScreen,
  '/finance/ledgers': FinanceLedgersScreen,
  '/finance/assistant': FinanceAssistantScreen,
  '/finance/bank-reconciliation': FinanceBankReconScreen,
  '/finance/chart-of-accounts': FinanceChartOfAccountsScreen,
  '/finance/reports': FinanceReportsScreen,
  '/finance/sales-accounts': FinanceSalesAccountsScreen,
  '/finance/cost-centers': FinanceCostCentersScreen,
  '/treasury/bank-accounts': FinanceTreasuryBankAccountsScreen,
  '/finance/fixed-assets': () => (
    <Card>
      <CardContent className="py-10 text-center text-sm text-muted-foreground">
        دارایی ثابت، استهلاک ماهانه و سند خودکار — مطابق استاندارد حسابداری ایران
      </CardContent>
    </Card>
  ),
  '/finance/budget': () => (
    <Card>
      <CardContent className="py-10 text-center text-sm text-muted-foreground">
        بودجه و انحراف — مقایسه واقعی با بودجه به تفکیک مرکز هزینه
      </CardContent>
    </Card>
  ),
  '/finance/costing': () => (
    <Card>
      <CardContent className="py-10 text-center text-sm text-muted-foreground">
        بهای تمام‌شده واقعی کالا و خدمات
      </CardContent>
    </Card>
  ),
  '/finance/vat': () => (
    <Card>
      <CardContent className="py-10 text-center text-sm text-muted-foreground">محاسبه و اظهار ارزش افزوده — دوره آبان ۱۴۰۵</CardContent>
    </Card>
  ),
  '/finance/year-close': FinanceYearCloseScreen,
  '/treasury/dashboard': FinanceTreasuryScreen,
  '/treasury/checks': FinanceChecksScreen,
};

export function renderFinanceScreen(href: string): React.ReactNode | null {
  const exact = FINANCE_SCREEN_MAP[href];
  if (exact) return exact();
  return null;
}

function MotionSafeMonth(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} />;
}
