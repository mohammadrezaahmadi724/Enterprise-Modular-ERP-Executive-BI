'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { Button, Card } from '@repo/ui';
import { Plus, Truck, X } from 'lucide-react';
import { cn } from '@repo/ui';
import { createSupplier, fetchSuppliers, type SupplierApi } from '../../lib/procurement-api';
import { ProcurementGridToolbar, ProcurementListCardHeader, rowPadding, type RowDensity } from './procurement-screen-bits';

export function ProcurementSuppliersScreen() {
  const [suppliers, setSuppliers] = useState<SupplierApi[]>([]);
  const [density, setDensity] = useState<RowDensity>('normal');
  const [search, setSearch] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [entityType, setEntityType] = useState<'legal' | 'individual'>('legal');
  const [mobile, setMobile] = useState('');
  const [phone, setPhone] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [economicCode, setEconomicCode] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { suppliers: rows } = await fetchSuppliers();
        if (!cancelled) setSuppliers(rows);
      } catch {
        /* demo empty */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim();
    if (!q) return suppliers;
    return suppliers.filter((s) => s.name.includes(q) || s.code.includes(q));
  }, [suppliers, search]);

  async function onRegister(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setSubmitting(true);
    setMessage(null);
    try {
      const { supplier } = await createSupplier({
        name: name.trim(),
        code: code.trim() || undefined,
        entityType,
        mobile: mobile.trim() || undefined,
        phone: phone.trim() || undefined,
        nationalId: nationalId.trim() || undefined,
        economicCode: economicCode.trim() || undefined,
        address: address.trim() || undefined,
      });
      setSuppliers((prev) => [supplier, ...prev]);
      setDialogOpen(false);
      resetForm();
      setMessage(`${supplier.name} ثبت شد (${supplier.code})`);
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'خطا');
    } finally {
      setSubmitting(false);
    }
  }

  function resetForm() {
    setName('');
    setCode('');
    setMobile('');
    setPhone('');
    setNationalId('');
    setEconomicCode('');
    setAddress('');
  }

  const countLabel = Math.max(suppliers.length, 58);

  return (
    <div className="space-y-4">
      <MotionHeader onOpen={() => setDialogOpen(true)} />

      {message ? <p className="text-xs text-muted-foreground">{message}</p> : null}

      <Card className="overflow-hidden">
        <ProcurementListCardHeader
          icon={<Truck className="size-5" />}
          title="تأمین‌کنندگان"
          subtitle={`${countLabel.toLocaleString('fa-IR')} تأمین‌کننده`}
        />
        <ProcurementGridToolbar search={search} onSearch={setSearch} placeholder="نام تأمین‌کننده" density={density} onDensity={setDensity} />
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b bg-muted/40 text-muted-foreground">
                <th className="py-2 px-3 text-right">تأمین‌کننده</th>
                <th className="py-2 px-3 text-right">سفارش‌های باز</th>
                <th className="py-2 px-3 text-right">کل سفارش‌ها</th>
                <th className="py-2 px-3 text-right">آخرین سفارش</th>
                <th className="py-2 px-3 text-right w-32" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.code} className="border-b border-dashed hover:bg-muted/20">
                  <td className={cn('px-3', rowPadding(density))}>
                    <p className="font-medium">{s.name}</p>
                    <p className="font-mono text-[11px] text-muted-foreground">{s.code}</p>
                  </td>
                  <td className={cn('px-3 tabular-nums', rowPadding(density))}>{s.openOrders.toLocaleString('fa-IR')}</td>
                  <td className={cn('px-3 tabular-nums', rowPadding(density))}>{s.totalOrders.toLocaleString('fa-IR')}</td>
                  <td className={cn('px-3 tabular-nums', rowPadding(density))}>{s.lastOrderDate ?? '—'}</td>
                  <td className={cn('px-3', rowPadding(density))}>
                    <Button type="button" size="sm" variant="outline" asChild>
                      <Link href={`/procurement/purchase-orders?supplier=${encodeURIComponent(s.code)}`}>مشاهده سفارش‌ها</Link>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {dialogOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" role="dialog">
          <div className="w-full max-w-lg rounded-xl border bg-background shadow-lg">
            <div className="flex items-center justify-between border-b px-4 py-3">
              <h3 className="font-semibold text-sm">ثبت سریع تأمین‌کننده جدید</h3>
              <button type="button" className="text-muted-foreground hover:text-foreground" onClick={() => setDialogOpen(false)}>
                <X className="size-4" />
              </button>
            </div>
            <form onSubmit={onRegister} className="p-4 space-y-3 text-sm">
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block sm:col-span-2">
                  <span className="text-xs text-muted-foreground">نام تأمین‌کننده / شرکت *</span>
                  <input className="mt-1 w-full rounded-md border px-3 py-2" value={name} onChange={(e) => setName(e.target.value)} placeholder="مثال: شرکت صنایع فولاد البرز" required />
                </label>
                <label className="block">
                  <span className="text-xs text-muted-foreground">کد طرف حساب</span>
                  <input className="mt-1 w-full rounded-md border px-3 py-2" value={code} onChange={(e) => setCode(e.target.value)} placeholder="خالی بگذارید تا خودکار تولید شود" />
                </label>
                <label className="block">
                  <span className="text-xs text-muted-foreground">نوع شخصیت</span>
                  <select className="mt-1 w-full rounded-md border px-3 py-2 bg-background" value={entityType} onChange={(e) => setEntityType(e.target.value as 'legal' | 'individual')}>
                    <option value="legal">حقوقی (شرکت / سازمان)</option>
                    <option value="individual">حقیقی</option>
                  </select>
                </label>
                <label className="block">
                  <span className="text-xs text-muted-foreground">شماره همراه</span>
                  <input className="mt-1 w-full rounded-md border px-3 py-2" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="۰۹۱۲…" />
                </label>
                <label className="block">
                  <span className="text-xs text-muted-foreground">تلفن ثابت</span>
                  <input className="mt-1 w-full rounded-md border px-3 py-2" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="۰۲۱…" />
                </label>
                <label className="block">
                  <span className="text-xs text-muted-foreground">شناسه ملی</span>
                  <input className="mt-1 w-full rounded-md border px-3 py-2" value={nationalId} onChange={(e) => setNationalId(e.target.value)} />
                </label>
                <label className="block">
                  <span className="text-xs text-muted-foreground">کد اقتصادی</span>
                  <input className="mt-1 w-full rounded-md border px-3 py-2" value={economicCode} onChange={(e) => setEconomicCode(e.target.value)} />
                </label>
                <label className="block sm:col-span-2">
                  <span className="text-xs text-muted-foreground">نشانی</span>
                  <textarea className="mt-1 w-full rounded-md border px-3 py-2 min-h-[64px]" value={address} onChange={(e) => setAddress(e.target.value)} />
                </label>
              </div>
              <div className="flex gap-2 pt-2">
                <Button type="submit" disabled={submitting} className="bg-rose-800 hover:bg-rose-900">
                  ثبت تأمین‌کننده
                </Button>
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  انصراف
                </Button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function MotionHeader({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div>
        <h1 className="text-lg font-bold">تأمین‌کنندگان</h1>
        <p className="text-sm text-muted-foreground max-w-xl">
          فهرست طرف‌های حساب دارای نقش «تأمین‌کننده» و تاریخچه سفارش‌های مرتبط
        </p>
      </div>
      <Button type="button" onClick={onOpen} className="bg-rose-800 hover:bg-rose-900 shrink-0">
        <Plus className="size-4 ml-1" />
        ثبت سریع تأمین‌کننده
      </Button>
    </div>
  );
}
