'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchSalesOrders, type SalesOrderApi } from '../../lib/sales-api';
import { createWmsIssue, fetchWmsIssues, type WmsDocApi, type WmsLineApi } from '../../lib/wms-api';
import { wmsLinesFromSalesOrder } from '../../lib/wms-sales-fulfillment';
import { createEmptyWmsLine } from '../../lib/wms-line-factory';
import { Badge, Button, Card } from '@repo/ui';
import { cn } from '@repo/ui';
import { AlertCircle, LogOut, Printer } from 'lucide-react';
import { WMS_ISSUES } from '../../lib/wms-demo-data';
import { sanitizeWmsDocLines, WmsDocLineComposer } from './WmsDocLineComposer';
import { WmsFefoPickLinesPanel } from './WmsFefoPickLinesPanel';
import { useWmsStockSkus } from './useWmsStockSkus';
import { WmsGridToolbar, WmsListCardHeader, rowPadding, type RowDensity } from './wms-screen-bits';

function mapDoc(d: WmsDocApi) {
  return { docNo: d.docNo, date: d.date, party: d.party, orderRef: d.orderRef, source: d.source, status: 'posted' as const };
}

export function WmsIssuesScreen() {
  const router = useRouter();
  const [density, setDensity] = useState<RowDensity>('normal');
  const [search, setSearch] = useState('');
  const [catalog, setCatalog] = useState(WMS_ISSUES);
  const [apiHint, setApiHint] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [postCogs, setPostCogs] = useState(false);
  const [autoPostInvoice, setAutoPostInvoice] = useState(false);
  const [invoiceHint, setInvoiceHint] = useState<string | null>(null);
  const skuOptions = useWmsStockSkus();
  const [lines, setLines] = useState<WmsLineApi[]>(() => [createEmptyWmsLine('issue')]);
  const [orderRef, setOrderRef] = useState('');
  const [readyOrders, setReadyOrders] = useState<SalesOrderApi[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { issues, source } = await fetchWmsIssues();
        if (cancelled) return;
        const mapped = issues.map(mapDoc);
        const keys = new Set(mapped.map((r) => r.docNo));
        setCatalog([...mapped, ...WMS_ISSUES.filter((d) => !keys.has(d.docNo))]);
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
    let cancelled = false;
    void fetchSalesOrders()
      .then(({ orders }) => {
        if (cancelled) return;
        setReadyOrders(orders.filter((o) => o.supplyStatus === 'ready'));
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, []);

  const rows = catalog.filter((r) => !search.trim() || r.docNo.includes(search)).slice(0, 40);

  return (
    <div className="flex flex-col gap-4">
      <Card className="bg-muted/20 p-4 space-y-3">
        <h3 className="font-semibold text-sm">حواله جدید</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 text-sm">
          <label className="text-xs flex flex-col gap-1">
            تاریخ سند *
            <input className="rounded-md border px-3 py-2" placeholder="انتخاب تاریخ" />
          </label>
          <label className="text-xs flex flex-col gap-1">
            تحویل‌گیرنده / مشتری *
            <select className="rounded-md border px-3 py-2">
              <option>— انتخاب تحویل‌گیرنده / مشتری —</option>
            </select>
          </label>
          <label className="text-xs flex flex-col gap-1 sm:col-span-2">
            اتصال به سفارش فروش (SO) — فقط وضعیت «آماده تحویل»
            <select
              className="rounded-md border px-3 py-2 font-mono text-xs"
              value={orderRef || '—'}
              onChange={(e) => {
                const val = e.target.value;
                if (val === '—' || val === '') {
                  setOrderRef('');
                  return;
                }
                setOrderRef(val);
                const order = readyOrders.find((o) => o.number === val);
                if (order) setLines(wmsLinesFromSalesOrder(order));
              }}
            >
              <option value="—">— خروج آزاد (بدون SO) —</option>
              {readyOrders.map((o) => (
                <option key={o.number} value={o.number}>
                  {o.number} — {o.deliveredLabel}
                </option>
              ))}
            </select>
            {readyOrders.length === 0 ? (
              <span className="text-[10px] text-muted-foreground">
                سفارشی با supplyStatus=ready نیست — از فروش «تأیید تأمین» بزنید.
              </span>
            ) : null}
          </label>
          <label className="text-xs flex flex-col gap-1">
            مرجع سند
            <input className="rounded-md border px-3 py-2" placeholder="اختیاری" />
          </label>
        </div>
        <WmsDocLineComposer
          variant="issue"
          sectionTitle="اقلام خروج (FEFO)"
          lines={lines}
          onChange={setLines}
          skuOptions={skuOptions}
        />
        <WmsFefoPickLinesPanel lines={lines} />
        <MotionAlert />
        {saveError ? <p className="text-xs text-amber-600">{saveError}</p> : null}
        {invoiceHint ? <p className="text-xs text-emerald-700">{invoiceHint}</p> : null}
        <label className="flex items-center gap-2 text-xs">
          <input type="checkbox" checked={postCogs} onChange={(e) => setPostCogs(e.target.checked)} />
          ثبت COGS در GL (۵۱۰۱ / ۱۳۰۱)
        </label>
        {orderRef ? (
          <label className="flex items-center gap-2 text-xs">
            <input type="checkbox" checked={autoPostInvoice} onChange={(e) => setAutoPostInvoice(e.target.checked)} />
            پس از تحویل — ثبت فاکتور فروش در GL (پیش‌فاکتور خودکار)
          </label>
        ) : null}
        <div className="flex justify-end">
          <Button
            className="bg-rose-700 hover:bg-rose-800"
            disabled={saving}
            onClick={async () => {
              setSaving(true);
              setSaveError(null);
              setInvoiceHint(null);
              try {
                const docLines = sanitizeWmsDocLines(lines, 'issue');
                if (!docLines.length) throw new Error('حداقل یک قلم معتبر وارد کنید');
                const { issue, invoice } = await createWmsIssue({
                  orderRef: orderRef.trim() || undefined,
                  postCogs,
                  autoPostInvoice: orderRef ? autoPostInvoice : undefined,
                  lines: docLines,
                });
                if (invoice) {
                  setInvoiceHint(
                    invoice.status === 'posted'
                      ? `فاکتور ${invoice.number} در GL ثبت شد${invoice.glDocNumber ? ` (${invoice.glDocNumber})` : ''}`
                      : `پیش‌فاکتور ${invoice.number} برای ${invoice.orderNumber} صادر شد`,
                  );
                }
                router.push(`/wms/documents/${encodeURIComponent(issue.docNo)}`);
              } catch (e) {
                setSaveError(e instanceof Error ? e.message : 'خطا');
              } finally {
                setSaving(false);
              }
            }}
          >
            {saving ? 'ثبت…' : postCogs ? 'ثبت خروج + COGS' : 'ثبت خروج (API)'}
          </Button>
        </div>
      </Card>

      <Card className="finance-aging-card overflow-hidden p-0">
        <WmsListCardHeader icon={<LogOut className="size-4" />} title="حواله خروج" subtitle={apiHint ?? '۹۶۸ سند'} />
        <WmsGridToolbar search={search} onSearch={setSearch} placeholder="شماره سند یا مرجع" density={density} onDensity={setDensity} />
        <IssueTable rows={rows} density={density} />
      </Card>
    </div>
  );
}

function MotionAlert() {
  return (
    <div className="flex gap-2 rounded-md border border-sky-200 bg-sky-50/80 px-3 py-2 text-xs text-sky-950">
      <AlertCircle className="size-4 shrink-0" />
      اگر ثبت این سند موجودی را منفی کند، سرور آن را رد می‌کند — هیچ گزینهٔ نادیده‌گرفتن یا ثبت اجباری وجود ندارد.
    </div>
  );
}

function IssueTable({ rows, density }: { rows: typeof WMS_ISSUES; density: RowDensity }) {
  return (
    <table className="w-full text-sm">
      <thead className="bg-muted/90 text-xs text-muted-foreground">
        <tr className="border-b">
          <th className="py-2 px-3 text-right">شماره سند</th>
          <th className="py-2 px-3 text-right">تاریخ</th>
          <th className="py-2 px-3 text-right">مشتری / تحویل‌گیرنده</th>
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
            <td className={cn('px-3', rowPadding(density))}>{r.source}</td>
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
