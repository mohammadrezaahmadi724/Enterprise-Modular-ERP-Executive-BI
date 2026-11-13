'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Badge, Button, Card, CardContent } from '@repo/ui';
import { BarChart3 } from 'lucide-react';
import { downloadWmsValuationReconciliationCsv, fetchWmsValuationReconciliation, type WmsValuationReconApi } from '../../lib/wms-api';

const REPORTS = [
  { title: 'مانده موجودی به تفکیک انبار', tag: 'on-screen', href: '/wms/stock' },
  { title: 'کارتکس کالا — مقداری و ریالی', tag: 'xlsx', href: '/wms/kardex' },
  { title: 'اقلام راکد و کم‌گردش', tag: 'on-screen', href: '/wms/kardex' },
  { title: 'مغایرت انبارگردانی', tag: 'xlsx', href: '/wms/stocktaking' },
  { title: 'رزروهای فعال و منقضی', tag: 'on-screen', href: '/wms/reservations' },
  { title: 'گردش رسید و حواله', tag: 'xlsx', href: '/wms/receipts' },
];

function formatRial(n: number) {
  return new Intl.NumberFormat('fa-IR').format(n);
}

export function WmsReportsScreen() {
  const [recon, setRecon] = useState<WmsValuationReconApi | null>(null);
  const [reconSource, setReconSource] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { reconciliation, source } = await fetchWmsValuationReconciliation();
        if (!cancelled) {
          setRecon(reconciliation);
          setReconSource(source);
        }
      } catch {
        if (!cancelled) setRecon(null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <Card className="border-violet-200 bg-violet-50/40">
        <CardContent className="pt-4 space-y-2">
          <p className="font-semibold text-sm flex items-center gap-2">
            <BarChart3 className="size-4 text-violet-700" />
            مغایرت ارزش دفتری انبار و GL
          </p>
          {reconSource ? <p className="text-[11px] text-muted-foreground">منبع: {reconSource}</p> : null}
          {recon ? (
            <dl className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm tabular-nums">
              <div>
                <dt className="text-muted-foreground text-xs">ارزش دفتری (کاردکس)</dt>
                <dd className="font-semibold">{formatRial(recon.bookValueRial)} ریال</dd>
              </div>
              <div>
                <dt className="text-muted-foreground text-xs">موجودی GL (۱۳۰۱)</dt>
                <dd className="font-semibold">{formatRial(recon.glInventoryRial)} ریال</dd>
              </div>
              <div>
                <dt className="text-muted-foreground text-xs">مغایرت</dt>
                <dd className={`font-semibold ${recon.varianceRial !== 0 ? 'text-amber-700' : ''}`}>
                  {formatRial(recon.varianceRial)} ریال
                </dd>
              </div>
            </dl>
          ) : (
            <p className="text-xs text-muted-foreground">برای محاسبه، API را بالا بیاورید.</p>
          )}
          <p className="text-[11px] text-muted-foreground">
            {recon
              ? `${recon.stockRowCount} ردیف موجودی · ${recon.pricedSkuCount} SKU با نرخ از کاردکس`
              : null}
          </p>
          <Button
            size="sm"
            variant="outline"
            type="button"
            onClick={() => void downloadWmsValuationReconciliationCsv().catch(() => undefined)}
          >
            دانلود CSV
          </Button>
        </CardContent>
      </Card>

      <div className="grid gap-3 sm:grid-cols-2">
        {REPORTS.map((r) => (
          <Card key={r.title} className="hover:border-violet-300 transition-colors">
            <CardContent className="pt-4 flex items-start justify-between gap-2">
              <div>
                <p className="font-semibold text-sm flex items-center gap-2">
                  <BarChart3 className="size-4 text-violet-600" />
                  {r.title}
                </p>
                <Badge variant="outline" className="mt-2 text-[10px]">
                  {r.tag}
                </Badge>
              </div>
              <Button size="sm" variant="outline" asChild>
                <Link href={r.href}>اجرا</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
