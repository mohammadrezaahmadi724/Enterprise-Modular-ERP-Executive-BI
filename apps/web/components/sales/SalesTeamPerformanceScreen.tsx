'use client';

import { Badge, Card, CardContent, CardHeader, CardTitle } from '@repo/ui';
import { TEAM_MEMBERS, TEAM_MONTH_TOMAN, TEAM_TARGET_PCT, formatToman } from '../../lib/sales-team-demo';

export function SalesTeamPerformanceScreen() {
  const maxSales = TEAM_MEMBERS[0]?.salesToman ?? 1;

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-muted-foreground">
        عملکرد تیم — شاخص از projection فروش (metric_snapshots)؛ بدون تجمیع مستقیم روی جداول OLTP.
      </p>
      <section className="grid gap-3 sm:grid-cols-3">
        <Kpi label="فروش کل تیم (ماه)" value={`${formatToman(TEAM_MONTH_TOMAN)} تومان`} />
        <Kpi label="تحقق هدف تیم" value={`${TEAM_TARGET_PCT}٪`} />
        <Kpi label="اعضای فعال" value={String(TEAM_MEMBERS.length)} />
      </section>
      <Card className="finance-aging-card">
        <CardHeader>
          <CardTitle className="text-base">رتبه‌بندی فروشندگان</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {TEAM_MEMBERS.map((m) => (
            <div key={m.name} className="space-y-1.5">
              <div className="flex justify-between text-sm">
                <span className="font-medium">
                  {m.rank}. {m.name}
                </span>
                <span className="tabular-nums text-muted-foreground">{formatToman(m.salesToman)} تومان</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-violet-600 rounded-full" style={{ width: `${(m.salesToman / maxSales) * 100}%` }} />
              </div>
              <p className="text-xs text-muted-foreground flex gap-2">
                <span>نرخ بستن {m.winRatePct}٪</span>
                <span>·</span>
                <span>{m.quoteCount} پیش‌فاکتور</span>
                {m.rank === 1 ? (
                  <Badge className="bg-amber-500 hover:bg-amber-500 mr-1">برتر</Badge>
                ) : null}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function Kpi({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border bg-card px-4 py-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-base font-bold mt-0.5 tabular-nums">{value}</p>
    </div>
  );
}
