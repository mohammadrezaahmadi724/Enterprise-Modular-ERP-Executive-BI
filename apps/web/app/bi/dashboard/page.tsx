import Link from 'next/link';
import { Button, PageHeader } from '@repo/ui';
import { ExecutiveKpiWall } from '../../../components/executive-kpi-wall';
import { BiDashboardGrid } from '../../../components/bi-dashboard-grid';

export default function BiDashboardPage() {
  return (
    <Box className="space-y-8">
      <PageHeader
        title="داشبورد مدیریتی"
        description="KPI مدیرعامل و داده زنده از projection / metric_snapshots"
        action={
          <Button asChild variant="outline">
            <Link href="/bi/risk-radar">رادار ریسک</Link>
          </Button>
        }
      />
      <ExecutiveKpiWall />
      <Box>
        <p className="mb-3 text-sm font-medium text-muted-foreground">پنل قابل تنظیم (API)</p>
        <BiDashboardGrid />
      </Box>
    </Box>
  );
}

function Box(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={props.className}>{props.children}</div>;
}
