'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import {
  computeCloudMonthlyFromErpCodes,
  DEFAULT_ERP_MODULE_CATALOG,
  DEFAULT_CLOUD_SUBSCRIPTION_RATES,
  resolveModuleMonthlyTomans,
  type CloudSubscriptionRates,
  type ErpModuleCode,
} from '@repo/contracts';

const STEPS = [
  'دوره صورتحساب',
  'تعداد صندلی',
  'ماژول‌ها',
  'افزودنی‌ها',
  'کد تخفیف',
  'پیش‌فاکتور',
  'پرداخت',
] as const;

const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://127.0.0.1:3000';

const fmtM = (tomans: number) =>
  new Intl.NumberFormat('fa-IR', { maximumFractionDigits: 0 }).format(Math.round(tomans / 1_000_000));

const fmtK = (tomans: number) =>
  new Intl.NumberFormat('fa-IR', { maximumFractionDigits: 0 }).format(Math.round(tomans / 1000));

const CHECKOUT_MODULES = DEFAULT_ERP_MODULE_CATALOG.filter((m) => m.active);

function parseModuleCodes(raw: string | null): ErpModuleCode[] {
  if (!raw) return ['finance', 'sales'];
  return raw
    .split(',')
    .map((s) => s.trim())
    .filter((c): c is ErpModuleCode => CHECKOUT_MODULES.some((m) => m.code === c));
}

