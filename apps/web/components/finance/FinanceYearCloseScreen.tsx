'use client';

import Link from 'next/link';
import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from '@repo/ui';
import { cn } from '@repo/ui';
import { AlertTriangle, CheckCircle2, Circle, Lock, ScrollText } from 'lucide-react';
import {
  CLOSE_PROGRESS,
  FISCAL_YEAR_LABEL,
  YEAR_CLOSE_TASKS,
} from '../../lib/finance-year-close-demo';

export function FinanceYearCloseScreen() {
  const pct = Math.round((CLOSE_PROGRESS.done / CLOSE_PROGRESS.total) * 100);
  const blockingOpen = YEAR_CLOSE_TASKS.filter((t) => t.blocking && !t.done).length;

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-muted-foreground">
        بستن سال مالی — پس از قفل دوره، ثبت یا ویرایش اسناد ممنوع است (Period Lock). سند اختتامیه فقط یک‌بار و با تأیید
        مدیر مالی صادر می‌شود؛ اصلاح خطا با سند معکوس در سال باز بعدی.
      </p>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="finance-aging-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">چک‌لیست اختتامیه سال {FISCAL_YEAR_LABEL}</CardTitle>
            <p className="text-xs text-muted-foreground">
              {CLOSE_PROGRESS.done} از {CLOSE_PROGRESS.total} مورد · پیشرفت {pct}٪
            </p>
            <div className="h-2 rounded-full bg-muted mt-2 overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${pct}%` }} />
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {YEAR_CLOSE_TASKS.map((t) => (
              <div
                key={t.id}
                className={cn(
                  'flex flex-wrap items-start justify-between gap-2 rounded-lg border px-3 py-2.5 text-sm',
                  t.done && 'bg-emerald-500/5 border-emerald-500/30',
                  !t.done && t.blocking && 'border-amber-500/40 bg-amber-500/5',
                )}
              >
                <div className="flex gap-2 min-w-0">
                  {t.done ? (
                    <CheckCircle2 className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <Circle className="size-4 text-muted-foreground shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className="font-medium">{t.title}</p>
                    <p className="text-xs text-muted-foreground">{t.description}</p>
                  </div>
                </div>
                <div className="flex gap-1 shrink-0">
                  {t.blocking && !t.done ? (
                    <Badge className="bg-amber-500 hover:bg-amber-500">مسدودکننده</Badge>
                  ) : null}
                  <Badge variant={t.done ? 'default' : 'secondary'}>{t.done ? 'انجام شد' : 'باز'}</Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <AlertTriangle className="size-4 text-amber-600" />
                وضعیت آمادگی
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-3">
              <p>
                {blockingOpen > 0 ? (
                  <span className="text-amber-800 dark:text-amber-200">
                    {blockingOpen} مورد مسدودکننده هنوز باز است — صدور سند اختتامیه مجاز نیست.
                  </span>
                ) : (
                  <span className="text-emerald-700 dark:text-emerald-300">همه پیش‌نیازهای مسدودکننده تکمیل شده‌اند.</span>
                )}
              </p>
              <Button className="w-full" disabled={blockingOpen > 0}>
                <ScrollText className="size-4 ml-1" />
                پیش‌نمایش سند اختتامیه
              </Button>
              <Button variant="outline" className="w-full border-destructive text-destructive" disabled>
                <Lock className="size-4 ml-1" />
                قفل سال {FISCAL_YEAR_LABEL}
              </Button>
              <p className="text-[11px] text-muted-foreground">قفل سال نیازمند تأیید workflow و ثبت audit است.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">ارتباط با دوره‌ها</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <p className="text-muted-foreground mb-3">قبل از اختتامیه، همه ماه‌های سال باید بسته شوند.</p>
              <Button variant="outline" size="sm" asChild className="w-full">
                <Link href="/finance/periods">مدیریت دوره‌های ماهانه</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
