'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import {
  DEFAULT_ERP_MODULE_CATALOG,
  DEFAULT_CLOUD_SUBSCRIPTION_RATES,
  resolveModuleMonthlyTomans,
  type CloudSubscriptionRates,
  type ErpModuleCode,
} from '@repo/contracts';
import { marketingUrl } from '../../lib/marketing-url';
import { SubscriptionModulesPanel } from './subscription-modules-panel';
import {
  fetchTenantInvoices,
  fetchTenantSubscription,
  type TenantInvoiceRow,
  type TenantSubscriptionSummary,
} from '../../lib/tenant-billing-api';

const TABS = ['ماژول‌های تخصصی و سرویس‌های ابری', 'سفارش‌ها و تاریخچه پرداخت', 'پلن‌های پایه و صندلی‌ها'] as const;

const MODULE_META: Partial<Record<ErpModuleCode, { slug: string; desc: string }>> = {
  sales: { slug: 'crm-sales', desc: 'فروش، CRM، سفارش و پیش‌فاکتور' },
  finance: { slug: 'accounting', desc: 'حسابداری، خزانه و گزارش مالی' },
  inventory: { slug: 'procurement-inventory', desc: 'خرید، انبار و موجودی' },
  hr: { slug: 'hr', desc: 'پرسنل، حضور و حقوق' },
  'bi-risk': { slug: 'bi', desc: 'داشبورد و رادار ریسک' },
  manufacturing: { slug: 'manufacturing', desc: 'تولید و BOM' },
  distribution: { slug: 'distribution', desc: 'پخش و ویزیتور' },
  retail: { slug: 'retail', desc: 'POS و فروشگاه' },
  'ai-messaging': { slug: 'ai-messaging', desc: 'ساختار یار و کانال پیام' },
};

const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://127.0.0.1:3000';
const PLAN = process.env.NEXT_PUBLIC_CLOUD_PLAN_CODE ?? 'professional';

const fmtM = (t: number) =>
  new Intl.NumberFormat('fa-IR', { maximumFractionDigits: 0 }).format(Math.round(t / 1_000_000));

const fmtDate = (iso: string) =>
  new Intl.DateTimeFormat('fa-IR', { dateStyle: 'medium' }).format(new Date(iso));

const statusFa: Record<string, string> = {
  Paid: 'پرداخت‌شده',
  Issued: 'صادر شده',
  Draft: 'پیش‌نویس',
  Void: 'ابطال',
  Refunded: 'مسترد',
  Open: 'باز',
  Overdue: 'سررسید گذشته',
  Demo: 'نمونه آزمایشی',
};

