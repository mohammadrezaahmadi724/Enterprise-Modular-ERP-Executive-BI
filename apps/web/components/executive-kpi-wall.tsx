import { KPICard, PageHeader } from '@repo/ui';

const EXEC_KPIS = [
  {
    title: 'فروش ماه جاری',
    tag: 'SALES',
    value: '۴۲٫۸B',
    delta: '▾ ۱۸٪',
    deltaLabel: 'ماه قبل',
    status: 'نیازمند توجه',
    statusTone: 'danger' as const,
  },
  {
    title: 'جریان نقد',
    tag: 'FIN',
    value: '۸٫۲B',
    delta: '▾ ۹٪',
    deltaLabel: 'ماه قبل',
    status: 'در محدوده هشدار',
    statusTone: 'warn' as const,
  },
  {
    title: 'مطالبات معوق',
    tag: 'AR',
    value: '۶٫۱B',
    delta: '▴ ۲۲٪',
    deltaLabel: 'ماه قبل',
    status: 'رو به افزایش',
    statusTone: 'warn' as const,
  },
  {
    title: 'گردش موجودی',
    tag: 'INV',
    value: '۲٫۴×',
    delta: '— ثابت',
    deltaLabel: 'ماه قبل',
    status: 'پایدار',
    statusTone: 'ok' as const,
  },
  {
    title: 'سفارش‌های باز',
    tag: 'ORD',
    value: '۲۱۴',
    delta: '▴ ۶٪',
    deltaLabel: 'ماه قبل',
    status: 'روند مثبت',
    statusTone: 'ok' as const,
  },
  {
    title: 'عملکرد تیم فروش',
    tag: 'HR',
    value: '۷۴٪',
    delta: '▾ ۴٪',
    deltaLabel: 'ماه قبل',
    status: 'زیر هدف',
    statusTone: 'danger' as const,
  },
];

export function ExecutiveKpiWall() {
  return (
    <section className="space-y-4">
      <PageHeader
        title="شاخص‌های کلیدی"
        description="نمونه KPI تصمیم‌گیری مدیرعامل؛ هر کارت به projection ماژول مربوط متصل می‌شود. مقادیر واقعی در جلسه تحلیلی تعریف می‌گردند."
        className="mb-4"
      />
      <Box className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {EXEC_KPIS.map((k) => (
          <KPICard key={k.tag} {...k} />
        ))}
      </Box>
    </section>
  );
}

function Box(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} />;
}
