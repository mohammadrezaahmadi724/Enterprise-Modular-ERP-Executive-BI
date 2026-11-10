'use client';

import { useEffect, useState } from 'react';
import GridLayout, { WidthProvider, type Layout } from 'react-grid-layout';

const ResponsiveGrid = WidthProvider(GridLayout);
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { Card, Metric, Text } from '@tremor/react';

const kpiMeta: Record<string, string> = {
  monthly_sales: 'فروش ماه',
  cash_flow: 'جریان نقد',
  overdue_ar: 'مطالبات معوق',
  inventory_turnover: 'گردش موجودی',
  open_orders: 'سفارش باز',
  sales_team_score: 'عملکرد تیم فروش',
};

export function BiDashboardGrid() {
  const [kpis, setKpis] = useState<Record<string, number>>({});
  const [layout, setLayout] = useState<Layout[]>([]);

  useEffect(() => {
    void fetch('/api/bi/kpis')
      .then((r) => r.json())
      .then((data: { kpis: Record<string, number> }) => {
        setKpis(data.kpis);
        const keys = Object.keys(data.kpis);
        setLayout(
          keys.map((k, i) => ({
            i: k,
            x: (i % 3) * 4,
            y: Math.floor(i / 3) * 2,
            w: 4,
            h: 2,
            minW: 3,
            minH: 2,
          })),
        );
      });
  }, []);

  const fmt = new Intl.NumberFormat('fa-IR');

  return (
    <ResponsiveGrid
      className="layout"
      layout={layout}
      cols={12}
      rowHeight={80}
      onLayoutChange={(l: Layout[]) => setLayout(l)}
      draggableHandle=".drag-handle"
    >
      {layout.map((item) => (
        <Card key={item.i} className="h-full">
          <span className="drag-handle text-xs text-muted-foreground cursor-move">⋮⋮</span>
          <Text>{kpiMeta[item.i] ?? item.i}</Text>
          <Metric>{fmt.format(kpis[item.i] ?? 0)}</Metric>
        </Card>
      ))}
    </ResponsiveGrid>
  );
}
