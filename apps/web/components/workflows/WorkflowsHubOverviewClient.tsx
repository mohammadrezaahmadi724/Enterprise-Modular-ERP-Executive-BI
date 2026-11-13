'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from '@repo/ui';
import { SakhtarModuleAssistant, SakhtarModuleKpi } from '@repo/ui';
import { ListChecks } from 'lucide-react';
import { fetchWorkflowInbox } from '../../lib/workflows-api';

const DEMO = { pending: 4, approved: 28, rejected: 2, escalated: 1 };

export function WorkflowsHubOverviewClient() {
  const nf = new Intl.NumberFormat('fa-IR');
  const [kpis, setKpis] = useState(DEMO);
  const [preview, setPreview] = useState<
    Array<{ id: string; entityType: string; entityId: string; status: string }>
  >([]);
  const [source, setSource] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await fetchWorkflowInbox();
        if (cancelled) return;
        setKpis({
          pending: data.summary.pending,
          approved: data.summary.approved,
          rejected: data.summary.rejected,
          escalated: data.summary.escalated,
        });
        setPreview(data.summary.preview ?? []);
        setSource(data.source);
      } catch {
        if (!cancelled) setSource(null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <SakhtarModuleAssistant
        title="تأیید‌یار"
        description="خلاصه گام‌های در انتظار تأیید شما — PR، PO، تعدیل انبار و حقوق."
        active
      />

      <section className="smh-kpi-grid">
        <SakhtarModuleKpi variant="primary" label="در انتظار تأیید" value={nf.format(kpis.pending)} sub="Running" />
        <SakhtarModuleKpi label="تأیید‌شده" value={nf.format(kpis.approved)} />
        <SakhtarModuleKpi label="رد شده" value={nf.format(kpis.rejected)} />
        <SakhtarModuleKpi label="ارجاع" value={nf.format(kpis.escalated)} />
      </section>
      {source ? <p className="text-[11px] text-muted-foreground">منبع: {source}</p> : null}

      <Card className="overflow-hidden rounded-xl border shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between py-3">
          <CardTitle className="text-base flex items-center gap-2">
            <ListChecks className="size-4" />
            نمونه پرونده‌های باز
          </CardTitle>
          <Button variant="outline" size="sm" asChild>
            <Link href="/workflows/my-tasks">کارتابل کامل</Link>
          </Button>
        </CardHeader>
        <CardContent className="space-y-2 text-xs">
          {preview.length ? (
            preview.map((p) => (
              <div key={p.id} className="flex justify-between gap-2 border-b border-dashed pb-2">
                <div>
                  <Link href={`/workflows/instances/${encodeURIComponent(p.id)}`} className="font-mono hover:text-primary">
                    {p.id.slice(0, 8)}…
                  </Link>
                  <p className="text-muted-foreground mt-0.5">
                    {p.entityType} · {p.entityId}
                  </p>
                </div>
                <Badge variant="secondary">{p.status}</Badge>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground">پرونده Running در inbox نیست — پس از ثبت PR/PO با آستانه بالا ظاهر می‌شود.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
