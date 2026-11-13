'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Badge, Button, Card, CardContent } from '@repo/ui';
import { cn } from '@repo/ui';
import { AlertTriangle, Bot, Info, ShieldAlert } from 'lucide-react';
import { fetchProjectsAssistant, type AssistantInsightApi } from '../../lib/projects-api';

const SEVERITY_STYLES = {
  info: 'border-sky-200 bg-sky-50/60',
  warning: 'border-amber-200 bg-amber-50/50',
  critical: 'border-rose-300 bg-rose-50/50',
} as const;

export function ProjectsAssistantScreen() {
  const [insights, setInsights] = useState<AssistantInsightApi[]>([]);
  const [generatedAt, setGeneratedAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { assistant } = await fetchProjectsAssistant();
        if (cancelled) return;
        setInsights(assistant.insights);
        setGeneratedAt(assistant.generatedAt);
      } catch {
        if (!cancelled) setInsights([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="space-y-4">
      <Card className="border-sky-200 bg-sky-50/50">
        <CardContent className="py-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <span className="grid size-12 place-items-center rounded-full bg-sky-100">
              <Bot className="size-6 text-sky-800" />
            </span>
            <div className="text-right">
              <h1 className="text-lg font-bold flex items-center gap-2">
                پروژه‌یار
                <Badge className="bg-emerald-100 text-emerald-800">فعال — موتور قواعد</Badge>
              </h1>
              <p className="text-xs text-muted-foreground mt-1">
                اولویت‌بندی بر اساس کار معوق، تأخیر پروژه، بودجه و تعهدات تأمین — بدون دسترسی مستقیم به OLTP مالی.
              </p>
              {generatedAt ? (
                <p className="text-[10px] text-muted-foreground mt-1">آخرین تحلیل: {new Date(generatedAt).toLocaleString('fa-IR')}</p>
              ) : null}
            </div>
          </div>
          <Button variant="outline" asChild>
            <Link href="/projects">بازگشت به نمای کلی</Link>
          </Button>
        </CardContent>
      </Card>

      {loading ? <p className="text-sm text-muted-foreground">در حال محاسبه بینش‌ها…</p> : null}

      <ul className="space-y-2">
        {insights.map((item) => (
          <li key={item.id}>
            <Card className={cn('transition-shadow hover:shadow-sm', SEVERITY_STYLES[item.severity])}>
              <CardContent className="py-3 flex flex-wrap items-start gap-3 justify-between">
                <div className="flex gap-2 min-w-0">
                  <SeverityIcon severity={item.severity} />
                  <div>
                    <p className="font-semibold text-sm">{item.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.body}</p>
                  </div>
                </div>
                {item.href ? (
                  <Button size="sm" variant="outline" asChild className="shrink-0">
                    <Link href={item.href}>اقدام</Link>
                  </Button>
                ) : null}
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SeverityIcon({ severity }: { severity: AssistantInsightApi['severity'] }) {
  if (severity === 'critical') return <ShieldAlert className="size-5 text-rose-700 shrink-0" />;
  if (severity === 'warning') return <AlertTriangle className="size-5 text-amber-700 shrink-0" />;
  return <Info className="size-5 text-sky-700 shrink-0" />;
}
