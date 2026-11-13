'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from '@repo/ui';
import { ArrowRight } from 'lucide-react';
import { fetchWmsDocument, type WmsDocApi } from '../../lib/wms-api';

export function WmsDocumentDetailScreen({ docNo }: { docNo: string }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<string | null>(null);
  const [doc, setDoc] = useState<WmsDocApi | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const res = await fetchWmsDocument(docNo);
        if (!cancelled) {
          setDoc(res.document);
          setSource(res.source);
          setError(res.document ? null : 'سند یافت نشد');
        }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'خطا');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [docNo]);

  return (
    <div className="flex flex-col gap-4">
      <Button variant="ghost" size="sm" className="w-fit -mr-2" asChild>
        <Link href="/wms/receipts">
          <ArrowRight className="size-4 ml-1" />
          بازگشت به اسناد انبار
        </Link>
      </Button>
      {loading ? <p className="text-xs text-muted-foreground">بارگذاری سند…</p> : null}
      {error ? <p className="text-xs text-amber-600">{error}</p> : null}
      {source ? <p className="text-[11px] text-muted-foreground">منبع: {source}</p> : null}
      {doc ? (
        <>
          <Card className="finance-aging-card">
            <CardContent className="pt-4 space-y-2">
              <MotionTitle doc={doc} />
              <p className="text-sm text-muted-foreground">
                {doc.party} · {doc.orderRef} · {doc.date}
              </p>
              <Badge className="bg-emerald-600 hover:bg-emerald-600">{doc.status === 'posted' ? 'ثبت‌شده' : doc.status}</Badge>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">اقلام</CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-xs text-muted-foreground">
                    <th className="py-2 text-right">کالا</th>
                    <th className="py-2 text-right">انبار</th>
                    <th className="py-2 text-right">مقدار</th>
                    <th className="py-2 text-right">فی (ریال)</th>
                  </tr>
                </thead>
                <tbody>
                  {doc.lines.map((l) => (
                    <tr key={`${l.sku}-${l.warehouse}`} className="border-b border-dashed">
                      <td className="py-2 font-mono text-xs">{l.sku}</td>
                      <td className="py-2 font-mono text-xs">{l.warehouse}</td>
                      <td className="py-2 tabular-nums">{l.quantity}</td>
                      <td className="py-2 tabular-nums">{l.unitPriceRial ?? '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </>
      ) : null}
    </div>
  );
}

function MotionTitle({ doc }: { doc: WmsDocApi }) {
  return <h1 className="text-xl font-bold font-mono">{doc.docNo}</h1>;
}
