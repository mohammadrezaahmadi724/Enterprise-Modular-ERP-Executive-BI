'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Badge, Button, Card } from '@repo/ui';
import { cn } from '@repo/ui';
import { ClipboardList, Plus } from 'lucide-react';
import { WMS_STOCKTAKING, formatToman, type StocktakingSession } from '../../lib/wms-demo-data';
import { createWmsStocktakingSession, fetchWmsStocktakingSessions, type WmsStocktakingSessionApi } from '../../lib/wms-api';
import { WmsListCardHeader, rowPadding, type RowDensity } from './wms-screen-bits';
import { useEffect, useState } from 'react';

function mapSession(s: WmsStocktakingSessionApi): StocktakingSession {
  return {
    id: s.id,
    warehouse: s.warehouse,
    warehouseLabel: s.warehouseLabel,
    countDate: s.countDate,
    status: s.status,
    totalLines: s.totalLines,
    varianceLines: s.varianceLines,
    varianceToman: s.varianceToman,
  };
}

export function WmsStocktakingScreen() {
  const router = useRouter();
  const [density, setDensity] = useState<RowDensity>('normal');
  const [catalog, setCatalog] = useState(WMS_STOCKTAKING);
  const [apiHint, setApiHint] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { sessions, source } = await fetchWmsStocktakingSessions();
        if (cancelled) return;
        const mapped = sessions.map(mapSession);
        const keys = new Set(mapped.map((s) => s.id));
        setCatalog([...mapped, ...WMS_STOCKTAKING.filter((d) => !keys.has(d.id))]);
        setApiHint(source);
      } catch {
        if (!cancelled) setApiHint(null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Card className="finance-aging-card overflow-hidden p-0">
      <WmsListCardHeader icon={<ClipboardList className="size-4" />} title="سشن‌های انبارگردانی رسمی" subtitle={apiHint ?? '۲ سشن'} />
      <div className="flex flex-wrap items-center gap-2 px-4 py-3 border-b">
        {saveError ? <p className="text-xs text-amber-600 w-full">{saveError}</p> : null}
        <Button
          className="bg-rose-700 hover:bg-rose-800 mr-auto"
          disabled={saving}
          onClick={async () => {
            setSaving(true);
            setSaveError(null);
            try {
              const { session } = await createWmsStocktakingSession({ warehouse: 'WH-ESF' });
              router.push(`/wms/stocktaking/${encodeURIComponent(session.id)}`);
            } catch (e) {
              setSaveError(e instanceof Error ? e.message : 'خطا');
            } finally {
              setSaving(false);
            }
          }}
        >
          <Plus className="size-4 ml-1" />
          {saving ? 'ایجاد…' : 'سشن انبارگردانی (API)'}
        </Button>
        <DensityPicker density={density} onDensity={setDensity} />
      </div>
      <table className="w-full text-sm">
        <thead className="bg-muted/80 text-xs text-muted-foreground">
          <tr className="border-b">
            <th className="py-2 px-3 text-right">شماره سشن</th>
            <th className="py-2 px-3 text-right">انبار</th>
            <th className="py-2 px-3 text-right">تاریخ شمارش</th>
            <th className="py-2 px-3 text-right">وضعیت</th>
            <th className="py-2 px-3 text-right">اقلام کل</th>
            <th className="py-2 px-3 text-right">اقلام مغایرت‌دار</th>
            <th className="py-2 px-3 text-right">ارزش کل مغایرت (تومان)</th>
            <th className="py-2 px-3 text-right">عملیات</th>
          </tr>
        </thead>
        <tbody>
          {catalog.map((s) => (
            <tr key={s.id} className="border-b border-dashed">
              <td className={cn('px-3 font-mono text-xs text-rose-800 font-semibold', rowPadding(density))}>
                <Link href={`/wms/stocktaking/${encodeURIComponent(s.id)}`} className="hover:underline">
                  {s.id}
                </Link>
              </td>
              <td className={cn('px-3 text-xs', rowPadding(density))}>
                {s.warehouse} — {s.warehouseLabel}
              </td>
              <td className={cn('px-3', rowPadding(density))}>{s.countDate}</td>
              <td className={cn('px-3', rowPadding(density))}>
                {s.status === 'reconciled' ? (
                  <Badge className="bg-amber-500 hover:bg-amber-500 text-white">مغایرت‌گیری شده</Badge>
                ) : (
                  <Badge variant="secondary">پیش‌نویس</Badge>
                )}
              </td>
              <td className={cn('px-3 tabular-nums', rowPadding(density))}>{s.totalLines}</td>
              <td className={cn('px-3', rowPadding(density))}>
                {s.varianceLines ? (
                  <span className="inline-flex size-6 items-center justify-center rounded-full bg-amber-200 text-xs font-bold">
                    {s.varianceLines}
                  </span>
                ) : (
                  '—'
                )}
              </td>
              <td className={cn('px-3 tabular-nums', rowPadding(density))}>
                {s.varianceToman ? formatToman(Math.abs(s.varianceToman)) : '۰'}
                {s.varianceToman < 0 ? ' −' : ''}
              </td>
              <td className={cn('px-3', rowPadding(density))}>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/wms/stocktaking/${encodeURIComponent(s.id)}`}>مشاهده و شمارش</Link>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}

function DensityPicker({ density, onDensity }: { density: RowDensity; onDensity: (d: RowDensity) => void }) {
  return (
    <div className="flex gap-1 text-xs">
      {(['compact', 'normal', 'comfortable'] as const).map((d) => (
        <button key={d} type="button" className={density === d ? 'font-semibold' : 'text-muted-foreground'} onClick={() => onDensity(d)}>
          {d === 'compact' ? 'فشرده' : d === 'normal' ? 'معمول' : 'گشاد'}
        </button>
      ))}
    </div>
  );
}
