'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { Badge, Button, Card, CardContent } from '@repo/ui';
import { cn } from '@repo/ui';
import { Scale } from 'lucide-react';
import {
  DEMO_RFQS,
  RFQ_STATUS_LABEL,
  type RfqStatus,
} from '../../lib/procurement-demo';
import {
  addRfqQuote,
  awardRfq,
  createRfq,
  fetchApprovedPurchaseRequests,
  fetchRfqs,
  fetchSuppliers,
  type PurchaseRequestApi,
  type RfqApi,
  type SupplierApi,
} from '../../lib/procurement-api';
import { formatToman } from '../../lib/finance-receivables-demo';
import {
  ProcurementGridToolbar,
  ProcurementListCardHeader,
  rowPadding,
  type RowDensity,
} from './procurement-screen-bits';

export function ProcurementRfqScreen() {
  const [rfqs, setRfqs] = useState<RfqApi[]>(DEMO_RFQS);
  const [selected, setSelected] = useState<string>(DEMO_RFQS[0]?.number ?? '');
  const [prs, setPrs] = useState<PurchaseRequestApi[]>([]);
  const [suppliers, setSuppliers] = useState<SupplierApi[]>([]);
  const [density, setDensity] = useState<RowDensity>('normal');
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [prNumber, setPrNumber] = useState('');
  const [deadline, setDeadline] = useState('۱۴۰۵/۰۸/۲۵');
  const [invited, setInvited] = useState<string[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [r, pr, sup] = await Promise.all([fetchRfqs(), fetchApprovedPurchaseRequests(), fetchSuppliers()]);
        if (cancelled) return;
        if (r.rfqs.length) {
          setRfqs(r.rfqs);
          setSelected(r.rfqs[0]?.number ?? '');
        }
        setPrs(pr.requests);
        setSuppliers(sup.suppliers);
      } catch {
        /* demo */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim();
    if (!q) return rfqs;
    return rfqs.filter((r) => r.number.includes(q) || r.title.includes(q));
  }, [rfqs, search]);

  const active = useMemo(() => rfqs.find((r) => r.number === selected) ?? null, [rfqs, selected]);

  const lowestTotal = useMemo(() => {
    if (!active?.quotes.length) return null;
    return Math.min(...active.quotes.map((q) => q.totalToman));
  }, [active]);

  async function onCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !invited.length) return;
    try {
      const { rfq } = await createRfq({
        title: title.trim(),
        purchaseRequestNumber: prNumber.trim() || undefined,
        deadline: deadline.trim(),
        invitedSupplierCodes: invited,
      });
      setRfqs((prev) => [rfq, ...prev]);
      setSelected(rfq.number);
      setShowForm(false);
      setTitle('');
      setInvited([]);
      setMessage(`استعلام ${rfq.number} ایجاد شد`);
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'خطا');
    }
  }

  function toggleSupplier(code: string) {
    setInvited((prev) => (prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]));
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-lg font-bold">استعلام قیمت (RFQ)</h1>
          <p className="text-sm text-muted-foreground">دعوت تأمین‌کنندگان، دریافت پیشنهاد و مقایسه قبل از صدور PO</p>
        </div>
        <Button type="button" className="bg-rose-800 hover:bg-rose-900" onClick={() => setShowForm((v) => !v)}>
          استعلام جدید
        </Button>
      </div>

      {message ? <p className="text-xs text-muted-foreground">{message}</p> : null}

      {showForm ? (
        <Card className="border-violet-200/60 bg-violet-50/30">
          <CardContent className="pt-4">
            <form onSubmit={onCreate} className="space-y-3 text-sm">
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block sm:col-span-2">
                  <span className="text-xs text-muted-foreground">عنوان استعلام *</span>
                  <input className="mt-1 w-full rounded-md border px-3 py-2" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </label>
                <label className="block">
                  <span className="text-xs text-muted-foreground">درخواست خرید مرتبط</span>
                  <select className="mt-1 w-full rounded-md border px-3 py-2 bg-background" value={prNumber} onChange={(e) => setPrNumber(e.target.value)}>
                    <option value="">—</option>
                    {prs.map((p) => (
                      <option key={p.number} value={p.number}>
                        {p.number}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="text-xs text-muted-foreground">مهلت پاسخ *</span>
                  <input className="mt-1 w-full rounded-md border px-3 py-2" value={deadline} onChange={(e) => setDeadline(e.target.value)} required />
                </label>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2">تأمین‌کنندگان دعوت‌شده *</p>
                <div className="flex flex-wrap gap-2">
                  {suppliers.map((s) => (
                    <label key={s.code} className="flex items-center gap-1 rounded-md border px-2 py-1 text-xs cursor-pointer">
                      <input type="checkbox" checked={invited.includes(s.code)} onChange={() => toggleSupplier(s.code)} />
                      {s.name}
                    </label>
                  ))}
                </div>
              </div>
              <Button type="submit" className="bg-rose-800 hover:bg-rose-900">
                انتشار استعلام
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : null}

      <Card className="overflow-hidden">
        <ProcurementListCardHeader icon={<Scale className="size-5" />} title="استعلام‌های فعال" subtitle={`${filtered.length.toLocaleString('fa-IR')} پرونده`} />
        <ProcurementGridToolbar search={search} onSearch={setSearch} placeholder="شماره یا عنوان" density={density} onDensity={setDensity} />
        <MotionList filtered={filtered} selected={selected} onSelect={setSelected} density={density} />
      </Card>

      {active ? (
        <Card>
          <CardContent className="pt-4 space-y-4">
            <MotionCompare
              active={active}
              lowestTotal={lowestTotal}
              suppliers={suppliers}
              onQuoted={(rfq) => setRfqs((prev) => prev.map((r) => (r.number === rfq.number ? rfq : r)))}
              onAwarded={(rfq, poNumber) => {
                setRfqs((prev) => prev.map((r) => (r.number === rfq.number ? rfq : r)));
                setMessage(`برنده انتخاب شد — سفارش ${poNumber} صادر شد`);
              }}
            />
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}

function MotionList({
  filtered,
  selected,
  onSelect,
  density,
}: {
  filtered: RfqApi[];
  selected: string;
  onSelect: (n: string) => void;
  density: RowDensity;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b bg-muted/40 text-muted-foreground">
            <th className="py-2 px-3 text-right">شماره</th>
            <th className="py-2 px-3 text-right">عنوان</th>
            <th className="py-2 px-3 text-right">درخواست</th>
            <th className="py-2 px-3 text-right">مهلت</th>
            <th className="py-2 px-3 text-right">پیشنهادها</th>
            <th className="py-2 px-3 text-right">وضعیت</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((r) => (
            <tr
              key={r.number}
              className={cn('border-b border-dashed cursor-pointer hover:bg-muted/30', selected === r.number && 'bg-violet-50 dark:bg-violet-950/30')}
              onClick={() => onSelect(r.number)}
            >
              <td className={cn('px-3 font-mono text-violet-800', rowPadding(density))}>{r.number}</td>
              <td className={cn('px-3', rowPadding(density))}>{r.title}</td>
              <td className={cn('px-3 font-mono', rowPadding(density))}>{r.purchaseRequestNumber ?? '—'}</td>
              <td className={cn('px-3 tabular-nums', rowPadding(density))}>{r.deadline}</td>
              <td className={cn('px-3 tabular-nums', rowPadding(density))}>
                {r.quotes.length.toLocaleString('fa-IR')} / {r.invitedSupplierCodes.length.toLocaleString('fa-IR')}
              </td>
              <td className={cn('px-3', rowPadding(density))}>
                <RfqStatusBadge status={r.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RfqStatusBadge({ status }: { status: string }) {
  const s = (status in RFQ_STATUS_LABEL ? status : 'draft') as RfqStatus;
  return (
    <Badge variant="secondary" className="font-normal">
      {RFQ_STATUS_LABEL[s]}
    </Badge>
  );
}

function MotionCompare({
  active,
  lowestTotal,
  suppliers,
  onQuoted,
  onAwarded,
}: {
  active: RfqApi;
  lowestTotal: number | null;
  suppliers: SupplierApi[];
  onQuoted: (rfq: RfqApi) => void;
  onAwarded: (rfq: RfqApi, poNumber: string) => void;
}) {
  const [awarding, setAwarding] = useState<string | null>(null);
  const isAwarded = active.status === 'awarded';

  return (
    <>
      <MotionHdr active={active} />
      {active.purchaseOrderNumber ? (
        <p className="text-xs">
          سفارش صادرشده:{' '}
          <Link
            href={`/procurement/purchase-orders?supplier=${encodeURIComponent(active.awardedSupplierCode ?? '')}`}
            className="font-mono text-primary"
          >
            {active.purchaseOrderNumber}
          </Link>
        </p>
      ) : null}
      {active.quotes.length ? (
        <table className="w-full text-xs border rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-muted/50 border-b">
              <th className="py-2 px-3 text-right">تأمین‌کننده</th>
              <th className="py-2 px-3 text-right">جمع (تومان)</th>
              <th className="py-2 px-3 text-right">تحویل (روز)</th>
              <th className="py-2 px-3 text-right">تاریخ ارسال</th>
              <th className="py-2 px-3 text-right w-40" />
            </tr>
          </thead>
          <tbody>
            {active.quotes.map((q) => {
              const isLow = lowestTotal !== null && q.totalToman === lowestTotal;
              const lead = q.lines[0]?.leadDays;
              const isWinner = active.awardedSupplierCode === q.supplierCode;
              return (
                <tr key={q.supplierCode} className={cn('border-b', isLow && 'bg-emerald-50/80 dark:bg-emerald-950/20')}>
                  <td className="px-3 py-2">
                    <span className="font-medium">{q.supplierName}</span>
                    {isLow ? (
                      <Badge className="mr-2 bg-emerald-600 text-white text-[10px]">کمترین</Badge>
                    ) : null}
                    {isWinner ? <Badge className="mr-2 text-[10px]">برنده</Badge> : null}
                  </td>
                  <td className="px-3 py-2 tabular-nums font-semibold">{formatToman(q.totalToman)}</td>
                  <td className="px-3 py-2 tabular-nums">{lead != null ? lead.toLocaleString('fa-IR') : '—'}</td>
                  <td className="px-3 py-2 tabular-nums">{q.submittedAt}</td>
                  <td className="px-3 py-2">
                    {!isAwarded ? (
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        className="text-[11px] h-7"
                        disabled={awarding === q.supplierCode}
                        onClick={async () => {
                          setAwarding(q.supplierCode);
                          try {
                            const { rfq, order } = await awardRfq(active.number, { supplierCode: q.supplierCode });
                            onAwarded(rfq, order.number);
                          } catch {
                            /* ignore */
                          } finally {
                            setAwarding(null);
                          }
                        }}
                      >
                        انتخاب و صدور PO
                      </Button>
                    ) : null}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p className="text-sm text-muted-foreground">هنوز پیشنهادی ثبت نشده است.</p>
      )}
      <DemoQuoteHint active={active} suppliers={suppliers} onQuoted={onQuoted} />
    </>
  );
}

function MotionHdr({ active }: { active: RfqApi }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <div>
        <p className="font-semibold">{active.title}</p>
        <p className="text-xs text-muted-foreground font-mono">{active.number}</p>
      </div>
      <RfqStatusBadge status={active.status} />
    </div>
  );
}

function DemoQuoteHint({
  active,
  suppliers,
  onQuoted,
}: {
  active: RfqApi;
  suppliers: SupplierApi[];
  onQuoted: (rfq: RfqApi) => void;
}) {
  const pending = active.invitedSupplierCodes.find((c) => !active.quotes.some((q) => q.supplierCode === c));
  if (!pending) return null;
  const sup = suppliers.find((s) => s.code === pending);
  if (!sup) return null;

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={async () => {
        try {
          const { rfq } = await addRfqQuote(active.number, {
            supplierCode: sup.code,
            supplierName: sup.name,
            lines: [{ sku: 'PRD-STEEL', quantity: 12, unit: 'تن', unitPriceToman: 73_500_000, leadDays: 6 }],
          });
          onQuoted(rfq);
        } catch {
          /* ignore */
        }
      }}
    >
      ثبت پیشنهاد نمونه از {sup.name}
    </Button>
  );
}
