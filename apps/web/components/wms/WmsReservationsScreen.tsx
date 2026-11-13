'use client';

import { useEffect, useMemo, useState } from 'react';
import { Badge, Button, Card } from '@repo/ui';
import { cn } from '@repo/ui';
import { CheckCircle2, LockKeyhole, Plus } from 'lucide-react';
import { WMS_RESERVATIONS, type WmsReservation } from '../../lib/wms-demo-data';
import { WMS_WAREHOUSES } from '../../lib/wms-hub-config';
import { createWmsReservation, fetchWmsReservations, type WmsReservationApi } from '../../lib/wms-api';
import { WmsGridToolbar, WmsListCardHeader, rowPadding, type RowDensity } from './wms-screen-bits';

function mapRes(r: WmsReservationApi): WmsReservation {
  return {
    id: r.id,
    sku: r.sku,
    itemName: r.itemName,
    warehouse: r.warehouse,
    warehouseLabel: r.warehouseLabel,
    reference: r.reference,
    qty: r.qty,
    expiry: r.expiry,
    status: r.status,
  };
}

export function WmsReservationsScreen() {
  const [density, setDensity] = useState<RowDensity>('compact');
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<'all' | WmsReservation['status']>('all');
  const [catalog, setCatalog] = useState<WmsReservation[]>(WMS_RESERVATIONS);
  const [apiHint, setApiHint] = useState<string | null>(null);
  const [sku, setSku] = useState('PRD-1016');
  const [wh, setWh] = useState('WH-ESF');
  const [qty, setQty] = useState('10');
  const [reference, setReference] = useState('SO-0480');
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { reservations, source } = await fetchWmsReservations();
        if (cancelled) return;
        const mapped = reservations.map(mapRes);
        const keys = new Set(mapped.map((r) => r.id));
        setCatalog([...mapped, ...WMS_RESERVATIONS.filter((d) => !keys.has(d.id))]);
        setApiHint(source);
      } catch {
        if (!cancelled) setApiHint(null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const rows = useMemo(() => {
    const q = search.trim();
    return catalog.filter((r) => {
      if (status !== 'all' && r.status !== status) return false;
      if (q && !r.id.includes(q) && !r.itemName.includes(q)) return false;
      return true;
    }).slice(0, 100);
  }, [search, status, catalog]);

  return (
    <div className="flex flex-col gap-4">
      <Card className="bg-muted/20 p-4 space-y-3">
        <h3 className="font-semibold text-sm flex items-center gap-2">
          <Plus className="size-4" />
          رزرو جدید
        </h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 text-sm">
          <label className="text-xs flex flex-col gap-1">
            کالا *
            <select className="rounded-md border px-3 py-2" value={sku} onChange={(e) => setSku(e.target.value)}>
              <option value="PRD-1016">PRD-1016</option>
              <option value="PRD-CHAY">PRD-CHAY</option>
              <option value="PRD-BRN3">PRD-BRN3</option>
            </select>
          </label>
          <label className="text-xs flex flex-col gap-1">
            انبار *
            <select className="rounded-md border px-3 py-2" value={wh} onChange={(e) => setWh(e.target.value)}>
              {WMS_WAREHOUSES.map((w) => (
                <option key={w.code} value={w.code}>
                  {w.code}
                </option>
              ))}
            </select>
          </label>
          <label className="text-xs flex flex-col gap-1">
            تعداد *
            <input className="rounded-md border px-3 py-2" type="number" value={qty} onChange={(e) => setQty(e.target.value)} />
          </label>
          <label className="text-xs flex flex-col gap-1 lg:col-span-2">
            مرجع *
            <input className="rounded-md border px-3 py-2 font-mono" value={reference} onChange={(e) => setReference(e.target.value)} />
          </label>
        </div>
        {saveError ? <p className="text-xs text-amber-600">{saveError}</p> : null}
        <p className="text-xs text-muted-foreground">
          رزروهای دارای تاریخ انقضا پس از فرارسیدن موعد، قابل آزادسازی دسته‌جمعی هستند.
        </p>
        <div className="flex flex-wrap gap-2 justify-between">
          <Button variant="outline" size="sm">
            <CheckCircle2 className="size-4 ml-1" />
            آزادسازی رزروهای منقضی‌شده
          </Button>
          <Button
            className="bg-rose-700 hover:bg-rose-800"
            disabled={saving}
            onClick={async () => {
              setSaving(true);
              setSaveError(null);
              try {
                const { reservation } = await createWmsReservation({
                  sku,
                  warehouse: wh,
                  quantity: Number(qty),
                  reference,
                });
                setCatalog((c) => [mapRes(reservation), ...c]);
              } catch (e) {
                setSaveError(e instanceof Error ? e.message : 'خطا');
              } finally {
                setSaving(false);
              }
            }}
          >
            {saving ? 'ثبت…' : 'ثبت رزرو (API)'}
          </Button>
        </div>
      </Card>

      <Card className="finance-aging-card overflow-hidden p-0">
        <WmsListCardHeader icon={<LockKeyhole className="size-4" />} title="رزروها" subtitle={apiHint ?? '۱۰۰ رزرو'} />
        <WmsGridToolbar search={search} onSearch={setSearch} placeholder="شماره یا کالا" density={density} onDensity={setDensity}>
          <StatusFilter value={status} onChange={setStatus} />
        </WmsGridToolbar>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[900px]">
            <thead className="bg-muted/90 text-xs text-muted-foreground">
              <tr className="border-b">
                <th className="py-2 px-3 text-right">شماره رزرو</th>
                <th className="py-2 px-3 text-right">کالا</th>
                <th className="py-2 px-3 text-right">انبار</th>
                <th className="py-2 px-3 text-right">منبع / مرجع</th>
                <th className="py-2 px-3 text-right">مقدار</th>
                <th className="py-2 px-3 text-right">سررسید انقضا</th>
                <th className="py-2 px-3 text-right">وضعیت</th>
                <th className="py-2 px-3 text-right">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-b border-dashed hover:bg-muted/40">
                  <td className={cn('px-3 font-mono text-xs', rowPadding(density))}>{r.id}</td>
                  <td className={cn('px-3', rowPadding(density))}>
                    <p className="text-sm">{r.itemName}</p>
                    <p className="text-[10px] font-mono text-muted-foreground">{r.sku}</p>
                  </td>
                  <td className={cn('px-3 text-xs', rowPadding(density))}>{r.warehouseLabel}</td>
                  <td className={cn('px-3 font-mono text-xs', rowPadding(density))}>{r.reference}</td>
                  <td className={cn('px-3 tabular-nums', rowPadding(density))}>{r.qty}</td>
                  <td className={cn('px-3 text-xs', rowPadding(density))}>{r.expiry ?? '—'}</td>
                  <td className={cn('px-3', rowPadding(density))}>
                    <ResStatus status={r.status} />
                  </td>
                  <td className={cn('px-3', rowPadding(density))}>
                    <Button variant="ghost" size="sm">
                      ⋯
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function Field({
  label,
  select,
  options,
  input,
  type,
  placeholder,
}: {
  label: string;
  select?: boolean;
  options?: string[];
  input?: boolean;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="flex flex-col gap-1 text-xs">
      {label}
      {select ? (
        <select className="rounded-md border bg-background px-3 py-2 text-sm">
          {options?.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      ) : (
        <input type={type ?? 'text'} placeholder={placeholder} className="rounded-md border bg-background px-3 py-2 text-sm" />
      )}
    </label>
  );
}

function StatusFilter({
  value,
  onChange,
}: {
  value: 'all' | WmsReservation['status'];
  onChange: (v: 'all' | WmsReservation['status']) => void;
}) {
  const opts: Array<{ id: string; label: string }> = [
    { id: 'all', label: 'همه' },
    { id: 'active', label: 'فعال' },
    { id: 'released', label: 'آزادشده' },
    { id: 'consumed', label: 'مصرف‌شده' },
  ];
  return (
    <div className="flex gap-1 text-xs">
      <span className="text-muted-foreground ml-1">وضعیت</span>
      {opts.map((o) => (
        <button
          key={o.id}
          type="button"
          className={cn('rounded-md border px-2 py-1', value === o.id ? 'bg-muted font-semibold' : 'border-transparent')}
          onClick={() => onChange(o.id)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function ResStatus({ status }: { status: WmsReservation['status'] }) {
  if (status === 'consumed') return <Badge className="bg-emerald-600 hover:bg-emerald-600">مصرف‌شده</Badge>;
  if (status === 'released') return <Badge variant="secondary">آزادشده</Badge>;
  return <Badge variant="outline">فعال</Badge>;
}
