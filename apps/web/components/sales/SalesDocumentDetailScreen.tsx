'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from '@repo/ui';
import { ArrowRight } from 'lucide-react';
import { formatToman } from '../../lib/finance-receivables-demo';
import {
  confirmSalesOrderSupply,
  createSalesOrder,
  fetchSalesInvoice,
  fetchSalesOrder,
  fetchSalesOrderFulfillment,
  fetchSalesQuote,
  createSalesReturnFromInvoice,
  fulfillSalesOrder,
  postSalesInvoice,
  type SalesOrderFulfillmentApi,
  type SalesDocLineDto,
  type SalesInvoiceApi,
  type SalesOrderApi,
  type SalesQuoteApi,
} from '../../lib/sales-api';
import { SALES_INVOICES } from '../../lib/sales-invoices-demo';
import { SALES_ORDERS } from '../../lib/sales-orders-demo';
import { DEMO_SALES_LINE } from '../../lib/sales-create-defaults';
import { SALES_QUOTES } from '../../lib/sales-quotes-demo';

export type SalesDocKind = 'quote' | 'order' | 'invoice';

type Props = {
  kind: SalesDocKind;
  number: string;
};

const BACK_HREF: Record<SalesDocKind, string> = {
  quote: '/sales/quotes',
  order: '/sales/orders',
  invoice: '/sales/invoices',
};

const TITLE: Record<SalesDocKind, string> = {
  quote: 'پیش‌فاکتور',
  order: 'سفارش فروش',
  invoice: 'فاکتور فروش',
};

