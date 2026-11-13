'use client';

import { useEffect, useMemo, useState } from 'react';
import { Button, Card } from '@repo/ui';
import { cn } from '@repo/ui';
import { Hexagon, Plus } from 'lucide-react';
import { fetchWmsSerials, registerWmsSerials, type WmsSerialApi } from '../../lib/wms-api';
import { WmsGridToolbar, WmsListCardHeader, rowPadding, type RowDensity } from './wms-screen-bits';

const STATUS = ['همه', 'in_stock', 'reserved', 'issued', 'delivered', 'returned', 'scrapped'];

const STATUS_FA: Record<string, string> = {
  in_stock: 'موجود در انبار',
  reserved: 'رزرو شده',
  issued: 'خارج شده',
  delivered: 'تحویل مشتری',
  returned: 'برگشتی',
  scrapped: 'اسقاط',
};

export function WmsSerialsScreen() {
  const [density, setDensity] = useState<RowDensity>('normal');
  const [status, setStatus] = useState('همه');
  const [search, setSearch] = useState('');
  const [rows, setRows] = useState<WmsSerialApi[]>([]);
  const [apiHint, setApiHint] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function reload() {
    const { serials, source } = await fetchWmsSerials();
    setRows(serials);
    setApiHint(source);
  }

  useEffect(() => {
    void reload().catch(() => undefined);
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim();
    return rows.filter((r) => {
      if (status !== 'همه' && r.status !== status) return false;
      if (q && !r.serial.includes(q) && !r.sku.includes(q)) return false;
      return true;
    });
  }, [rows, search, status]);

  return (
    <Card className="finance-aging-card overflow-hidden p-0">
      <WmsListCardHeader icon={<Hexagon className="size-4" />} title="شماره‌های سریال" subtitle={apiHint ?? '۰ سریال'} />
      <div className="px-4 py-3 border-b space-y-2">
        {msg ? <p className="text-xs text-emerald-700">{msg}</p> : null}
        <Button
          className="bg-rose-700 hover:bg-rose-800"
          disabled={saving}
          onClick={async () => {
            setSaving(true);
            setMsg(null);
            try {
              const { registered } = await registerWmsSerials({
                sku: 'PRD-1016',
                warehouse: 'WH-ESF',
                serials: [`SN-${Date.now().toString(36).toUpperCase()}`],
              });
              setMsg(`${registered} سریال ثبت شد`);
              await reload();
            } catch (e) {
              setMsg(e instanceof Error ? e.message : 'خطا');
            } finally {
              setSaving(false);
            }
          }}
        >
          <Plus className="size-4 ml-1" />
          {saving ? 'ثبت…' : 'ورود نمونه سریال (API)'}
        </Button>
      </div>
      <WmsGridToolbar search={search} onSearch={setSearch} placeholder="سریال، کالا یا بهر" density={density} onDensity={setDensity}>
        <div className="flex flex-wrap gap-1 text-xs max-w-xl">
          <span className="text-muted-foreground shrink-0">وضعیت</span>
          {STATUS.map((s) => (
            <button
              key={s}
              type="button"
              className={cn('rounded-md border px-2 py-1', status === s ? 'bg-muted font-semibold' : 'border-transparent')}
              onClick={() => setStatus(s)}
            >
              {s === 'همه' ? s : STATUS_FA[s] ?? s}
            </button>
          ))}
        </div>
      </WmsGridToolbar>
      {filtered.length === 0 ? (
        <div className="py-20 text-center text-muted-foreground">
          <Hexagon className="size-10 mx-auto opacity-30 mb-3" />
          <p className="font-medium text-foreground">سریالی پیدا نشد</p>
          <p className="text-sm mt-1">شماره سریالی با این جست‌وجو یا فیلتر ثبت نشده است.</p>
        </div>
      ) : (
        <table className="w-full text-sm">
          <thead className="bg-muted/80 text-xs text-muted-foreground">
            <tr className="border-b">
              <th className="py-2 px-3 text-right">سریال</th>
              <th className="py-2 px-3 text-right">کالا</th>
              <th className="py-2 px-3 text-right">انبار</th>
              <th className="py-2 px-3 text-right">بچ</th>
              <th className="py-2 px-3 text-right">وضعیت</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.serial} className="border-b border-dashed">
                <td className={cn('px-3 font-mono text-xs', rowPadding(density))}>{r.serial}</td>
                <td className={cn('px-3', rowPadding(density))}>
                  <span className="font-mono text-xs">{r.sku}</span> — {r.itemName}
                </td>
                <td className={cn('px-3 font-mono text-xs', rowPadding(density))}>{r.warehouse}</td>
                <td className={cn('px-3', rowPadding(density))}>{r.batch ?? '—'}</td>
                <td className={cn('px-3', rowPadding(density))}>{STATUS_FA[r.status] ?? r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Card>
  );
}
