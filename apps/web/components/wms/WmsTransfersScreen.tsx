'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createWmsTransfer, fetchWmsTransfers, type WmsDocApi, type WmsLineApi } from '../../lib/wms-api';
import { createEmptyWmsLine } from '../../lib/wms-line-factory';
import { Badge, Button, Card } from '@repo/ui';
import { cn } from '@repo/ui';
import { AlertCircle, ArrowLeftRight, Printer } from 'lucide-react';
import { WMS_TRANSFERS } from '../../lib/wms-demo-data';
import { sanitizeWmsDocLines, WmsDocLineComposer } from './WmsDocLineComposer';
import { useWmsStockSkus } from './useWmsStockSkus';
import { WmsGridToolbar, WmsListCardHeader, rowPadding, type RowDensity } from './wms-screen-bits';

function mapDoc(d: WmsDocApi) {
  return { docNo: d.docNo, date: d.date, party: d.party, orderRef: d.orderRef, source: d.source, status: 'posted' as const };
}

export function WmsTransfersScreen() {
  const router = useRouter();
  const [density, setDensity] = useState<RowDensity>('normal');
  const [search, setSearch] = useState('');
  const [catalog, setCatalog] = useState(WMS_TRANSFERS);
  const [apiHint, setApiHint] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const skuOptions = useWmsStockSkus();
  const [lines, setLines] = useState<WmsLineApi[]>(() => [createEmptyWmsLine('transfer')]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { transfers, source } = await fetchWmsTransfers();
        if (cancelled) return;
        const mapped = transfers.map(mapDoc);
        const keys = new Set(mapped.map((r) => r.docNo));
        setCatalog([...mapped, ...WMS_TRANSFERS.filter((d) => !keys.has(d.docNo))]);
        setApiHint(source);
      } catch {
        if (!cancelled) setApiHint(null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const rows = catalog.filter((r) => !search.trim() || r.docNo.includes(search)).slice(0, 40);

  return (
    <div className="flex flex-col gap-4">
      <Card className="bg-muted/20 p-4 space-y-3">
        <h3 className="font-semibold text-sm">انتقال جدید</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 text-sm">
          <label className="text-xs flex flex-col gap-1">
            تاریخ سند *
            <input className="rounded-md border px-3 py-2" placeholder="انتخاب تاریخ" />
          </label>
          <label className="text-xs flex flex-col gap-1">
            نحوه انتقال
            <select className="rounded-md border px-3 py-2">
              <option>دو مرحله‌ای — کالای در راه — تأیید در مقصد</option>
            </select>
          </label>
          <label className="text-xs flex flex-col gap-1">
            طرف‌حساب / باربری (اختیاری)
            <select className="rounded-md border px-3 py-2">
              <option>—</option>
            </select>
          </label>
          <label className="text-xs flex flex-col gap-1">
            مرجع سند
            <input className="rounded-md border px-3 py-2" />
          </label>
        </div>
        <WmsDocLineComposer
          variant="transfer"
          sectionTitle="اقلام انتقال"
          lines={lines}
          onChange={setLines}
          skuOptions={skuOptions}
        />
        <div className="flex gap-2 rounded-md border border-sky-200 bg-sky-50/80 px-3 py-2 text-xs">
          <AlertCircle className="size-4 shrink-0" />
          اگر ثبت این سند موجودی را منفی کند، سرور آن را رد می‌کند — هیچ گزینهٔ نادیده‌گرفتن یا ثبت اجباری وجود ندارد.
        </div>
        {saveError ? <p className="text-xs text-amber-600">{saveError}</p> : null}
        <div className="flex justify-end">
          <Button
            className="bg-rose-700 hover:bg-rose-800"
            disabled={saving}
            onClick={async () => {
              setSaving(true);
              setSaveError(null);
              try {
                const docLines = sanitizeWmsDocLines(lines, 'transfer');
                if (!docLines.length) throw new Error('حداقل یک قلم معتبر وارد کنید');
                const { transfer } = await createWmsTransfer({ lines: docLines });
                router.push(`/wms/documents/${encodeURIComponent(transfer.docNo)}`);
              } catch (e) {
                setSaveError(e instanceof Error ? e.message : 'خطا');
              } finally {
                setSaving(false);
              }
            }}
          >
            {saving ? 'ثبت…' : 'ثبت انتقال (API)'}
          </Button>
        </div>
      </Card>

      <Card className="finance-aging-card overflow-hidden p-0">
        <WmsListCardHeader icon={<ArrowLeftRight className="size-4" />} title="انتقال بین انبارها" subtitle={apiHint ?? '۲۵ سند'} />
        <WmsGridToolbar search={search} onSearch={setSearch} placeholder="شماره سند یا مرجع" density={density} onDensity={setDensity} />
        <TransferTable rows={rows} density={density} />
      </Card>
    </div>
  );
}

function TransferTable({ rows, density }: { rows: typeof WMS_TRANSFERS; density: RowDensity }) {
  return (
    <table className="w-full text-sm">
      <thead className="bg-muted/90 text-xs text-muted-foreground">
        <tr className="border-b">
          <th className="py-2 px-3 text-right">شماره سند</th>
          <th className="py-2 px-3 text-right">تاریخ</th>
          <th className="py-2 px-3 text-right">طرف‌حساب</th>
          <th className="py-2 px-3 text-right">شماره سفارش / مرجع</th>
          <th className="py-2 px-3 text-right">منبع</th>
          <th className="py-2 px-3 text-right">وضعیت</th>
          <th className="py-2 px-3 text-right">عملیات</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.docNo} className="border-b border-dashed">
            <td className={cn('px-3 font-mono text-xs text-rose-800', rowPadding(density))}>
              <Link href={`/wms/documents/${encodeURIComponent(r.docNo)}`} className="hover:underline">
                {r.docNo}
              </Link>
            </td>
            <td className={cn('px-3', rowPadding(density))}>{r.date}</td>
            <td className={cn('px-3', rowPadding(density))}>{r.party}</td>
            <td className={cn('px-3 font-mono text-xs', rowPadding(density))}>{r.orderRef}</td>
            <td className={cn('px-3 text-xs', rowPadding(density))}>{r.source}</td>
            <td className={cn('px-3', rowPadding(density))}>
              <Badge className="bg-emerald-600 hover:bg-emerald-600">ثبت‌شده</Badge>
            </td>
            <td className={cn('px-3', rowPadding(density))}>
              <Button variant="ghost" size="sm">
                <Printer className="size-4 ml-1" />
                چاپ
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
