'use client';

import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from '@repo/ui';
import { MessageSquare, Plus } from 'lucide-react';
import { SMS_CAMPAIGNS, SMS_QUOTA } from '../../lib/sales-sms-demo';

export function SalesSmsScreen() {
  const usedPct = Math.round((SMS_QUOTA.used / SMS_QUOTA.monthly) * 100);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">پنل پیامک — کمپین، قالب و لاگ ارسال برای سرنخ و مشتری.</p>
        <Button className="bg-rose-700 hover:bg-rose-800">
          <Plus className="size-4 ml-1" />
          کمپین جدید
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">سهمیه ماه</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm">
            {SMS_QUOTA.used.toLocaleString('fa-IR')} از {SMS_QUOTA.monthly.toLocaleString('fa-IR')} پیامک ({usedPct}٪)
          </p>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div className="h-full bg-rose-600 rounded-full" style={{ width: `${usedPct}%` }} />
          </div>
        </CardContent>
      </Card>

      <Card className="finance-aging-card">
        <CardHeader className="flex flex-row items-center gap-2">
          <MessageSquare className="size-4" />
          <CardTitle className="text-base">کمپین‌ها</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-xs text-muted-foreground">
                <th className="py-2 text-right">شناسه</th>
                <th className="py-2 text-right">نام</th>
                <th className="py-2 text-right">قالب</th>
                <th className="py-2 text-right">ارسال‌شده</th>
                <th className="py-2 text-right">تحویل</th>
                <th className="py-2 text-right">وضعیت</th>
                <th className="py-2 text-right">آخرین اجرا</th>
              </tr>
            </thead>
            <tbody>
              {SMS_CAMPAIGNS.map((c) => (
                <tr key={c.id} className="border-b border-dashed">
                  <td className="py-2 font-mono text-xs">{c.id}</td>
                  <td className="py-2">{c.name}</td>
                  <td className="py-2 text-muted-foreground text-xs">{c.template}</td>
                  <td className="py-2 tabular-nums">{c.sentCount}</td>
                  <td className="py-2 tabular-nums">{c.deliveredPct > 0 ? `${c.deliveredPct}٪` : '—'}</td>
                  <td className="py-2">
                    {c.status === 'done' ? <Badge className="bg-emerald-600 hover:bg-emerald-600">تمام</Badge> : c.status === 'draft' ? <Badge variant="secondary">پیش‌نویس</Badge> : <Badge variant="outline">در حال ارسال</Badge>}
                  </td>
                  <td className="py-2 text-xs text-muted-foreground">{c.lastRun ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
