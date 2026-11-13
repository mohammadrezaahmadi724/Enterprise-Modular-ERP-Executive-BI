type Bucket = { label: string; amount: string; share: number; color: string };

type ApiBucket = { key: string; labelFa: string; amountIrr: number };

const COLORS: Record<string, string> = {
  over90: 'bg-red-500',
  d61_90: 'bg-orange-500',
  d31_60: 'bg-amber-500',
  d1_30: 'bg-sky-500',
  current: 'bg-emerald-500',
};

const ORDER = ['over90', 'd61_90', 'd31_60', 'd1_30', 'current'] as const;

function apiToBuckets(list: ApiBucket[] | undefined, fallback: Bucket[]): Bucket[] {
  if (!list?.length) return fallback;
  const ordered = ORDER.map((key) => list.find((b) => b.key === key)).filter(Boolean) as ApiBucket[];
  const total = ordered.reduce((s, b) => s + b.amountIrr, 0) || 1;
  return ordered.map((b) => ({
    label: b.labelFa,
    amount: new Intl.NumberFormat('fa-IR').format(Math.round(b.amountIrr / 10)),
    share: Math.max(1, Math.round((b.amountIrr / total) * 100)),
    color: COLORS[b.key] ?? 'bg-muted',
  }));
}

const AR_BUCKETS: Bucket[] = [
  { label: 'بیش از ۹۰ روز', amount: '۶۴۲M', share: 37, color: 'bg-red-500' },
  { label: '۶۱–۹۰', amount: '۲۱۰M', share: 12, color: 'bg-orange-500' },
  { label: '۳۱–۶۰', amount: '۳۷۲M', share: 22, color: 'bg-amber-500' },
  { label: '۱–۳۰', amount: '۲۸۶M', share: 17, color: 'bg-sky-500' },
  { label: 'جاری', amount: '۲۱۷M', share: 12, color: 'bg-emerald-500' },
];

const AP_BUCKETS: Bucket[] = [
  { label: 'بیش از ۹۰ روز', amount: '۱٫۵۶B', share: 38, color: 'bg-red-500' },
  { label: '۶۱–۹۰', amount: '۳۷۸M', share: 9, color: 'bg-orange-500' },
  { label: '۳۱–۶۰', amount: '۴۲۸M', share: 10, color: 'bg-amber-500' },
  { label: '۱–۳۰', amount: '۸۸۸M', share: 21, color: 'bg-sky-500' },
  { label: 'جاری', amount: '۹۰۰M', share: 22, color: 'bg-emerald-500' },
];

function AgingBlock({ title, subtitle, buckets }: { title: string; subtitle: string; buckets: Bucket[] }) {
  return (
    <div className="finance-aging-card rounded-xl border bg-card p-4">
      <div className="mb-4">
        <h3 className="text-sm font-semibold">{title}</h3>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>
      <div className="flex h-8 w-full overflow-hidden rounded-md" role="img" aria-label={title}>
        {buckets.map((b) => (
          <div key={b.label} className={`${b.color} min-w-[4px]`} style={{ flex: b.share }} title={`${b.label}: ${b.amount}`} />
        ))}
      </div>
      <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
        {buckets.map((b) => (
          <div key={b.label} className="rounded-lg border px-2 py-2 text-xs">
            <div className="flex items-center gap-1.5">
              <span className={`size-2 rounded-full ${b.color}`} />
              <span className="text-muted-foreground">{b.label}</span>
            </div>
            <p className="mt-1 font-semibold tabular-nums">{b.amount} تومان</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function FinanceAgingBars({
  mode = 'both',
  receivable,
  payable,
}: {
  mode?: 'both' | 'ar' | 'ap';
  receivable?: ApiBucket[];
  payable?: ApiBucket[];
}) {
  const ar = apiToBuckets(receivable, AR_BUCKETS);
  const ap = apiToBuckets(payable, AP_BUCKETS);
  if (mode === 'ar') {
    return <AgingBlock title="سن مطالبات" subtitle="بر مبنای ۱۴۰۵/۰۸/۲۰" buckets={ar} />;
  }
  if (mode === 'ap') {
    return <AgingBlock title="سن بدهی‌ها" subtitle="بر مبنای ۱۴۰۵/۰۸/۲۰" buckets={ap} />;
  }
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <AgingBlock title="سن بدهی دریافتنی" subtitle="بر مبنای ۱۴۰۵/۰۸/۲۰" buckets={ar} />
      <AgingBlock title="سن بدهی پرداختنی" subtitle="بر مبنای ۱۴۰۵/۰۸/۲۰" buckets={ap} />
    </div>
  );
}
