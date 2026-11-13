'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Badge, Card, CardContent, CardHeader, CardTitle } from '@repo/ui';
import { fetchWorkflowInbox } from '../../lib/workflows-api';

const STATUS_FA: Record<string, string> = {
  Running: 'در انتظار تأیید',
  Approved: 'تأیید‌شده',
  Rejected: 'رد شده',
  Escalated: 'ارجاع',
  Canceled: 'لغو',
};

export function WorkflowsMyTasksClient() {
  const [rows, setRows] = useState<
    Array<{ id: string; entityType: string; entityId: string; status: string; currentStepOrder: number }>
  >([]);
  const [source, setSource] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await fetchWorkflowInbox();
        if (cancelled) return;
        setRows(data.instances.filter((i) => i.status === 'Running'));
        setSource(data.source);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'خطا در بارگذاری inbox');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Card className="rounded-xl border shadow-sm">
      <CardHeader className="py-3">
        <CardTitle className="text-base">کارتابل تأیید من</CardTitle>
        {source ? <p className="text-[11px] text-muted-foreground font-normal">منبع: {source}</p> : null}
        {error ? <p className="text-xs text-amber-600">{error} — API روی 3000 را چک کنید.</p> : null}
      </CardHeader>
      <CardContent className="overflow-x-auto px-0 pb-0">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b bg-muted/50 text-muted-foreground">
              <th className="py-2 px-3 text-right">پرونده</th>
              <th className="py-2 px-3 text-right">موجودیت</th>
              <th className="py-2 px-3 text-right">شناسه</th>
              <th className="py-2 px-3 text-right">گام</th>
              <th className="py-2 px-3 text-right">وضعیت</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b border-dashed hover:bg-muted/30">
                <td className="py-2 px-3 font-mono">
                  <Link href={`/workflows/instances/${encodeURIComponent(r.id)}`} className="hover:text-primary">
                    {r.id.slice(0, 8)}…
                  </Link>
                </td>
                <td className="py-2 px-3">{r.entityType}</td>
                <td className="py-2 px-3 font-mono">{r.entityId}</td>
                <td className="py-2 px-3 tabular-nums">{r.currentStepOrder}</td>
                <td className="py-2 px-3">
                  <Badge variant="secondary">{STATUS_FA[r.status] ?? r.status}</Badge>
                </td>
              </tr>
            ))}
            {!rows.length && !error ? (
              <tr>
                <td colSpan={5} className="py-6 px-3 text-center text-muted-foreground">
                  مورد Running نیست — با ایجاد PR/تعدیل بالای آستانه پرونده ساخته می‌شود.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
