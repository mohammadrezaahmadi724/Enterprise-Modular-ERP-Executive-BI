'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Badge, Button, Card, CardContent } from '@repo/ui';
import { SakhtarModuleAssistant, SakhtarModuleKpi } from '@repo/ui';
import { FolderKanban, ListTodo } from 'lucide-react';
import { DEMO_PROJECTS, PROJECTS_HUB_KPIS } from '../../lib/projects-demo';
import { fetchProjectsOverview, type ProjectApi, type TaskApi } from '../../lib/projects-api';

export function ProjectsHubOverviewClient() {
  const [kpis, setKpis] = useState(PROJECTS_HUB_KPIS);
  const [projects, setProjects] = useState<ProjectApi[]>(DEMO_PROJECTS);
  const [overdueTasks, setOverdueTasks] = useState<TaskApi[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await fetchProjectsOverview();
        if (cancelled) return;
        setKpis(data.kpis);
        if (data.projectsPreview?.length) setProjects(data.projectsPreview);
        setOverdueTasks(data.overdueTasksPreview ?? []);
      } catch {
        /* demo */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const nf = new Intl.NumberFormat('fa-IR');

  return (
    <div className="space-y-4">
      <SakhtarModuleAssistant
        title="پروژه‌یار"
        description="هشدار کار معوق، بودجه و تأمین — موتور قواعد فعال"
        active
        ctaHref="/projects/projects"
        ctaLabel="+ پروژه جدید"
      />

      <section className="smh-kpi-grid">
        <SakhtarModuleKpi
          variant="primary"
          label="پروژهٔ فعال"
          value={nf.format(kpis.activeProjects)}
          sub={`${nf.format(kpis.nearingDeadlineCount)} نزدیک سررسید`}
        />
        <SakhtarModuleKpi
          label="کار باز"
          value={nf.format(kpis.openTasks)}
          sub={`${nf.format(kpis.overdueTasks)} عقب‌افتاده`}
        />
        <SakhtarModuleKpi label="کار امروز" value={nf.format(kpis.todayTasksInbox)} sub="کارتابل من" />
      </section>

      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" asChild>
          <Link href="/projects/tasks">کار جدید</Link>
        </Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <PreviewCard
          icon={<FolderKanban className="size-4" />}
          title="پروژه‌ها"
          actionHref="/projects/projects"
          actionLabel="همه پروژه‌ها"
        >
          <table className="w-full text-xs">
            <thead>
              <tr className="text-muted-foreground border-b">
                <th className="py-2 text-right font-medium">پروژه</th>
                <th className="py-2 text-right">سررسید</th>
                <th className="py-2 text-right">وضعیت</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p.code} className="border-b border-dashed hover:bg-muted/30">
                  <td className="py-2">
                    <Link href={`/projects/projects/${encodeURIComponent(p.code)}`} className="hover:text-primary">
                      {p.name}
                    </Link>
                    <p className="font-mono text-[10px] text-muted-foreground">{p.code}</p>
                  </td>
                  <td className="py-2 tabular-nums">{p.deadline ?? '—'}</td>
                  <td className="py-2">
                    {p.delayDays != null && p.delayDays > 0 ? (
                      <Badge variant="secondary" className="bg-rose-100 text-rose-800 font-normal">
                        {p.delayDays.toLocaleString('fa-IR')} روز تأخیر
                      </Badge>
                    ) : (
                      <Badge variant="secondary">فعال</Badge>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </PreviewCard>

        <PreviewCard
          icon={<ListTodo className="size-4" />}
          title="کارهای عقب‌افتاده"
          actionHref="/projects/tasks"
          actionLabel="همه کارها"
        >
          <ul className="text-xs space-y-2">
            {(overdueTasks.length ? overdueTasks : []).map((t) => (
                <li key={t.number} className="flex justify-between gap-2 border-b border-dashed pb-2">
                  <Link
                    href={`/projects/tasks?task=${encodeURIComponent(t.number)}`}
                    className="flex-1 min-w-0 hover:text-primary"
                  >
                    <p className="font-medium">{t.title}</p>
                    <p className="text-muted-foreground font-mono text-[11px]">{t.projectCode ?? '—'}</p>
                  </Link>
                  <Badge variant="secondary" className="bg-rose-100 text-rose-800 shrink-0">
                    معوق
                  </Badge>
                </li>
              ))}
            {!overdueTasks.length ? <li className="text-xs text-muted-foreground">کار معوقی در پیش‌نمایش نیست.</li> : null}
          </ul>
        </PreviewCard>
      </div>
    </div>
  );
}

function PreviewCard({
  icon,
  title,
  children,
  actionHref,
  actionLabel,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  actionHref: string;
  actionLabel: string;
}) {
  return (
    <Card className="overflow-hidden">
      <PreviewHdr icon={icon} title={title} actionHref={actionHref} actionLabel={actionLabel} />
      <CardContent className="px-0 pb-0 overflow-x-auto">{children}</CardContent>
    </Card>
  );
}

function PreviewHdr({
  icon,
  title,
  actionHref,
  actionLabel,
}: {
  icon: React.ReactNode;
  title: string;
  actionHref: string;
  actionLabel: string;
}) {
  return (
    <div className="flex items-center justify-between border-b px-4 py-3 bg-sky-50/60 dark:bg-sky-950/30">
      <p className="font-semibold text-sm flex items-center gap-2">
        {icon}
        {title}
      </p>
      <Link href={actionHref} className="text-xs text-primary">
        {actionLabel}
      </Link>
    </div>
  );
}
