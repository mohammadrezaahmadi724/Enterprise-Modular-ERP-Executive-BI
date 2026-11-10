'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Badge, Button, PageHeader } from '@repo/ui';
import { RiskRadarBoard } from '../../../components/risk-radar-board';

type Finding = {
  ruleCode: string;
  severity: string;
  trend: string;
  sourceModule: string;
  suggestionFa: string;
};

export default function RiskRadarPage() {
  const [findings, setFindings] = useState<Finding[]>([]);

  useEffect(() => {
    void fetch('/api/bi/risk')
      .then((r) => r.json())
      .then((d: { findings: Finding[] }) => setFindings(d.findings ?? []))
      .catch(() => setFindings([]));
  }, []);

  return (
    <Box className="space-y-8">
      <PageHeader
        title="رادار ریسک"
        description="هشدارهای هوشمند بین‌ماژولی — نمونه مدیریتی + رویدادهای API"
        action={
          <Button asChild variant="outline">
            <Link href="/bi/dashboard">بازگشت به KPI</Link>
          </Button>
        }
      />
      <RiskRadarBoard />
      {findings.length > 0 && (
        <Box>
          <h2 className="mb-3 text-sm font-semibold text-muted-foreground">رویدادهای زنده API</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {findings.map((f) => (
              <article key={f.ruleCode} className="rounded-lg border bg-card p-4 shadow-sm">
                <div className="flex items-center gap-2 text-xs">
                  <ApiSeverityBadge severity={f.severity} />
                  <span>{f.sourceModule}</span>
                  <span aria-hidden>{f.trend === 'up' ? '↑' : '→'}</span>
                </div>
                <h3 className="mt-2 font-semibold">{f.ruleCode}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{f.suggestionFa}</p>
              </article>
            ))}
          </div>
        </Box>
      )}
    </Box>
  );
}

function ApiSeverityBadge({ severity }: { severity: string }) {
  const variant = severity === 'critical' ? 'warning' : severity === 'warning' ? 'default' : 'success';
  return <Badge variant={variant}>{severity}</Badge>;
}

function Box(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={props.className}>{props.children}</div>;
}
