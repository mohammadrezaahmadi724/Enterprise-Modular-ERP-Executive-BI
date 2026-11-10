'use client';

import { AreaChart, Card, Metric, Text } from '@tremor/react';

const chartdata = [
  { تاریخ: '۱', ورود: 120, خروج: 80 },
  { تاریخ: '۲', ورود: 150, خروج: 90 },
  { تاریخ: '۳', ورود: 180, خروج: 110 },
  { تاریخ: '۴', ورود: 140, خروج: 130 },
  { تاریخ: '۵', ورود: 200, خروج: 95 },
];

export function TreasuryDashboardCharts() {
  const fmt = new Intl.NumberFormat('fa-IR');
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <Card>
          <Text>ورود نقد (میلیون ریال)</Text>
          <Metric>{fmt.format(12_500_000)}</Metric>
        </Card>
        <Card>
          <Text>خروج نقد</Text>
          <Metric>{fmt.format(8_200_000)}</Metric>
        </Card>
        <Card>
          <Text>مانده خالص</Text>
          <Metric>{fmt.format(4_300_000)}</Metric>
        </Card>
      </div>
      <Card>
        <Text>جریان نقد ۵ روز اخیر</Text>
        <AreaChart
          className="mt-4 h-56"
          data={chartdata}
          index="تاریخ"
          categories={['ورود', 'خروج']}
          colors={['emerald', 'rose']}
          valueFormatter={(v) => fmt.format(v * 1_000_000)}
        />
      </Card>
    </div>
  );
}