export function SakhtarSubscriptionAdmin() {
  const [tab, setTab] = useState<(typeof TABS)[number]>(TABS[0]);
  const [rates, setRates] = useState<CloudSubscriptionRates>(DEFAULT_CLOUD_SUBSCRIPTION_RATES);
  const [summary, setSummary] = useState<TenantSubscriptionSummary | null>(null);
  const [invoices, setInvoices] = useState<TenantInvoiceRow[]>([]);
  const [billingError, setBillingError] = useState<string | null>(null);

  useEffect(() => {
    void fetch(`${API}/api/v1/public/pricing/cloud-subscription`, { cache: 'no-store' })
      .then((r) => r.json())
      .then((d: CloudSubscriptionRates) => setRates({ ...DEFAULT_CLOUD_SUBSCRIPTION_RATES, ...d }))
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    void Promise.all([fetchTenantSubscription(), fetchTenantInvoices()])
      .then(([sub, inv]) => {
        setSummary(sub);
        setInvoices(inv);
        setBillingError(null);
      })
      .catch(() => setBillingError('بارگذاری صورتحساب از API ممکن نشد — دادهٔ نمایشی.'));
  }, []);

  const catalog = useMemo(() => DEFAULT_ERP_MODULE_CATALOG.filter((m) => m.active), []);
  const activeModules = summary?.activeErpModules ?? [];

  return (
    <div className="tc-subscription space-y-5" dir="rtl">
      <header>
        <h1 className="text-xl font-bold">مدیریت اشتراک و ماژول‌ها</h1>
        <p className="text-sm text-muted-foreground mt-1">کنترل پلن فعال، ماژول‌های ERP و صورتحساب‌های ابری.</p>
      </header>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <div className="tc-stat-card">
          <span className="text-xs text-muted-foreground">پلن فعال</span>
          <strong className="block text-sm mt-1">{summary?.planLabel ?? 'Sakhtar Cloud — Lifetime Demo'}</strong>
          <span className="tc-badge-active mt-2">{summary?.status ?? 'فعال'}</span>
        </div>
        <div className="tc-stat-card">
          <span className="text-xs text-muted-foreground">ماژول‌های فعال</span>
          <strong className="block text-lg mt-1">
            {activeModules.length} از {catalog.length}
          </strong>
        </div>
        <div className="tc-stat-card">
          <span className="text-xs text-muted-foreground">تقویم صورتحساب</span>
          <strong className="block text-sm mt-1">جلالی (شمسی)</strong>
        </div>
        <div className="tc-stat-card">
          <span className="text-xs text-muted-foreground">صندلی فعال</span>
          <strong className="block text-lg mt-1">
            {summary ? `${summary.usedSeats} / ${summary.seats}` : '—'}
          </strong>
        </div>
      </div>

      {billingError ? (
        <p className="text-xs text-amber-700 bg-amber-50 dark:bg-amber-950/40 rounded-md px-3 py-2">{billingError}</p>
      ) : null}
      {summary?.source === 'database' ? (
        <p className="text-[10px] text-muted-foreground">اشتراک از platform.subscriptions · tenant-scoped</p>
      ) : null}

      <Link href={marketingUrl(`/checkout/plan/${PLAN}?step=2&utm_source=subscription`)} className="tc-btn-buy-module">
        محاسبه و خرید ماژول
      </Link>

      <div className="tc-tabs" role="tablist">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={tab === t}
            className={`tc-tab ${tab === t ? 'is-active' : ''}`}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === TABS[0] ? (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {catalog.map((m) => {
            const meta = MODULE_META[m.code];
            const active = activeModules.includes(m.code);
            const price = resolveModuleMonthlyTomans(m.code, rates);
            return (
              <div key={m.code} className="tc-module-card" style={{ borderColor: `${m.color}33` }}>
                <div className="flex justify-between gap-2">
                  <span className="tc-badge-active">{active ? 'فعال' : 'غیرفعال'}</span>
                  <span className="text-[10px] text-muted-foreground font-mono" dir="ltr">
                    {meta?.slug ?? m.code}
                  </span>
                </div>
                <h3 className="font-semibold mt-2">{m.nameFa}</h3>
                <p className="text-xs text-muted-foreground mt-1">{meta?.desc ?? m.subtitle}</p>
                <p className="text-sm font-medium mt-3">{price > 0 ? `${fmtM(price)} م‌ت / ماه` : '—'}</p>
              </div>
            );
          })}
        </div>
      ) : null}

      {tab === TABS[1] ? (
        <div className="tc-panel overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-muted-foreground border-b">
                <th className="text-right py-2 font-medium">شماره</th>
                <th className="text-right py-2 font-medium">تاریخ</th>
                <th className="text-right py-2 font-medium">مبلغ (تومان)</th>
                <th className="text-right py-2 font-medium">وضعیت</th>
              </tr>
            </thead>
            <tbody>
              {invoices.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-muted-foreground">
                    صورتحسابی ثبت نشده است.
                  </td>
                </tr>
              ) : (
                invoices.map((inv) => (
                  <tr key={inv.id} className="border-b border-border/60">
                    <td className="py-2.5 font-mono text-xs" dir="ltr">
                      {inv.invoiceNumber}
                    </td>
                    <td className="py-2.5">{fmtDate(inv.issueDate)}</td>
                    <td className="py-2.5">{new Intl.NumberFormat('fa-IR').format(inv.totalTomans)}</td>
                    <td className="py-2.5">{statusFa[inv.status] ?? inv.status}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      ) : null}

      {tab === TABS[2] ? (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            پایه ابری: {fmtM(rates.baseMonthlyTomans)} میلیون تومان/ماه • شامل {rates.includedSeats} صندلی
          </p>
          <SubscriptionModulesPanel />
        </div>
      ) : null}
    </div>
  );
}
