'use client';

import { Bot, Wallet } from 'lucide-react';
import { useState } from 'react';
import { SakhtarModuleShell, cn } from '@repo/ui';
import { FINANCE_TABS } from '../../lib/finance-hub-config';

export function FinanceModuleShell({ children }: { children: React.ReactNode }) {
  const [ledger, setLedger] = useState<'management' | 'statutory'>('statutory');

  const toolbar = (
    <div className="flex flex-wrap items-center gap-2 text-xs">
      <span className="text-muted-foreground">دفتر:</span>
      <button
        type="button"
        className={cn('rounded-full border px-3 py-1', ledger === 'management' && 'border-primary bg-primary/10')}
        onClick={() => setLedger('management')}
      >
        دفتر مدیریتی
      </button>
      <button
        type="button"
        className={cn('rounded-full border px-3 py-1', ledger === 'statutory' && 'border-primary bg-primary/10')}
        onClick={() => setLedger('statutory')}
      >
        دفتر قانونی
      </button>
    </div>
  );

  return (
    <SakhtarModuleShell
      theme="finance"
      title="مالی و حسابداری"
      subtitle="دورهٔ مالی جاری: آبان ۱۴۰۵ · باز"
      demoNote="محیط نمایشی — اسناد با API مالی همگام می‌شوند."
      tabs={FINANCE_TABS}
      cta={{ href: '/finance/journal-entries?new=1', label: '+ سند حسابداری جدید' }}
      toolbar={toolbar}
      icon={Wallet}
      mascot={{ href: '/finance/assistant', label: 'مالی یار', icon: Bot }}
    >
      {children}
    </SakhtarModuleShell>
  );
}
