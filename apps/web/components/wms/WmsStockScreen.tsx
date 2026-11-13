'use client';

import { useEffect, useMemo, useState } from 'react';
import { fetchWmsStock, type WmsStockRowApi } from '../../lib/wms-api';
import { Badge, Button, Card } from '@repo/ui';
import { cn } from '@repo/ui';
import { Package, Upload } from 'lucide-react';
import { STATUS_FA, WMS_STOCK_ROWS, type StockStatus } from '../../lib/wms-demo-data';
import { WMS_WAREHOUSES } from '../../lib/wms-hub-config';
import { WmsGridToolbar, WmsListCardHeader, rowPadding, type RowDensity } from './wms-screen-bits';

function mapRow(r: WmsStockRowApi) {
  return {
    sku: r.sku,
    name: r.name,
    warehouse: r.warehouse,
    onHand: r.onHand,
    reserved: r.reserved,
    blocked: r.blocked,
    available: r.available,
    status: r.status,
  };
}

export function WmsStockScreen() {
  const [search, setSearch] = useState('');
  const [warehouse, setWarehouse] = useState<string>('all');
  const [status, setStatus] = useState<'all' | StockStatus>('all');
  const [density, setDensity] = useState<RowDensity>('compact');
  const [catalog, setCatalog] = useState(WMS_STOCK_ROWS);
  const [apiHint, setApiHint] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { stock, source } = await fetchWmsStock();
        if (cancelled) return;
        const mapped = stock.map(mapRow);
        const keys = new Set(mapped.map((r) => `${r.sku}:${r.warehouse}`));
        setCatalog([...mapped, ...WMS_STOCK_ROWS.filter((d) => !keys.has(`${d.sku}:${d.warehouse}`))]);
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
      if (warehouse !== 'all' && r.warehouse !== warehouse) return false;
      if (status !== 'all' && r.status !== status) return false;
      if (q && !r.sku.includes(q) && !r.name.includes(q)) return false;
      return true;
    }).slice(0, 100);
  }, [search, warehouse, status, catalog]);

  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-md border border-amber-200 bg-amber-50/80 px-3 py-2 text-xs text-amber-950">
        فقط ۱۰۰ ردیفی که اخیراً تغییر کرده‌اند نمایش داده می‌شود؛ برای سایر اقلام از جست‌وجوی کاردکس استفاده کنید.
      </div>

      <Card className="finance-aging-card overflow-hidden p-0">
        <WmsListCardHeader
          icon={<Package className="size-4" />}
          title="موجودی کالا — همهٔ انبارها"
          subtitle={apiHint ?? '۱۰۰ ردیف در انبارهای در دسترس شما'}
        />
        <WmsGridToolbar search={search} onSearch={setSearch} placeholder="کد یا نام کالا" density={density} onDensity={setDensity}>
          <FilterChips label="انبار" value={warehouse} options={['all', ...WMS_WAREHOUSES.map((w) => w.code)]} labels={{ all: 'همه' }} onChange={setWarehouse} />
          <FilterChips
            label="وضعیت"
            value={status}
            options={['all', 'ok', 'low', 'out']}
            labels={{ all: 'همه', ok: STATUS_FA.ok, low: STATUS_FA.low, out: STATUS_FA.out }}
            onChange={(v) => setStatus(v as typeof status)}
          />
          <Button type="button" size="sm" variant="outline" className="h-8">
            <Upload className="size-3.5 ml-1" />
            خروجی
          </Button>
        </WmsGridToolbar>
        <MotionTable density={density} rows={rows} />
      </Card>
    </div>
  );
}

function FilterChips({
  label,
  value,
  options,
  labels,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  labels: Record<string, string>;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-1 text-xs flex-wrap">
      <span className="text-muted-foreground ml-1">{label}</span>
      {options.map((o) => (
        <button
          key={o}
          type="button"
          className={cn('rounded-md border px-2 py-1', value === o ? 'bg-muted font-semibold' : 'border-transparent text-muted-foreground')}
          onClick={() => onChange(o)}
        >
          {labels[o] ?? o}
        </button>
      ))}
    </div>
  );
}

function MotionTable({ density, rows }: { density: RowDensity; rows: typeof WMS_STOCK_ROWS }) {
  return (
    <div className="overflow-x-auto max-h-[520px]">
      <table className="w-full text-sm min-w-[880px]">
        <thead className="sticky top-0 bg-muted/90 z-10">
          <tr className="border-b text-xs text-muted-foreground">
            <th className="py-2 px-3 text-right">کد کالا</th>
            <th className="py-2 px-3 text-right">کالا</th>
            <th className="py-2 px-3 text-right">انبار</th>
            <th className="py-2 px-3 text-right">موجودی واقعی</th>
            <th className="py-2 px-3 text-right">رزرو</th>
            <th className="py-2 px-3 text-right">مسدود</th>
            <th className="py-2 px-3 text-right">قابل استفاده</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={`${r.sku}-${r.warehouse}`} className="border-b border-dashed hover:bg-muted/40">
              <td className={cn('px-3 font-mono text-xs', rowPadding(density))}>{r.sku}</td>
              <td className={cn('px-3', rowPadding(density))}>{r.name}</td>
              <td className={cn('px-3 font-mono text-xs', rowPadding(density))}>{r.warehouse}</td>
              <td className={cn('px-3 tabular-nums', rowPadding(density))}>{r.onHand.toLocaleString('fa-IR')}</td>
              <td className={cn('px-3 tabular-nums', rowPadding(density))}>{r.reserved}</td>
              <td className={cn('px-3 tabular-nums', rowPadding(density))}>{r.blocked}</td>
              <td className={cn('px-3 tabular-nums font-medium bg-amber-500/10', rowPadding(density))}>
                {r.available.toLocaleString('fa-IR')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
