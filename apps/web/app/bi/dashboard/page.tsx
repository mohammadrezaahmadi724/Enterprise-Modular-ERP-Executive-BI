import { ExecutiveKpiWall } from '../../../components/executive-kpi-wall';
import { BiDashboardGrid } from '../../../components/bi-dashboard-grid';

export default function BiDashboardPage() {
  return (
    <Box className="space-y-8">
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