export function SalesDocumentDetailScreen({ kind, number }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [converting, setConverting] = useState(false);
  const [confirmingSupply, setConfirmingSupply] = useState(false);
  const [fulfilling, setFulfilling] = useState(false);
  const [returnDrafting, setReturnDrafting] = useState(false);
  const [fulfillPostCogs, setFulfillPostCogs] = useState(false);
  const [fulfillPostInvoice, setFulfillPostInvoice] = useState(false);
  const [fulfillment, setFulfillment] = useState<SalesOrderFulfillmentApi | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [actionMsg, setActionMsg] = useState<string | null>(null);
  const [source, setSource] = useState<string | null>(null);
  const [quote, setQuote] = useState<SalesQuoteApi | null>(null);
  const [order, setOrder] = useState<SalesOrderApi | null>(null);
  const [invoice, setInvoice] = useState<SalesInvoiceApi | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        if (kind === 'quote') {
          const res = await fetchSalesQuote(number);
          if (!cancelled) {
            setQuote(res.quote ?? demoQuote(number));
            setSource(res.source);
          }
        } else if (kind === 'order') {
          const res = await fetchSalesOrder(number);
          const ful = await fetchSalesOrderFulfillment(number).catch(() => null);
          if (!cancelled) {
            setOrder(res.order ?? demoOrder(number));
            setSource(res.source);
            setFulfillment(ful?.fulfillment ?? null);
          }
        } else {
          const res = await fetchSalesInvoice(number);
          if (!cancelled) {
            setInvoice(res.invoice ?? demoInvoice(number));
            setSource(res.source);
          }
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : 'خطا');
          if (kind === 'quote') setQuote(demoQuote(number));
          if (kind === 'order') setOrder(demoOrder(number));
          if (kind === 'invoice') setInvoice(demoInvoice(number));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [kind, number]);

  const lines =
    quote?.lines ?? order?.lines ?? invoice?.lines ?? [];
  const missing = !quote && !order && !invoice && !loading;

  async function handlePostInvoice() {
    if (!invoice || invoice.status === 'posted') return;
    setPosting(true);
    setActionMsg(null);
    setError(null);
    try {
      const { invoice: posted } = await postSalesInvoice(invoice.number);
      setInvoice(posted);
      setActionMsg(`ثبت شد — سند مالی ${posted.glDocNumber ?? '—'}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'ثبت فاکتور ناموفق');
    } finally {
      setPosting(false);
    }
  }

  async function handleConfirmSupply() {
    if (!order || order.supplyStatus === 'ready' || order.supplyStatus === 'shipped') return;
    setConfirmingSupply(true);
    setActionMsg(null);
    setError(null);
    try {
      const { order: confirmed, reservations } = await confirmSalesOrderSupply(order.number);
      setOrder(confirmed);
      const ids = reservations.map((r) => r.id).join(', ');
      setActionMsg(
        ids ? `رزرو انبار ثبت شد — ${ids}` : 'سفارش از قبل آماده تحویل بود',
      );
      const ful = await fetchSalesOrderFulfillment(order.number).catch(() => null);
      setFulfillment(ful?.fulfillment ?? null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'رزرو موجودی ناموفق');
    } finally {
      setConfirmingSupply(false);
    }
  }

  async function handleFulfillOrder() {
    if (!order) return;
    setFulfilling(true);
    setActionMsg(null);
    setError(null);
    try {
      const result = await fulfillSalesOrder(order.number, {
        postCogs: fulfillPostCogs,
        autoPostInvoice: fulfillPostInvoice,
      });
      setOrder(result.order);
      setFulfillment({
        orderNumber: order.number,
        supplyStatus: result.order.supplyStatus,
        wmsIssueDocNo: result.issue.docNo,
        wmsIssueGlDocNumber: result.issue.glDocNumber,
        invoiceNumber: result.invoice?.number ?? null,
        invoiceStatus: (result.invoice?.status as 'draft' | 'posted') ?? null,
        invoiceGlDocNumber: result.invoice?.glDocNumber,
        activeReservationCount: 0,
      });
      setActionMsg(
        result.replay
          ? `تحویل قبلاً ثبت شده — حواله ${result.issue.docNo}`
          : `تحویل کامل — حواله ${result.issue.docNo}${
              result.invoice ? ` · فاکتور ${result.invoice.number}` : ''
            }`,
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : 'تحویل سفارش ناموفق');
    } finally {
      setFulfilling(false);
    }
  }

  async function handleReturnDraftFromInvoice() {
    if (!invoice || invoice.status !== 'posted') return;
    setReturnDrafting(true);
    setActionMsg(null);
    setError(null);
    try {
      const { return: memo } = await createSalesReturnFromInvoice(invoice.number);
      router.push(`/sales/returns/${encodeURIComponent(memo.id)}?restock=1`);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'صدور اعلامیه برگشت ناموفق');
    } finally {
      setReturnDrafting(false);
    }
  }

  async function handleConvertToOrder() {
    if (!quote) return;
    setConverting(true);
    setActionMsg(null);
    setError(null);
    try {
      const { order } = await createSalesOrder({
        accountCode: quote.accountCode,
        quoteNumber: quote.number,
        lines: quote.lines.length ? quote.lines : [DEMO_SALES_LINE],
      });
      if (order) router.push(`/sales/orders/${encodeURIComponent(order.number)}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'صدور سفارش ناموفق');
    } finally {
      setConverting(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <Button variant="ghost" size="sm" className="w-fit -mr-2" asChild>
        <Link href={BACK_HREF[kind]}>
          <ArrowRight className="size-4 ml-1" />
          {TITLE[kind]}ها
        </Link>
      </Button>

      {loading ? <p className="text-xs text-muted-foreground">بارگذاری از API فروش…</p> : null}
      {error ? <p className="text-xs text-amber-600">API: {error} — نمایش نمونه در صورت وجود</p> : null}
      {source ? <p className="text-[11px] text-muted-foreground">منبع: {source}</p> : null}
      {actionMsg ? <p className="text-xs text-emerald-700">{actionMsg}</p> : null}

      {missing ? (
        <Card>
          <CardContent className="py-10 text-center text-sm text-muted-foreground">سند «{number}» یافت نشد.</CardContent>
        </Card>
      ) : (
        <>
          <DocHeader number={number} quote={quote} order={order} invoice={invoice} />
          <Card>
            <CardHeader>
              <CardTitle className="text-base">اقلام</CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <LinesTable lines={lines} />
            </CardContent>
          </Card>
          {kind === 'order' && order ? (
            <Card>
              <CardHeader className="py-3">
                <CardTitle className="text-base">زنجیره تأمین و تحویل</CardTitle>
              </CardHeader>
              <CardContent className="text-xs space-y-2 pb-4">
                <p>
                  وضعیت تأمین: <span className="font-mono">{order.supplyStatus}</span>
                  {fulfillment?.activeReservationCount
                    ? ` · ${fulfillment.activeReservationCount} رزرو فعال`
                    : null}
                </p>
                <MotionFulfillmentLinks fulfillment={fulfillment} />
              </CardContent>
            </Card>
          ) : null}
          <Card>
            <CardContent className="py-4 flex flex-wrap gap-2">
              {kind === 'quote' && quote ? (
                <Button className="bg-rose-700 hover:bg-rose-800" disabled={converting} onClick={() => void handleConvertToOrder()}>
                  {converting ? 'صدور سفارش…' : 'تبدیل به سفارش (API)'}
                </Button>
              ) : null}
              {kind === 'order' && order ? (
                <>
                  {order.supplyStatus !== 'ready' && order.supplyStatus !== 'shipped' ? (
                    <Button
                      className="bg-violet-800 hover:bg-violet-900"
                      disabled={confirmingSupply}
                      onClick={() => void handleConfirmSupply()}
                    >
                      {confirmingSupply ? 'رزرو در انبار…' : 'تأیید تأمین + رزرو انبار (API)'}
                    </Button>
                  ) : null}
                  {order.supplyStatus === 'ready' ? (
                    <>
                      <Button
                        className="bg-rose-700 hover:bg-rose-800"
                        disabled={fulfilling}
                        onClick={() => void handleFulfillOrder()}
                      >
                        {fulfilling ? 'تحویل…' : 'تحویل یک‌کلیکی (خروج + فاکتور)'}
                      </Button>
                      <label className="flex items-center gap-1 text-xs w-full">
                        <input type="checkbox" checked={fulfillPostCogs} onChange={(e) => setFulfillPostCogs(e.target.checked)} />
                        COGS در GL
                      </label>
                      <label className="flex items-center gap-1 text-xs w-full">
                        <input
                          type="checkbox"
                          checked={fulfillPostInvoice}
                          onChange={(e) => setFulfillPostInvoice(e.target.checked)}
                        />
                        ثبت فاکتور در GL
                      </label>
                      <Button variant="secondary" asChild>
                        <Link href={`/wms/issues`}>خروج دستی در WMS</Link>
                      </Button>
                    </>
                  ) : null}
                  {order.supplyStatus === 'shipped' ? (
                    <Button variant="secondary" asChild>
                      <Link href="/wms/issues">حواله‌های خروج</Link>
                    </Button>
                  ) : (
                    <Button variant="secondary" asChild>
                      <Link href="/wms/reservations">رزروهای انبار</Link>
                    </Button>
                  )}
                </>
              ) : null}
              {kind === 'invoice' && invoice?.status === 'draft' ? (
                <Button className="bg-rose-700 hover:bg-rose-800" disabled={posting} onClick={() => void handlePostInvoice()}>
                  {posting ? 'ثبت در GL…' : 'ثبت قطعی فاکتور + GL'}
                </Button>
              ) : null}
              {invoice?.status === 'posted' ? (
                <>
                  <Button variant="outline" asChild>
                    <Link href="/finance/receivables">مشاهده دریافتنی</Link>
                  </Button>
                  {invoice.glDocNumber ? (
                    <Button variant="outline" asChild>
                      <Link href="/finance/ledgers">سند {invoice.glDocNumber}</Link>
                    </Button>
                  ) : null}
                  <Button
                    variant="outline"
                    disabled={returnDrafting}
                    onClick={() => void handleReturnDraftFromInvoice()}
                  >
                    {returnDrafting ? 'اعلامیه برگشت…' : 'برگشت + رسید انبار'}
                  </Button>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/sales/returns?invoice=${encodeURIComponent(invoice.number)}`}>ثبت دستی برگشت</Link>
                  </Button>
                </>
              ) : null}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}

function DocHeader({
  number,
  quote,
  order,
  invoice,
}: {
  number: string;
  quote: SalesQuoteApi | null;
  order: SalesOrderApi | null;
  invoice: SalesInvoiceApi | null;
}) {
  return (
    <Card className="finance-aging-card">
      <CardContent className="pt-4 space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h1 className="text-xl font-bold font-mono">{number}</h1>
          {quote ? <Badge>{quote.status === 'accepted' ? 'پذیرفته‌شده' : 'پیش‌نویس'}</Badge> : null}
          {order ? <Badge variant="outline">{order.status}</Badge> : null}
          {invoice ? (
            invoice.status === 'posted' ? (
              <Badge className="bg-emerald-600 hover:bg-emerald-600">ثبت قطعی</Badge>
            ) : (
              <Badge variant="secondary">پیش‌نویس</Badge>
            )
          ) : null}
        </div>
        {quote ? (
          <p className="text-sm text-muted-foreground">
            طرف حساب:{' '}
            <Link href={`/sales/customers/${encodeURIComponent(quote.accountCode)}`} className="font-mono hover:underline">
              {quote.accountCode}
            </Link>
            {' · '}
            اعتبار تا {quote.validUntil}
            {quote.relatedLead ? ` · سرنخ ${quote.relatedLead}` : ''}
          </p>
        ) : null}
        {order ? (
          <p className="text-sm text-muted-foreground">
            طرف حساب:{' '}
            <Link href={`/sales/customers/${encodeURIComponent(order.accountCode)}`} className="font-mono hover:underline">
              {order.accountCode}
            </Link>
            {order.quoteNumber ? (
              <>
                {' · از '}
                <Link href={`/sales/quotes/${encodeURIComponent(order.quoteNumber)}`} className="font-mono hover:underline">
                  {order.quoteNumber}
                </Link>
              </>
            ) : null}
            {' · '}
            {order.deliveredLabel}
          </p>
        ) : null}
        {invoice ? (
          <p className="text-sm text-muted-foreground">
            {invoice.customerName}
            {invoice.customerCode ? (
              <>
                {' '}
                <Link href={`/sales/customers/${encodeURIComponent(invoice.customerCode)}`} className="font-mono text-xs hover:underline">
                  ({invoice.customerCode})
                </Link>
              </>
            ) : null}
            {' · سفارش '}
            <Link href={`/sales/orders/${encodeURIComponent(invoice.orderNumber)}`} className="font-mono hover:underline">
              {invoice.orderNumber}
            </Link>
            {' · سررسید '}
            {invoice.dueDate}
            {invoice.glDocNumber ? (
              <>
                {' · GL '}
                <Link href="/finance/ledgers" className="font-mono hover:underline">
                  {invoice.glDocNumber}
                </Link>
              </>
            ) : null}
          </p>
        ) : null}
        <p className="text-lg font-semibold tabular-nums">
          جمع: {formatToman(quote?.totalToman ?? order?.amountToman ?? invoice?.amountToman ?? 0)} تومان
        </p>
      </CardContent>
    </Card>
  );
}

function MotionFulfillmentLinks({ fulfillment }: { fulfillment: SalesOrderFulfillmentApi | null }) {
  if (!fulfillment?.wmsIssueDocNo && !fulfillment?.invoiceNumber) {
    return <p className="text-muted-foreground">هنوز حواله انبار یا فاکتور ثبت نشده است.</p>;
  }
  return (
    <div className="flex flex-wrap gap-3">
      {fulfillment.wmsIssueDocNo ? (
        <Link
          href={`/wms/documents/${encodeURIComponent(fulfillment.wmsIssueDocNo)}`}
          className="font-mono text-rose-800 hover:underline"
        >
          حواله {fulfillment.wmsIssueDocNo}
          {fulfillment.wmsIssueGlDocNumber ? ` (COGS ${fulfillment.wmsIssueGlDocNumber})` : ''}
        </Link>
      ) : null}
      {fulfillment.invoiceNumber ? (
        <Link
          href={`/sales/invoices/${encodeURIComponent(fulfillment.invoiceNumber)}`}
          className="font-mono hover:underline"
        >
          فاکتور {fulfillment.invoiceNumber}
          {fulfillment.invoiceStatus ? ` — ${fulfillment.invoiceStatus}` : ''}
        </Link>
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
          <th className="py-2 text-right">واحد</th>
          <th className="py-2 text-right">فی (ریال)</th>
          <th className="py-2 text-right">تخفیف</th>
          <th className="py-2 text-right">جمع ردیف</th>
        </tr>
      </thead>
      <tbody>
        {lines.map((l) => (
          <tr key={`${l.sku}-${l.description}`} className="border-b border-dashed">
            <td className="py-2 font-mono text-xs">{l.sku}</td>
            <td className="py-2">{l.description}</td>
            <td className="py-2 tabular-nums">{l.quantity}</td>
            <td className="py-2">{l.unit}</td>
            <td className="py-2 tabular-nums">{formatToman(l.unitPriceRial)}</td>
            <td className="py-2 tabular-nums">{formatToman(l.discountRial)}</td>
            <td className="py-2 tabular-nums font-medium">{formatToman(l.lineTotalRial)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function demoQuote(number: string): SalesQuoteApi | null {
  const q = SALES_QUOTES.find((r) => r.number === number);
  if (!q) return null;
  return {
    number: q.number,
    accountCode: q.accountCode,
    validUntil: q.validUntil,
    status: q.status === 'accepted' ? 'accepted' : 'draft',
    totalToman: q.totalToman,
    lines: [],
  };
}

function demoOrder(number: string): SalesOrderApi | null {
  const o = SALES_ORDERS.find((r) => r.number === number);
  if (!o) return null;
  return {
    number: o.number,
    accountCode: o.accountCode,
    supplyStatus: o.supplyStatus,
    deliveredLabel: o.deliveredLabel,
    amountToman: o.amountToman,
    status: 'Draft',
    lines: [],
  };
}

function demoInvoice(number: string): SalesInvoiceApi | null {
  const i = SALES_INVOICES.find((r) => r.number === number);
  if (!i) return null;
  return {
    number: i.number,
    customerName: i.customerName,
    customerCode: i.customerCode,
    orderNumber: i.orderNumber,
    invoiceDate: i.invoiceDate,
    dueDate: i.dueDate,
    status: i.status,
    amountToman: i.amountToman,
    lines: [],
  };
}
