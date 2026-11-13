'use client';

import { useEffect, useMemo, useState } from 'react';
import { Badge, Button, Card } from '@repo/ui';
import { cn } from '@repo/ui';
import { Clock, Database, Plus } from 'lucide-react';
import {
  createWmsBatch,
  fetchWmsBatches,
  fetchWmsExpiringBatches,
  runWmsBatchExpiry,
  type WmsBatchApi,
} from '../../lib/wms-api';
import { WmsGridToolbar, WmsListCardHeader, rowPadding, type RowDensity } from './wms-screen-bits';

const STATUS = ['همه', 'active', 'quarantine', 'expired', 'blocked'];

const STATUS_FA: Record<string, string> = {
  active: 'فعال',
  quarantine: 'قرنطینه',
  expired: 'منقضی‌شده',
  blocked: 'مسدود',
};

export function WmsBatchesScreen() {
  const [density, setDensity] = useState<RowDensity>('normal');
  const [status, setStatus] = useState('همه');
  const [search, setSearch] = useState('');
  const [rows, setRows] = useState<WmsBatchApi[]>([]);
  const [apiHint, setApiHint] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [expiringCount, setExpiringCount] = useState(0);

  async function reload() {
    const { batches, source } = await fetchWmsBatches();
    setRows(batches);
    setApiHint(source);
    try {
      const { batches: expiring } = await fetchWmsExpiringBatches(30);
      setExpiringCount(expiring.length);
    } catch {
      setExpiringCount(0);
    }
  }

  useEffect(() => {
    void reload().catch(() => undefined);
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim();
    return rows.filter((r) => {
      if (status !== 'همه' && r.status !== status) return false;
      if (q && !r.batchNo.includes(q) && !r.sku.includes(q) && !r.itemName.includes(q)) return false;
      return true;
    });
  }, [rows, search, status]);

  return (
      <Card className="finance-aging-card overflow-hidden p-0">
      <WmsListCardHeader icon={<Database className="size-4" />} title="بهرها (FEFO)" subtitle={apiHint ?? '۰ بهر'} />
      {expiringCount > 0 ? (
        <div className="flex items-center gap-2 mx-4 mt-3 rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-xs text-amber-950">
          <Clock className="size-4 shrink-0" />
          {expiringCount.toLocaleString('fa-IR')} بهر در ۳۰ روز آینده منقضی می‌شود — هشدار InApp از API ثبت شد.
        </div>
      ) : null}
      <div className="flex flex-wrap gap-2 px-4 py-3 border-b">
        {msg ? <p className="text-xs text-emerald-700 w-full">{msg}</p> : null}
        <Button
          className="bg-rose-700 hover:bg-rose-800"
          disabled={busy}
          onClick={async () => {
            setBusy(true);
            setMsg(null);
            try {
              await createWmsBatch({
                sku: 'PRD-CHAY',
                warehouse: 'WH-MSH',
                qty: 10,
                expiryDate: '2099-06-01',
              });
              setMsg('بهر جدید ثبت شد');
              await reload();
            } catch (e) {
              setMsg(e instanceof Error ? e.message : 'خطا');
            } finally {
              setBusy(false);
            }
          }}
        >
          <Plus className="size-4 ml-1" />
          ثبت بهر (API)
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="mr-auto"
          disabled={busy}
          onClick={async () => {
            setBusy(true);
            try {
              const { expired } = await runWmsBatchExpiry();
              setMsg(`${expired} بهر منقضی شد`);
              await reload();
            } catch (e) {
              setMsg(e instanceof Error ? e.message : 'خطا');
            } finally {
              setBusy(false);
            }
          }}
        >
          <Clock className="size-4 ml-1" />
          انقضای خودکار
        </Button>
      </div>
      <WmsGridToolbar search={search} onSearch={setSearch} placeholder="کد بهر یا نام کالا" density={density} onDensity={setDensity}>
        <div className="flex flex-wrap gap-1 text-xs">
          <span className="text-muted-foreground">وضعیت</span>
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
          <Database className="size-10 mx-auto opacity-30 mb-3" />
          <p className="font-medium text-foreground">بهری پیدا نشد</p>
          <p className="text-sm mt-1">بهری با این جست‌وجو یا فیلتر ثبت نشده است.</p>
        </div>
      ) : (
        <table className="w-full text-sm">
          <thead className="bg-muted/80 text-xs text-muted-foreground">
            <tr className="border-b">
              <th className="py-2 px-3 text-right">بهر</th>
              <th className="py-2 px-3 text-right">کالا</th>
              <th className="py-2 px-3 text-right">انبار</th>
              <th className="py-2 px-3 text-right">مقدار</th>
              <th className="py-2 px-3 text-right">انقضا</th>
              <th className="py-2 px-3 text-right">وضعیت</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.batchNo} className="border-b border-dashed">
                <td className={cn('px-3 font-mono text-xs', rowPadding(density))}>{r.batchNo}</td>
                <td className={cn('px-3', rowPadding(density))}>
                  <span className="font-mono text-xs">{r.sku}</span> — {r.itemName}
                </td>
                <td className={cn('px-3 font-mono text-xs', rowPadding(density))}>{r.warehouse}</td>
                <td className={cn('px-3 tabular-nums', rowPadding(density))}>{r.qty}</td>
                <td className={cn('px-3', rowPadding(density))}>{r.expiryDate ?? '—'}</td>
                <td className={cn('px-3', rowPadding(density))}>
                  <Badge variant="secondary">{STATUS_FA[r.status] ?? r.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Card>
  );
}
