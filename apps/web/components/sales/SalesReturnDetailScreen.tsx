'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from '@repo/ui';
import { ArrowRight } from 'lucide-react';
import { formatToman } from '../../lib/finance-receivables-demo';
import {
  fetchSalesReturn,
  postSalesReturn,
  type SalesDocLineDto,
  type SalesReturnApi,
} from '../../lib/sales-api';
import { SALES_RETURNS } from '../../lib/sales-returns-demo';

type Props = { id: string };

export function SalesReturnDetailScreen({ id }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [restock, setRestock] = useState(searchParams.get('restock') === '1');
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<string | null>(null);
  const [memo, setMemo] = useState<SalesReturnApi | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchSalesReturn(id);
        if (!cancelled) {
          setMemo(res.return ?? demoReturn(id));
          setSource(res.source);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : 'خطا');
          setMemo(demoReturn(id));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const missing = !memo && !loading;

  async function handlePost() {
    if (!memo || memo.status === 'posted') return;
    setPosting(true);
    setError(null);
    try {
      const { return: posted, wmsReceiptDocNo } = await postSalesReturn(memo.id, { restock });
      setMemo({ ...posted, wmsReceiptDocNo: wmsReceiptDocNo ?? posted.wmsReceiptDocNo });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'ثبت GL ناموفق');
    } finally {
      setPosting(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <Button variant="ghost" size="sm" className="w-fit -mr-2" asChild>
        <Link href="/sales/returns">
          <ArrowRight className="size-4 ml-1" />
          برگشت از فروش
        </Link>
      </Button>

      {loading ? <p className="text-xs text-muted-foreground">بارگذاری اعلامیه…</p> : null}
      {error ? <p className="text-xs text-amber-600">{error}</p> : null}
      {source ? <p className="text-[11px] text-muted-foreground">منبع: {source}</p> : null}

      {missing ? (
        <Card>
          <CardContent className="py-10 text-center text-sm text-muted-foreground">اعلامیه «{id}» یافت نشد.</CardContent>
        </Card>
      ) : memo ? (
        <>
          <Card className="finance-aging-card">
            <CardContent className="pt-4 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h1 className="text-lg font-bold font-mono">{memo.id}</h1>
                {memo.status === 'posted' ? (
                  <Badge className="bg-emerald-600 hover:bg-emerald-600">ثبت قطعی + GL</Badge>
                ) : (
                  <Badge variant="secondary">پیش‌نویس</Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {memo.customerName}
                {memo.customerCode ? (
                  <>
                    {' '}
                    <Link href={`/sales/customers/${encodeURIComponent(memo.customerCode)}`} className="font-mono text-xs hover:underline">
                      ({memo.customerCode})
                    </Link>
                  </>
                ) : null}
                {' · فاکتور '}
                <Link href={`/sales/invoices/${encodeURIComponent(memo.sourceInvoice)}`} className="font-mono hover:underline">
                  {memo.sourceInvoice}
                </Link>
                {' · '}
                {memo.date}
              </p>
              <p className="text-sm">{memo.reason}</p>
              <div className="flex flex-wrap gap-4 text-sm tabular-nums">
                <span>ناخالص: {formatToman(memo.grossToman)} تومان</span>
                <span>مالیات: {formatToman(memo.taxToman)} تومان</span>
                <span className="font-semibold text-emerald-700">بستانکار: {formatToman(memo.creditToman)} تومان</span>
              </div>
              {memo.glDoc ? (
                <p className="text-xs">
                  سند مالی:{' '}
                  <Link href="/finance/ledgers" className="font-mono text-primary hover:underline">
                    {memo.glDoc}
                  </Link>
                </p>
              ) : null}
              {memo.wmsReceiptDocNo ? (
                <p className="text-xs">
                  رسید انبار:{' '}
                  <Link href="/wms/receipts" className="font-mono text-primary hover:underline">
                    {memo.wmsReceiptDocNo}
                  </Link>
                </p>
              ) : null}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">اقلام مرجوعی</CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <LinesTable lines={memo.lines} />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="py-4 flex flex-wrap gap-2">
              {memo.status === 'draft' ? (
                <>
                  <Button className="bg-rose-700 hover:bg-rose-800" disabled={posting} onClick={() => void handlePost()}>
                    {posting ? 'ثبت در GL…' : 'ثبت قطعی و سند بستانکار (GL)'}
                  </Button>
                  <label className="flex items-center gap-1 text-xs w-full">
                    <input type="checkbox" checked={restock} onChange={(e) => setRestock(e.target.checked)} />
                    صدور رسید ورود انبار (WMS) پس از ثبت GL
                  </label>
                </>
              ) : (
                <Button variant="outline" asChild>
                  <Link href="/finance/receivables">مشاهده در دریافتنی</Link>
                </Button>
              )}
              <Button variant="ghost" onClick={() => router.refresh()}>
                بروزرسانی
              </Button>
            </CardContent>
          </Card>
        </>
      ) : null}
    </div>
  );
}

function LinesTable({ lines }: { lines: SalesDocLineDto[] }) {
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b text-xs text-muted-foreground">
          <th className="py-2 text-right">کالا</th>
          <th className="py-2 text-right">شرح</th>
          <th className="py-2 text-right">مقدار</th>
          <th className="py-2 text-right">جمع ردیف (ریال)</th>
        </tr>
      </thead>
      <tbody>
        {lines.map((l) => (
          <tr key={`${l.sku}-${l.description}`} className="border-b border-dashed">
            <td className="py-2 font-mono text-xs">{l.sku}</td>
            <td className="py-2">{l.description}</td>
            <td className="py-2 tabular-nums">{l.quantity}</td>
            <td className="py-2 tabular-nums">{formatToman(l.lineTotalRial)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function demoReturn(id: string) {
  const row = SALES_RETURNS.find((r) => r.id === id);
  if (!row) return null;
  return {
    id: row.id,
    customerName: row.customerName,
    sourceInvoice: row.sourceInvoice,
    date: row.date,
    reason: row.reason,
    grossToman: row.grossToman,
    taxToman: row.taxToman,
    creditToman: row.creditToman,
    status: row.status,
    glDoc: row.glDoc,
    lines: [],
  } satisfies SalesReturnApi;
}
