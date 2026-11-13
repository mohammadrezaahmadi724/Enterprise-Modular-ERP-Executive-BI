'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Badge, Button, Card, CardContent } from '@repo/ui';
import { ClipboardList } from 'lucide-react';
import { fetchProjectContext, type ProjectContextApi } from '../../lib/projects-api';
import { formatToman } from '../../lib/finance-receivables-demo';
import { ProjectsQuickPrDialog } from './ProjectsQuickPrDialog';
import { ProjectsProcurementNextSteps } from './ProjectsProcurementNextSteps';
import { ProjectsTaskDetailSheet } from './ProjectsTaskDetailSheet';
import type { TaskApi } from '../../lib/projects-api';

export function ProjectsContextScreen({ projectCode, openQuickPr }: { projectCode: string; openQuickPr?: boolean }) {
  const [ctx, setCtx] = useState<ProjectContextApi | null>(null);
  const [prDialogOpen, setPrDialogOpen] = useState(false);
  const [detailTask, setDetailTask] = useState<TaskApi | null>(null);

  const load = async () => {
    try {
      const { context } = await fetchProjectContext(projectCode);
      setCtx(context);
    } catch {
      /* */
    }
  };

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      await load();
      if (cancelled) return;
    })();
    return () => {
      cancelled = true;
    };
  }, [projectCode]);

  useEffect(() => {
    if (openQuickPr && ctx) setPrDialogOpen(true);
  }, [openQuickPr, ctx]);

  if (!ctx) return <p className="text-sm text-muted-foreground">بارگذاری زمینه پروژه…</p>;

  return (
    <div className="space-y-4">
      <p className="text-xs text-muted-foreground">
        <Link href="/projects/projects" className="text-primary">
          پروژه‌ها
        </Link>
        {' / '}
        <span className="font-mono">{ctx.project.code}</span>
      </p>
      <Card>
        <CardContent className="pt-4">
          <h1 className="text-lg font-bold">{ctx.project.name}</h1>
          <p className="text-xs text-muted-foreground mt-1">
            سررسید {ctx.project.deadline ?? '—'}
            {ctx.project.delayDays ? (
              <Badge className="mr-2 bg-rose-100 text-rose-800">{ctx.project.delayDays} روز تأخیر</Badge>
            ) : null}
          </p>
          <Button type="button" size="sm" className="mt-3 bg-rose-800" onClick={() => setPrDialogOpen(true)}>
            <ClipboardList className="size-4 ml-1" />
            درخواست خرید برای این پروژه
          </Button>
        </CardContent>
      </Card>
      {ctx ? (
        <ProjectsQuickPrDialog
          open={prDialogOpen}
          ctx={ctx}
          onClose={() => setPrDialogOpen(false)}
          onCreated={() => void load()}
        />
      ) : null}

      <ProjectsProcurementNextSteps ctx={ctx} projectCode={projectCode} onRefresh={() => void load()} />

      {ctx.team.length ? (
        <Card>
          <CardContent className="pt-4">
            <h2 className="font-semibold text-sm mb-2">اعضای تیم پروژه</h2>
            <ul className="text-xs space-y-2">
              {ctx.team.map((m) => (
                <li key={m.name} className="flex items-center justify-between gap-2 border-b border-dashed pb-1">
                  <span className="font-medium">
                    {m.initials ? (
                      <span className="inline-flex size-6 items-center justify-center rounded-full bg-muted text-[10px] ml-2">
                        {m.initials}
                      </span>
                    ) : null}
                    {m.name}
                  </span>
                  <span className="text-muted-foreground">{m.role}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ) : null}

      <Card>
        <CardContent className="pt-4 space-y-2">
          <h2 className="font-semibold text-sm">بودجه و مرکز هزینه (پل مالی)</h2>
          <div className="flex flex-wrap gap-4 text-xs">
            <span>
              مرکز هزینه: <strong className="font-mono">{ctx.finance.costCenterCode ?? '—'}</strong>
              {ctx.finance.costCenterName ? ` (${ctx.finance.costCenterName})` : ''}
            </span>
            <span>بودجه: {formatToman(ctx.finance.budgetToman)}</span>
            <span>مصرف: {formatToman(ctx.finance.spentToman)}</span>
            <span>پیشرفت: {ctx.finance.progressPct}٪</span>
            <Badge variant={ctx.finance.budgetUtilizationPct >= 88 ? 'destructive' : 'secondary'}>
              مصرف بودجه {ctx.finance.budgetUtilizationPct}٪
            </Badge>
          </div>
          <Link href={ctx.finance.detailHref} className="text-xs text-primary">
            جزئیات در مراکز هزینه و پروژه‌ها
          </Link>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardContent className="pt-4">
            <h2 className="font-semibold text-sm mb-2">کارهای این پروژه</h2>
            <ul className="text-xs space-y-2">
              {ctx.tasks.slice(0, 8).map((t) => (
                <li key={t.number} className="border-b border-dashed pb-1">
                  <button
                    type="button"
                    className="text-right w-full hover:text-primary text-xs"
                    onClick={() => setDetailTask(t)}
                  >
                    <span className="font-mono text-muted-foreground">{t.number}</span> — {t.title}
                  </button>
                </li>
              ))}
            </ul>
            <Link href="/projects/tasks" className="text-primary text-xs mt-2 inline-block">
              همه کارها
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4 space-y-3">
            <h2 className="font-semibold text-sm">پل به تأمین (بدون دسترسی مستقیم به جداول)</h2>
            <Section title="درخواست‌های خرید" empty="درخواستی با این پروژه ثبت نشده">
              {ctx.procurement.purchaseRequests.map((pr) => (
                <li key={pr.number}>
                  <Link
                    href={`/procurement/purchase-requests?project=${encodeURIComponent(projectCode)}`}
                    className="text-primary font-mono"
                  >
                    {pr.number}
                  </Link>{' '}
                  — {pr.title.slice(0, 40)} ({formatToman(pr.estimatedToman)})
                </li>
              ))}
            </Section>
            <Section title="سفارش‌های خرید" empty="سفارشی با این پروژه ثبت نشده">
              {ctx.procurement.purchaseOrders.map((po) => (
                <li key={po.number}>
                  <Link
                    href={`/procurement/purchase-orders?project=${encodeURIComponent(projectCode)}`}
                    className="text-primary font-mono"
                  >
                    {po.number}
                  </Link>{' '}
                  — {po.supplierName} ({formatToman(po.totalToman)})
                  {po.status === 'full_receipt' ? (
                    <Badge className="mr-1 text-[10px] bg-emerald-100 text-emerald-800">تحویل کامل</Badge>
                  ) : po.status === 'partial_receipt' ? (
                    <Badge className="mr-1 text-[10px] bg-amber-100 text-amber-900">تحویل جزئی</Badge>
                  ) : null}
                </li>
              ))}
            </Section>
            <Link href={ctx.links.procurementHub} className="text-xs text-primary">
              نمای کلی خرید و تأمین
            </Link>
            <Link href={ctx.links.financeCostCenters} className="text-xs text-primary block">
              مراکز هزینه و پروژه (مالی)
            </Link>
          </CardContent>
        </Card>
      </div>

      <ProjectsTaskDetailSheet
        task={detailTask}
        onClose={() => setDetailTask(null)}
        onUpdated={(t) => {
          setDetailTask(t);
          void load();
        }}
      />
    </div>
  );
}

function Section({ title, children, empty }: { title: string; children: React.ReactNode; empty: string }) {
  const items = Array.isArray(children) ? children : [children];
  const has = items.some((c) => c);
  return (
    <div>
      <p className="text-xs font-medium text-muted-foreground mb-1">{title}</p>
      {has ? <ul className="text-xs space-y-1 list-none pr-0">{children}</ul> : <p className="text-xs text-muted-foreground">{empty}</p>}
    </div>
  );
}
