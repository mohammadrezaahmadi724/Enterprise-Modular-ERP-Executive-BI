'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@repo/ui';
import { SakhtarModuleAssistant, SakhtarModuleKpi } from '@repo/ui';
import { Users } from 'lucide-react';
import { fetchHrEmployees } from '../../lib/hr-api';

export function HrHubOverviewClient() {
  const [headcount, setHeadcount] = useState<number | null>(null);
  const nf = new Intl.NumberFormat('fa-IR');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const rows = await fetchHrEmployees();
        if (!cancelled) setHeadcount(rows.length);
      } catch {
        if (!cancelled) setHeadcount(null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <SakhtarModuleAssistant
        title="منابع‌انسانی‌یار"
        description="حضور، مرخصی و دوره حقوق را خلاصه می‌کند — داده حساس با audit کامل."
        upsell="پای‌اسلیپ الکترونیک و تایید چندمرحله‌ای در پلن سازمانی."
      />

      <section className="smh-kpi-grid">
        <SakhtarModuleKpi
          variant="primary"
          label="پرسنل فعال"
          value={headcount == null ? '—' : nf.format(headcount)}
          sub="از API کارکنان"
        />
        <SakhtarModuleKpi label="مرخصی امروز" value="—" sub="فهرست مرخصی" />
        <SakhtarModuleKpi label="درخواست مرخصی" value="—" sub="فهرست مرخصی" />
        <SakhtarModuleKpi label="اجرای حقوق معوق" value="—" sub="بدون Post خودکار GL" />
      </section>

      <Card className="rounded-xl border shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between py-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Users className="size-4" />
            میان‌برها
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/hr/employees">پرونده کارکنان</Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href="/hr/attendance">حضور و غیاب</Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href="/hr/leave-requests">مرخصی</Link>
          </Button>
          <Button className="bg-rose-800 hover:bg-rose-900" size="sm" asChild>
            <Link href="/hr/payroll/run">اجرای حقوق</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
