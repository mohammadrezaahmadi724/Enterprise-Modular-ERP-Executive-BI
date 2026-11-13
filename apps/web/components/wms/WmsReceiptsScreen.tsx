'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { DEMO_PURCHASE_ORDERS, receivePurchaseOrder } from '../../lib/procurement-api';
import { createWmsReceipt, fetchWmsReceipts, type WmsDocApi, type WmsLineApi } from '../../lib/wms-api';
import { createEmptyWmsLine } from '../../lib/wms-line-factory';
import { Badge, Button, Card } from '@repo/ui';
import { cn } from '@repo/ui';
import { FileInput, Printer } from 'lucide-react';
import { WMS_RECEIPTS } from '../../lib/wms-demo-data';
import { sanitizeWmsDocLines, WmsDocLineComposer } from './WmsDocLineComposer';
import { useWmsStockSkus } from './useWmsStockSkus';
import { WmsGridToolbar, WmsListCardHeader, rowPadding, type RowDensity } from './wms-screen-bits';

function mapDoc(d: WmsDocApi) {
  return { docNo: d.docNo, date: d.date, party: d.party, orderRef: d.orderRef, source: d.source, status: d.status as 'posted' };
}

export function WmsReceiptsScreen() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [density, setDensity] = useState<RowDensity>('normal');
  const [search, setSearch] = useState('');
  const [catalog, setCatalog] = useState(WMS_RECEIPTS);
  const [apiHint, setApiHint] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const skuOptions = useWmsStockSkus();
  const [lines, setLines] = useState<WmsLineApi[]>(() => [createEmptyWmsLine('receipt')]);
  const [poNumber, setPoNumber] = useState<string>('');
  const [party, setParty] = useState('');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { receipts, source } = await fetchWmsReceipts();
        if (cancelled) return;
        const mapped = receipts.map(mapDoc);
        const keys = new Set(mapped.map((r) => r.docNo));
        setCatalog([...mapped, ...WMS_RECEIPTS.filter((d) => !keys.has(d.docNo))]);
        setApiHint(source);
      } catch {
        if (!cancelled) setApiHint(null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (searchParams.get('new') !== '1') return;
    document.getElementById('wms-receipt-create-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [searchParams]);

  const rows = catalog.filter((r) => !search.trim() || r.docNo.includes(search) || r.orderRef.includes(search)).slice(0, 40);

  async function saveFreeReceipt() {
    setSaving(true);
    setSaveError(null);
    try {
      const docLines = sanitizeWmsDocLines(lines, 'receipt');
      if (!docLines.length) throw new Error('حداقل یک قلم معتبر وارد کنید');
      const { receipt } = await createWmsReceipt({
        party: party || undefined,
        orderRef: poNumber || undefined,
        lines: docLines,
      });
      router.push(`/wms/documents/${encodeURIComponent(receipt.docNo)}`);
    } catch (e) {
      setSaveError(e instanceof Error ? e.message : 'خطا');
    } finally {
      setSaving(false);
    }
  }

  async function saveViaProcurement() {
    if (!poNumber) return;
    setSaving(true);
    setSaveError(null);
    try {
      const docLines = sanitizeWmsDocLines(lines, 'receipt');
      if (!docLines.length) throw new Error('حداقل یک قلم معتبر وارد کنید');
      const result = await receivePurchaseOrder(poNumber, { party: party || undefined, lines: docLines });
      router.push(`/wms/documents/${encodeURIComponent(result.receiptDocNo)}`);
    } catch (e) {
      setSaveError(e instanceof Error ? e.message : 'خطا');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <Card id="wms-receipt-create-panel" className="bg-muted/20 p-4 space-y-3">
        <h3 className="font-semibold text-sm">رسید جدید</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 text-sm">
          <label className="text-xs flex flex-col gap-1">
            تاریخ سند *
            <input className="rounded-md border px-3 py-2" placeholder="انتخاب تاریخ" />
          </label>
          <label className="text-xs flex flex-col gap-1">
            تأمین‌کننده / طرف‌حساب *
            <input
              className="rounded-md border px-3 py-2"
              placeholder="مثلاً تأمین‌کننده QA"
              value={party}
              onChange={(e) => setParty(e.target.value)}
            />
          </label>
          <label className="text-xs flex flex-col gap-1">
            اتصال به سفارش خرید (PO)
            <select
              className="rounded-md border px-3 py-2"
              value={poNumber}
              onChange={(e) => {
                const v = e.target.value;
                setPoNumber(v);
                const po = DEMO_PURCHASE_ORDERS.find((p) => p.number === v);
                if (po) setParty(po.supplier);
              }}
            >
              <option value="">— رسید آزاد (بدون PO) —</option>
              {DEMO_PURCHASE_ORDERS.map((p) => (
                <option key={p.number} value={p.number}>
                  {p.number}
                </option>
              ))}
            </select>
          </label>
          <label className="text-xs flex flex-col gap-1">
            مرجع سند
            <input className="rounded-md border px-3 py-2" placeholder="اختیاری" />
          </label>
        </div>
        <WmsDocLineComposer
          variant="receipt"
          sectionTitle="اقلام رسید"
          lines={lines}
          onChange={setLines}
          skuOptions={skuOptions}
        />
        {saveError ? <p className="text-xs text-amber-600">{saveError}</p> : null}
        <div className="flex flex-wrap justify-end gap-2">
          {poNumber ? (
            <Button
              variant="secondary"
              disabled={saving}
              onClick={() => void saveViaProcurement()}
            >
              {saving ? 'ثبت…' : `رسید از PO ${poNumber}`}
            </Button>
          ) : null}
          <Button
            className="bg-rose-700 hover:bg-rose-800"
            disabled={saving}
            onClick={() => void saveFreeReceipt()}
          >
            {saving ? 'ثبت…' : poNumber ? 'رسید دستی WMS' : 'ثبت رسید آزاد (API)'}
          </Button>
        </div>
      </Card>

      <Card className="finance-aging-card overflow-hidden p-0">
        <WmsListCardHeader icon={<FileInput className="size-4" />} title="رسید انبار" subtitle={apiHint ?? '۲۸۱ سند'} />
        <WmsGridToolbar search={search} onSearch={setSearch} placeholder="شماره سند یا مرجع" density={density} onDensity={setDensity} />
        <DocTable rows={rows} density={density} />
      </Card>
    </div>
  );
}

function DocTable({ rows, density }: { rows: typeof WMS_RECEIPTS; density: RowDensity }) {
  return (
    <table className="w-full text-sm overflow-x-auto">
      <thead className="bg-muted/90 text-xs text-muted-foreground">
        <tr className="border-b">
          <th className="py-2 px-3 text-right">شماره سند</th>
          <th className="py-2 px-3 text-right">تاریخ</th>
          <th className="py-2 px-3 text-right">تأمین‌کننده</th>
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
