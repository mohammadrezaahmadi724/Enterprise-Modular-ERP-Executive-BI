'use client';

import { useEffect, useMemo, useState } from 'react';
import { Badge, Card } from '@repo/ui';
import { cn } from '@repo/ui';
import { Shield } from 'lucide-react';
import { WMS_TRACKING } from '../../lib/wms-demo-data';
import { fetchWmsTracking, type WmsTrackingContractApi } from '../../lib/wms-api';
import { WmsGridToolbar, WmsListCardHeader, rowPadding, type RowDensity } from './wms-screen-bits';

const TRACK_FILTERS = ['همه', 'بدون ردیابی', 'ردیابی بهر', 'سریال یکتا', 'بهر و سریال', 'انقضا الزامی', 'انقضا اختیاری'];

export function WmsTrackingScreen() {
  const [search, setSearch] = useState('');
  const [method, setMethod] = useState('همه');
  const [density, setDensity] = useState<RowDensity>('normal');
  const [catalog, setCatalog] = useState<WmsTrackingContractApi[]>([]);
  const [apiHint, setApiHint] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { contracts, source } = await fetchWmsTracking();
        if (cancelled) return;
        const skus = new Set(contracts.map((c) => c.sku));
        const demoFallback = WMS_TRACKING.filter((d) => !skus.has(d.sku)).map((d) => ({
          ...d,
        }));
        setCatalog([...contracts, ...demoFallback]);
        setApiHint(source);
      } catch {
        if (!cancelled) {
          setCatalog(WMS_TRACKING);
          setApiHint(null);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const rows = useMemo(() => {
    const q = search.trim();
    return catalog
      .filter((r) => {
        if (method !== 'همه' && r.method !== method) return false;
        if (q && !r.sku.includes(q) && !r.name.includes(q)) return false;
        return true;
      })
      .slice(0, 50);
  }, [search, method, catalog]);

  return (
    <Card className="finance-aging-card overflow-hidden p-0">
      <WmsListCardHeader
        icon={<Shield className="size-4" />}
        title="قراردادهای ردیابی کالا"
        subtitle={apiHint ?? '۱۸۱ کالا'}
      />
      <WmsGridToolbar search={search} onSearch={setSearch} placeholder="کد یا نام کالا" density={density} onDensity={setDensity}>
        <div className="flex flex-wrap gap-1 text-xs items-center">
          <span className="text-muted-foreground">شیوه ردیابی</span>
          {TRACK_FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              className={cn('rounded-md border px-2 py-1', method === f ? 'bg-muted font-semibold' : 'border-transparent')}
              onClick={() => setMethod(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </WmsGridToolbar>
      <table className="w-full text-sm min-w-[1000px]">
        <thead className="bg-muted/90 text-xs text-muted-foreground sticky top-0">
          <tr className="border-b">
            <th className="py-2 px-2 text-right">کد کالا</th>
            <th className="py-2 px-2 text-right">نام کالا</th>
            <th className="py-2 px-2 text-right">واحد پایه</th>
            <th className="py-2 px-2 text-right">شیوه ردیابی</th>
            <th className="py-2 px-2 text-right">دقت اعشار</th>
            <th className="py-2 px-2 text-right">سیاست FEFO</th>
            <th className="py-2 px-2 text-right">حداقل ماندگاری ورود</th>
            <th className="py-2 px-2 text-right">الزام‌ها</th>
            <th className="py-2 px-2 text-right">نسخه</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.sku} className="border-b border-dashed">
              <td className={cn('px-2 font-mono text-xs', rowPadding(density))}>{r.sku}</td>
              <td className={cn('px-2', rowPadding(density))}>{r.name}</td>
              <td className={cn('px-2', rowPadding(density))}>{r.baseUnit}</td>
              <td className={cn('px-2', rowPadding(density))}>
                <Badge variant="secondary">{r.method}</Badge>
              </td>
              <td className={cn('px-2 tabular-nums', rowPadding(density))}>{r.decimals}</td>
              <td className={cn('px-2', rowPadding(density))}>{r.fefo ? 'بله' : 'خیر'}</td>
              <td className={cn('px-2', rowPadding(density))}>{r.minShelf}</td>
              <td className={cn('px-2 text-xs', rowPadding(density))}>{r.flags.join(' · ')}</td>
              <td className={cn('px-2 tabular-nums', rowPadding(density))}>{r.version}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length === 0 ? (
        <div className="py-12 text-center text-sm text-muted-foreground">قراردادی یافت نشد.</div>
      ) : null}
    </Card>
  );
}