export function CheckoutStepper({ planCode }: { planCode: string }) {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(0);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [seats, setSeats] = useState(5);
  const [discount, setDiscount] = useState(0);
  const [modules, setModules] = useState<ErpModuleCode[]>(['finance', 'sales']);
  const [rates, setRates] = useState<CloudSubscriptionRates>(DEFAULT_CLOUD_SUBSCRIPTION_RATES);
  const [prefillApplied, setPrefillApplied] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const estimateId = searchParams.get('estimateId');
  const fromEstimate = searchParams.get('utm_source') === 'estimate' || Boolean(estimateId);

  useEffect(() => {
    if (prefillApplied) return;
    const seatParam = searchParams.get('seats');
    const modParam = searchParams.get('modules');
    const stepParam = searchParams.get('step');
    if (seatParam) setSeats(Math.min(500, Math.max(1, Number(seatParam) || 5)));
    if (modParam) setModules(parseModuleCodes(modParam));
    if (stepParam) {
      const n = Number(stepParam);
      if (n >= 0 && n < STEPS.length) setStep(n);
    } else if (modParam || seatParam) {
      setStep(1);
    }
    setPrefillApplied(true);
  }, [searchParams, prefillApplied]);

  useEffect(() => {
    void fetch(`${API}/api/v1/public/pricing/cloud-subscription`, { cache: 'no-store' })
      .then((r) => r.json())
      .then((data: CloudSubscriptionRates) => setRates({ ...DEFAULT_CLOUD_SUBSCRIPTION_RATES, ...data }))
      .catch(() => {
        /* defaults */
      });
  }, []);

  const idempotencyKey = useMemo(
    () => `checkout-${planCode}-${billingCycle}-${modules.join('-')}-${seats}`,
    [planCode, billingCycle, modules, seats],
  );

  const monthlyBreakdown = useMemo(
    () => computeCloudMonthlyFromErpCodes(seats, modules, rates),
    [seats, modules, rates],
  );

  const billedMonthly =
    billingCycle === 'yearly'
      ? Math.round(monthlyBreakdown.totalMonthlyTomans * 0.8)
      : monthlyBreakdown.totalMonthlyTomans;

  async function submitPayment() {
    const res = await fetch(`${API}/api/v1/public/checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Idempotency-Key': idempotencyKey },
      body: JSON.stringify({
        tenantId: '11111111-1111-4111-8111-111111111111',
        planCode,
        seats,
        modules,
        discountPercent: discount,
        estimateId: estimateId ?? undefined,
      }),
    });
    const data = (await res.json()) as { status?: string; cached?: boolean };
    if (data.status === 'PendingApproval') {
      setNotice('تخفیف بالای ۲۰٪ — در انتظار تایید مدیر');
      return;
    }
    if (data.status === 'ContactSales') {
      setNotice('پلن سازمانی — با فروش تماس بگیرید');
      return;
    }
    setNotice(data.cached ? 'پرداخت قبلاً ثبت شده (Idempotency)' : 'هدایت به درگاه...');
    const q = estimateId ? `&estimateId=${encodeURIComponent(estimateId)}` : '';
    window.location.href = `/checkout/pending?plan=${planCode}${q}`;
  }

  return (
    <CheckoutBox className="mx-auto max-w-3xl px-4 py-10" dir="rtl">
      {fromEstimate ? (
        <CheckoutBox className="rounded-lg border border-primary/30 bg-primary/5 px-4 py-3 mb-4 text-sm">
          <strong>ادامه از برآوردگر</strong>
          {estimateId ? (
            <span className="block text-xs text-muted-foreground mt-1" dir="ltr">
              estimateId: {estimateId}
            </span>
          ) : null}
          <p className="text-xs text-muted-foreground mt-1">
            صندلی و ماژول‌ها از فرم قیمت‌گذاری بارگذاری شده‌اند؛ تعرفه‌ها با پنل اشتراک هم‌خوان است.
          </p>
        </CheckoutBox>
      ) : null}

      <ol className="flex flex-wrap gap-2 text-xs mb-8">
        {STEPS.map((label, i) => (
          <li key={label} className={i === step ? 'font-bold text-primary' : 'text-muted-foreground'}>
            {i + 1}. {label}
          </li>
        ))}
      </ol>
      <CheckoutBox className="rounded-xl border p-6 shadow-[var(--shadow-card)]">
        {step === 0 && (
          <div className="space-y-3">
            <p className="font-semibold">انتخاب دوره</p>
            <label className="flex gap-2 text-sm">
              <input type="radio" checked={billingCycle === 'monthly'} onChange={() => setBillingCycle('monthly')} />
              ماهانه
            </label>
            <label className="flex gap-2 text-sm">
              <input type="radio" checked={billingCycle === 'yearly'} onChange={() => setBillingCycle('yearly')} />
              سالانه (۲۰٪ تخفیف روی ماژول و پایه)
            </label>
          </div>
        )}
        {step === 1 && (
          <div className="space-y-2">
            <label className="block text-sm">
              تعداد کاربر / صندلی: {new Intl.NumberFormat('fa-IR').format(seats)}
              <input
                type="range"
                min={1}
                max={rates.maxSeats}
                value={Math.min(seats, rates.maxSeats)}
                onChange={(e) => setSeats(Number(e.target.value))}
                className="w-full"
              />
            </label>
            <p className="text-xs text-muted-foreground">
              {rates.includedSeats} کاربر در پایه • مازاد ماهی {fmtK(rates.extraSeatTomans)} هزار تومان / نفر
              {monthlyBreakdown.extraSeatCount > 0
                ? ` (${monthlyBreakdown.extraSeatCount} نفر اضافه)`
                : ''}
            </p>
          </div>
        )}
        {step === 2 && (
          <CheckoutBox className="space-y-3 text-sm">
            <p className="font-semibold">ماژول‌های ERP (ماهانه)</p>
            <p className="text-xs text-muted-foreground">
              پایه ابری: {fmtM(rates.baseMonthlyTomans)} میلیون تومان/ماه
              {rates.source !== 'defaults' ? ` • منبع: ${rates.source}` : ''}
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              {CHECKOUT_MODULES.map((m) => {
                const on = modules.includes(m.code);
                const price = resolveModuleMonthlyTomans(m.code, rates);
                return (
                  <label
                    key={m.code}
                    className={`flex gap-2 items-start border rounded-lg p-2 cursor-pointer ${on ? 'border-primary/50 bg-primary/5' : ''}`}
                  >
                    <input
                      type="checkbox"
                      className="mt-1"
                      checked={on}
                      onChange={() =>
                        setModules((cur) =>
                          cur.includes(m.code)
                            ? cur.length === 1
                              ? cur
                              : cur.filter((x) => x !== m.code)
                            : [...cur, m.code],
                        )
                      }
                    />
                    <span>
                      <strong className="block">{m.nameFa}</strong>
                      <span className="text-xs text-muted-foreground">{m.subtitle}</span>
                      <span className="text-xs block mt-1" dir="ltr">
                        {price > 0 ? `${fmtM(price)} م‌ت/ماه` : 'تماس با فروش'}
                      </span>
                    </span>
                  </label>
                );
              })}
            </div>
            <p className="text-sm font-medium border-t pt-2">
              جمع ماهانه تقریبی: {fmtM(monthlyBreakdown.totalMonthlyTomans)} میلیون تومان
            </p>
          </CheckoutBox>
        )}
        {step === 3 && <p className="text-sm text-muted-foreground">پشتیبانی اختصاصی، فضای ذخیره — اختیاری (Placeholder)</p>}
        {step === 4 && (
          <label className="block text-sm">
            درصد تخفیف
            <input
              type="number"
              className="border rounded w-full mt-1 px-2 py-1"
              value={discount}
              onChange={(e) => setDiscount(Number(e.target.value))}
            />
          </label>
        )}
        {step === 5 && (
          <Label name="پیش‌فاکتور" value=" ">
            <p className="text-sm">پلن: {planCode}</p>
            <p className="text-sm">صندلی: {new Intl.NumberFormat('fa-IR').format(seats)}</p>
            <p className="text-sm">ماژول‌ها: {modules.map((c) => CHECKOUT_MODULES.find((m) => m.code === c)?.nameFa ?? c).join('، ')}</p>
            <ul className="text-xs text-muted-foreground my-2 space-y-1">
              <li>پایه: {fmtM(monthlyBreakdown.baseMonthlyTomans)} م‌ت</li>
              <li>ماژول‌ها: {fmtM(monthlyBreakdown.modulesMonthlyTomans)} م‌ت</li>
              {monthlyBreakdown.extraSeatsTomans > 0 ? (
                <li>کاربر اضافه: {fmtM(monthlyBreakdown.extraSeatsTomans)} م‌ت</li>
              ) : null}
            </ul>
            <p className="text-sm">تخفیف: {new Intl.NumberFormat('fa-IR').format(discount)}٪</p>
            <p className="font-bold mt-2">
              مبلغ {billingCycle === 'yearly' ? 'ماهانه (با تخفیف سالانه)' : 'ماهانه'}:{' '}
              {fmtM(billedMonthly * (1 - discount / 100))} میلیون تومان
            </p>
            <p className="text-xs text-muted-foreground mt-1">درگاه: زرین‌پال / آیدی‌پی</p>
          </Label>
        )}
        {step === 6 && (
          <CheckoutBox>
            <p className="text-sm mb-4">
              با کلیک پرداخت، به درگاه هدایت می‌شوید. Idempotency-Key: <span dir="ltr">{idempotencyKey}</span>
            </p>
            {planCode === 'enterprise' ? (
              <Link href="/contact" className="text-primary underline">
                تماس با فروش
              </Link>
            ) : (
              <button
                type="button"
                className="rounded-md bg-primary text-primary-foreground px-4 py-2"
                onClick={() => void submitPayment()}
              >
                پرداخت
              </button>
            )}
          </CheckoutBox>
        )}
        {notice ? <p className="mt-4 text-sm text-primary">{notice}</p> : null}
        <CheckoutBox className="mt-6 flex justify-between">
          <button type="button" className="text-sm border rounded px-3 py-1" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>
            قبلی
          </button>
          {step < 6 && (
            <button type="button" className="text-sm bg-primary text-primary-foreground rounded px-3 py-1" onClick={() => setStep((s) => s + 1)}>
              بعدی
            </button>
          )}
        </CheckoutBox>
      </CheckoutBox>
    </CheckoutBox>
  );
}

function Label({ value, children }: { name: string; value?: string; children: React.ReactNode }) {
  return <div>{children}</div>;
}

function CheckoutBox(
  props: React.PropsWithChildren<{ className?: string; dir?: 'rtl' | 'ltr' }>,
) {
  return (
    <div className={props.className} dir={props.dir}>
      {props.children}
    </div>
  );
}
