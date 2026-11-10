import Link from 'next/link';
import { Button, Card, CardContent, CardHeader, CardTitle, PageHeader } from '@repo/ui';
import { ExecutiveKpiWall } from '../../components/executive-kpi-wall';
import { DashboardModuleShortcuts } from '../../components/dashboard-module-shortcuts';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="داشبورد"
        description="نمای مدیرعامل — داده از projection و metric_snapshots"
        action={
          <Button asChild variant="outline">
            <Link href="/bi/risk-radar">رادار ریسک</Link>
          </Button>
        }
      />
      <ExecutiveKpiWall />
      <DashboardModuleShortcuts />
      <Card>
        <CardHeader>
          <CardTitle>فعالیت اخیر</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            برای جزئیات هر حوزه از منوی ماژول‌ها (مالی، فروش، …) استفاده کنید. KPIهای سفارشی در{' '}
            <Link href="/bi/dashboard" className="text-primary hover:underline">
              داشبورد BI
            </Link>{' '}
            قابل چیدمان است.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
