'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button, Card, CardContent } from '@repo/ui';
import { FileSpreadsheet, Info } from 'lucide-react';
import { WMS_KARDEX_TOTALS, WMS_KARDEX_WAREHOUSE_STATS } from '../../lib/wms-demo-data';
import { fetchWmsKardex, type WmsKardexApi } from '../../lib/wms-api';

export function WmsKardexScreen() {
  const [kardex, setKardex] = useState<WmsKardexApi | null>(null);
  const [source, setSource] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { kardex: data, source: src } = await fetchWmsKardex();
        if (!cancelled) {
          setKardex(data);
          setSource(src);
        }
      } catch {
        if (!cancelled) setKardex(null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const totals = kardex?.totals ?? WMS_KARDEX_TOTALS;
  const byWh = kardex?.byWarehouse?.length ? kardex.byWarehouse : WMS_KARDEX_WAREHOUSE_STATS;
  const entries = kardex?.entries?.slice(0, 20) ?? [];

  return (
    <div className="flex flex-col gap-4">
      <Card className="border-sky-200 bg-sky-50/60">
        <CardContent className="py-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-3">
            <Info className="size-5 text-sky-700 shrink-0" />
            <div className="text-sm">
              <p className="font-semibold">کاردکس مقداری و ریالی کالا</p>
              <p className="text-xs text-muted-foreground mt-1">
                خوانش از projection_wms_kardex — بدون کوئری تجمیعی روی stock_movements
              </p>
            </div>
          </div>
          <Button className="bg-rose-700 hover:bg-rose-800" asChild>
            <Link href="/wms/kardex">
              <FileSpreadsheet className="size-4 ml-1" />
              مشاهده کاردکس کالا
            </Link>
          </Button>
        </CardContent>
      </Card>

      {source ? <p className="text-[11px] text-muted-foreground">منبع: {source}</p> : null}

      <div className="rounded-md border border-amber-200 bg-amber-50/80 px-3 py-2 text-xs">
        حداکثر {entries.length || 100} ردیف اخیر در projection نمایش داده می‌شود.
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard tone="ok" label="کافی" value={totals.ok} />
        <StatCard tone="warn" label="دارای رزرو یا مسدودی" value={totals.reservedBlocked} />
        <StatCard tone="bad" label="ناموجود" value={totals.out} />
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {byWh.map((w) => (
          <Card key={w.code}>
            <CardContent className="pt-4 space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="font-mono font-bold">{w.code}</span>
                <span className="text-xs bg-muted px-2 py-0.5 rounded-full">{w.rows} ردیف</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs tabular-nums">
                <span>کافی: {w.ok}</span>
                <span>رزرو/مسدود: {w.reserved}</span>
                <span>ناموجود: {w.out}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {entries.length > 0 ? (
        <Card>
          <CardContent className="pt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-xs text-muted-foreground border-b">
                <tr>
                  <th className="py-2 text-right">زمان</th>
                  <th className="py-2 text-right">کالا</th>
                  <th className="py-2 text-right">انبار</th>
                  <th className="py-2 text-right">نوع</th>
                  <th className="py-2 text-right">ورود</th>
                  <th className="py-2 text-right">خروج</th>
                  <th className="py-2 text-right">مرجع</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((e) => (
                  <tr key={e.id} className="border-b border-dashed text-xs">
                    <td className="py-1.5">{e.at.slice(0, 19)}</td>
                    <td className="py-1.5 font-mono">{e.sku}</td>
                    <td className="py-1.5 font-mono">{e.warehouse}</td>
                    <td className="py-1.5">{e.movement}</td>
                    <td className="py-1.5 tabular-nums">{e.qtyIn || '—'}</td>
                    <td className="py-1.5 tabular-nums">{e.qtyOut || '—'}</td>
                    <td className="py-1.5 font-mono">{e.reference}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}

function StatCard({ tone, label, value }: { tone: 'ok' | 'warn' | 'bad'; label: string; value: number }) {
  const border = tone === 'ok' ? 'border-t-emerald-500' : tone === 'warn' ? 'border-t-amber-500' : 'border-t-rose-500';
  return (
    <Card className={`border-t-4 ${border}`}>
      <CardContent className="pt-4 text-center">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-3xl font-bold tabular-nums mt-1">{value}</p>
        <p className="text-[11px] text-muted-foreground">ردیف موجودی</p>
      </CardContent>
    </Card>
  );
}
