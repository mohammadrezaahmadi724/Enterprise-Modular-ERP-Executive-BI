'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

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

export function CheckoutStepper({ planCode }: { planCode: string }) {
  const [step, setStep] = useState(0);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [seats, setSeats] = useState(5);
  const [discount, setDiscount] = useState(0);
  const [modules, setModules] = useState<string[]>(['finance', 'sales']);
  const idempotencyKey = useMemo(() => `checkout-${planCode}-${billingCycle}`, [planCode, billingCycle]);

  async function submitPayment() {
    const res = await fetch(`${API}/api/v1/public/checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Idempotency-Key': idempotencyKey },
      body: JSON.stringify({
        tenantId: '11111111-1111-4111-8111-111111111111',
        planCode,
        seats,
        discountPercent: discount,
      }),
    });
    const data = (await res.json()) as { status?: string; cached?: boolean };
    if (data.status === 'PendingApproval') {
      toast.message('تخفیف بالای ۲۰٪ — در انتظار تایید مدیر');
      return;
    }
    if (data.status === 'ContactSales') {
      toast.message('پلن سازمانی — با فروش تماس بگیرید');
      return;
    }
    toast.success(data.cached ? 'پرداخت قبلاً ثبت شده (Idempotency)' : 'هدایت به درگاه...');
    window.location.href = `/checkout/pending?plan=${planCode}`;
  }

  return (
    <motion className="mx-auto max-w-3xl px-4 py-10" dir="rtl">
      <ol className="flex flex-wrap gap-2 text-xs mb-8">
        {STEPS.map((label, i) => (
          <li key={label} className={i === step ? 'font-bold text-primary' : 'text-muted-foreground'}>
            {i + 1}. {label}
          </li>
        ))}
      </ol>
      <div className="rounded-xl border p-6 shadow-[var(--shadow-card)]">
        {step === 0 && (
          <div className="space-y-3">
            <p className="font-semibold">انتخاب دوره</p>
            <label className="flex gap-2 text-sm">
              <input type="radio" checked={billingCycle === 'monthly'} onChange={() => setBillingCycle('monthly')} />
              ماهانه
            </label>
            <label className="flex gap-2 text-sm">
              <input type="radio" checked={billingCycle === 'yearly'} onChange={() => setBillingCycle('yearly')} />
              سالانه (۲۰٪ تخفیف)
            </label>
          </div>
        )}
        {step === 1 && (
          <label className="block text-sm">
            صندلی: {new Intl.NumberFormat('fa-IR').format(seats)}
            <input type="range" min={1} max={50} value={seats} onChange={(e) => setSeats(Number(e.target.value))} className="w-full" />
          </label>
        )}
        {step === 2 && (
          <div className="space-y-2 text-sm">
            {['finance', 'sales', 'hr', 'inventory'].map((m) => (
              <label key={m} className="flex gap-2">
                <input
                  type="checkbox"
                  checked={modules.includes(m)}
                  onChange={() =>
                    setModules((cur) => (cur.includes(m) ? cur.filter((x) => x !== m) : [...cur, m]))
                  }
                />
                {m}
              </label>
            ))}
          </div>
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
            <p className="text-sm">تخفیف: {new Intl.NumberFormat('fa-IR').format(discount)}٪</p>
            <p className="font-bold mt-2">درگاه: زرین‌پال / آیدی‌پی</p>
          </Label>
        )}
        {step === 6 && (
          <div>
            <p className="text-sm mb-4">با کلیک پرداخت، به درگاه هدایت می‌شوید. Idempotency-Key: {idempotencyKey}</p>
            {planCode === 'enterprise' ? (
              <Link href="/contact" className="text-primary underline">
                تماس با فروش
              </Link>
            ) : (
              <button type="button" className="rounded-md bg-primary text-primary-foreground px-4 py-2" onClick={() => void submitPayment()}>
                پرداخت
              </button>
            )}
          </div>
        )}
        <motion className="mt-6 flex justify-between">
          <button type="button" className="text-sm border rounded px-3 py-1" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>
            قبلی
          </button>
          {step < 6 && (
            <button type="button" className="text-sm bg-primary text-primary-foreground rounded px-3 py-1" onClick={() => setStep((s) => s + 1)}>
              بعدی
            </button>
          )}
        </motion>
      </div>
    </motion>
  );
}

function Label({ value, children }: { name: string; value?: string; children: React.ReactNode }) {
  return <div>{children}</div>;
}

function motion(props: React.PropsWithChildren<{ className?: string }>) {
  return <div className={props.className}>{props.children}</div>;
}
