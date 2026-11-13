'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from '@repo/ui';
import { ArrowRight } from 'lucide-react';
import {
  fetchWmsStocktakingSession,
  patchWmsStocktakingLine,
  postWmsStocktakingSession,
  type WmsStocktakingSessionApi,
} from '../../lib/wms-api';

type Props = { id: string };

export function WmsStocktakingDetailScreen({ id }: Props) {
  const [session, setSession] = useState<WmsStocktakingSessionApi | null>(null);
  const [source, setSource] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [posting, setPosting] = useState(false);
  const [actionMsg, setActionMsg] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetchWmsStocktakingSession(id);
        if (!cancelled) {
          setSession(res.session);
          setSource(res.source);
        }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'خطا');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  return (
    <div className="flex flex-col gap-4">
      <Button variant="ghost" size="sm" className="w-fit -mr-2" asChild>
        <Link href="/wms/stocktaking">
          <ArrowRight className="size-4 ml-1" />
          انبارگردانی
        </Link>
      </Button>
      {error ? <p className="text-xs text-amber-600">{error}</p> : null}
      {actionMsg ? <p className="text-xs text-emerald-700">{actionMsg}</p> : null}
      {source ? <p className="text-[11px] text-muted-foreground">منبع: {source}</p> : null}
      {!session ? (
        <Card>
          <CardContent className="py-8 text-center text-sm text-muted-foreground">سشن یافت نشد.</CardContent>
        </Card>
      ) : (
        <>
          <Card>
            <CardContent className="pt-4 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl font-bold font-mono">{session.id}</h1>
                {session.status === 'reconciled' ? (
                  <Badge className="bg-amber-500 hover:bg-amber-500">مغایرت‌گیری شده</Badge>
                ) : (
                  <Badge variant="secondary">پیش‌نویس</Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {session.warehouse} — {session.warehouseLabel} · تاریخ {session.countDate}
              </p>
              <p className="text-sm tabular-nums">
                {session.totalLines} قلم · {session.varianceLines} مغایرت
                {session.glDocNumber ? (
                  <>
                    {' · GL '}
                    <Link href="/finance/ledgers" className="font-mono hover:underline">
                      {session.glDocNumber}
                    </Link>
                  </>
                ) : null}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">شمارش</CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-xs text-muted-foreground border-b">
                  <tr>
                    <th className="py-2 text-right">SKU</th>
                    <th className="py-2 text-right">سیستمی</th>
                    <th className="py-2 text-right">شمارش</th>
                  </tr>
                </thead>
                <tbody>
                  {(session.lines ?? []).map((l) => (
                    <tr key={l.sku} className="border-b border-dashed">
                      <td className="py-2 font-mono text-xs">{l.sku}</td>
                      <td className="py-2 tabular-nums">{l.systemQty}</td>
                      <td className="py-2 tabular-nums">
                        {session.status === 'draft' ? (
                          <input
                            type="number"
                            className="w-20 border rounded px-1 py-0.5 text-sm"
                            defaultValue={l.countedQty}
                            onBlur={async (e) => {
                              const v = Number(e.target.value);
                              if (!Number.isFinite(v)) return;
                              try {
                                const { session: next } = await patchWmsStocktakingLine(session.id, {
                                  sku: l.sku,
                                  countedQty: v,
                                });
                                setSession(next);
                              } catch (err) {
                                setError(err instanceof Error ? err.message : 'خطا');
                              }
                            }}
                          />
                        ) : (
                          l.countedQty
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
          {session.status === 'draft' ? (
            <div className="flex justify-end">
              <Button
                className="bg-rose-700 hover:bg-rose-800"
                disabled={posting}
                onClick={async () => {
                  setPosting(true);
                  setError(null);
                  try {
                    const { session: posted } = await postWmsStocktakingSession(session.id);
                    setSession(posted);
                    setActionMsg('انبارگردانی ثبت شد — تعدیل‌ها اعمال شدند');
                  } catch (e) {
                    setError(e instanceof Error ? e.message : 'ثبت ناموفق');
                  } finally {
                    setPosting(false);
                  }
                }}
              >
                {posting ? 'ثبت…' : 'ثبت نهایی + تعدیل موجودی (API)'}
              </Button>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
