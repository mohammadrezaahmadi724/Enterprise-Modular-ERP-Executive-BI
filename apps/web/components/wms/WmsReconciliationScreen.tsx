'use client';

import { useEffect, useState } from 'react';
import { Button, Card, CardContent } from '@repo/ui';
import { Plus, Shield } from 'lucide-react';
import { fetchWmsReconciliations, runWmsReconciliation } from '../../lib/wms-api';

const AUDIT_TEXT =
  'این مرکز مغایرت‌های میان سه لایهٔ کلیدی را ممیزی می‌کند: ۱. تطبیق ریاضی سرجمع گردش کاردکس با مانده موجودی در انبار ۲. تطبیق سریال‌های ثبت‌شده و قابل‌فروش با موجودی فیزیکی ۳. تطبیق ارزش ریالی انبار (میانگین موزون متحرک) با سرفصل دارایی در دفتر کل';

export function WmsReconciliationScreen() {
  const [sessions, setSessions] = useState<Array<{ id: string; runAt: string }>>([]);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function reload() {
    try {
      const { sessions: list } = await fetchWmsReconciliations();
      setSessions(list);
    } catch {
      setSessions([]);
    }
  }

  useEffect(() => {
    void reload();
  }, []);

  async function handleRun() {
    setRunning(true);
    setError(null);
    try {
      await runWmsReconciliation();
      await reload();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'خطا');
    } finally {
      setRunning(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="max-w-2xl">
          <h2 className="text-lg font-bold">مرکز تطبیق و مغایرت‌گیری انبار</h2>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{AUDIT_TEXT}</p>
        </div>
        <Button className="bg-rose-700 hover:bg-rose-800 shrink-0" disabled={running} onClick={() => void handleRun()}>
          <Plus className="size-4 ml-1" />
          {running ? 'در حال اجرا…' : 'اجرای فرایند مغایرت‌گیری'}
        </Button>
      </div>
      {error ? <p className="text-xs text-amber-600">{error}</p> : null}

      {sessions.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="py-16 flex flex-col items-center text-center gap-4">
            <Shield className="size-12 text-muted-foreground/40" />
            <p className="font-semibold">هنوز هیچ جلسهٔ مغایرت‌گیری ثبت نشده است</p>
            <p className="text-sm text-muted-foreground max-w-md">
              برای تطبیق اسناد کاردکس، سریال‌ها و انطباق ریالی با دفتر کل، مغایرت‌گیری را اجرا کنید.
            </p>
            <Button size="lg" className="bg-rose-700 hover:bg-rose-800 rounded-full px-8" disabled={running} onClick={() => void handleRun()}>
              اجرای اولین مغایرت‌گیری
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="pt-4 space-y-2 text-sm">
            <p className="font-semibold">جلسات اخیر</p>
            {sessions.map((s) => (
              <div key={s.id} className="flex justify-between border-b border-dashed py-2 font-mono text-xs">
                <span>{s.id}</span>
                <span className="text-muted-foreground">{new Date(s.runAt).toLocaleString('fa-IR')}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
