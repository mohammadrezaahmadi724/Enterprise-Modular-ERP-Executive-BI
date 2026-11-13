import Link from 'next/link';
import { Button } from '@repo/ui';
import { BarChart3, CreditCard, Layers } from 'lucide-react';

const REPORTS = [
  { href: '/finance/reports?trial', label: 'تراز آزمایشی', Icon: CreditCard },
  { href: '/finance/reports?ledger=general', label: 'گردش حساب', Icon: BarChart3 },
  { href: '/finance/reports?ledger=subsidiary', label: 'مانده حساب', Icon: Layers },
] as const;

export function FinanceReadyReports() {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold">گزارش‌های آماده</h3>
      <ul className="divide-y rounded-lg border">
        {REPORTS.map(({ href, label, Icon }) => (
          <li key={href} className="flex items-center gap-3 px-3 py-2.5">
            <span className="grid size-7 place-items-center rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
              <Icon className="size-4" />
            </span>
            <span className="flex-1 text-sm font-medium">{label}</span>
            <Button variant="ghost" size="sm" asChild>
              <Link href={href}>نمایش</Link>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
