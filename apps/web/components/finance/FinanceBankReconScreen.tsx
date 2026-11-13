'use client';

import { useMemo, useState } from 'react';
import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from '@repo/ui';
import { CreditCard, Plus, Upload } from 'lucide-react';
import {
  RECON_BANK_ACCOUNTS,
  RECON_SESSIONS_COUNT,
  type ReconBankAccount,
} from '../../lib/finance-bank-recon-demo';

type ViewTab = 'statement' | 'sessions';

export function FinanceBankReconScreen() {
  const [viewTab, setViewTab] = useState<ViewTab>('statement');
  const [accountId, setAccountId] = useState('');
  const [hasImportedStatement, setHasImportedStatement] = useState(false);

  const account = useMemo(
    () => RECON_BANK_ACCOUNTS.find((a) => a.id === accountId),
    [accountId],
  );

  return (
    <div className="flex flex-col gap-5">
      <Card className="finance-aging-card overflow-hidden">
        <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between pb-2">
          <div>
            <CardTitle className="text-base">مغایرت بانکی و صورتحساب (Bank Reconciliation)</CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">
              ایمپورت فایل صورتحساب بانکی، تطبیق هوشمند با اسناد خزانه و تهیه صورت مغایرت
            </p>
          </div>
          <div className="flex flex-wrap gap-2 shrink-0">
            <Button size="sm" variant="secondary" onClick={() => setHasImportedStatement(true)}>
              <Plus className="size-4 ml-1" />
              ایمپورت فایل صورتحساب (Excel / CSV)
            </Button>
            <Button size="sm" disabled={!accountId}>
              ثبت صورت مغایرت بانکی
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0 pb-4">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="min-w-[280px] flex-1">
              <label className="block text-xs text-muted-foreground mb-1">انتخاب حساب بانکی:</label>
              <select
                className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                value={accountId}
                onChange={(e) => {
                  setAccountId(e.target.value);
                  setHasImportedStatement(false);
                }}
              >
                <option value="">انتخاب حساب بانکی...</option>
                {RECON_BANK_ACCOUNTS.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.label} — شماره حساب: —
                  </option>
                ))}
              </select>
            </div>
            <AccountMeta account={account} />
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-2 border-b pb-2">
        <Button
          size="sm"
          variant={viewTab === 'statement' ? 'default' : 'secondary'}
          onClick={() => setViewTab('statement')}
        >
          اقلام صورتحساب و تطبیق هوشمند
        </Button>
        <Button
          size="sm"
          variant={viewTab === 'sessions' ? 'default' : 'secondary'}
          onClick={() => setViewTab('sessions')}
        >
          جلسات و صورت‌های مغایرت بانکی ({RECON_SESSIONS_COUNT.toLocaleString('fa-IR')})
        </Button>
      </div>

      {viewTab === 'statement' && (
        <StatementPanel
          hasImport={hasImportedStatement}
          accountSelected={!!accountId}
          onImport={() => setHasImportedStatement(true)}
        />
      )}
      {viewTab === 'sessions' && <SessionsPanel />}
    </div>
  );
}

function AccountMeta({ account }: { account: ReconBankAccount | undefined }) {
  const iban = account?.iban ?? '—';
  const branch =
    account != null
      ? `${account.branch} (${account.branchCode ?? '—'})`
      : 'مرکزی (—)';

  return (
    <div className="flex flex-wrap gap-5 text-sm">
      <div>
        <span className="text-muted-foreground">شبا: </span>
        <span className="font-semibold tabular-nums font-mono text-xs" dir="ltr">
          {iban}
        </span>
      </div>
      <div>
        <span className="text-muted-foreground">شعبه: </span>
        <span>{branch}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="text-muted-foreground">وضعیت حساب: </span>
        {account?.activeInTreasury !== false ? (
          <Badge className="bg-emerald-600 hover:bg-emerald-600">فعال در خزانه</Badge>
        ) : (
          <Badge variant="secondary">غیرفعال</Badge>
        )}
      </div>
    </div>
  );
}

function StatementPanel({
  hasImport,
  accountSelected,
  onImport,
}: {
  hasImport: boolean;
  accountSelected: boolean;
  onImport: () => void;
}) {
  if (hasImport && accountSelected) {
    return (
      <Card>
        <CardContent className="py-10 text-center text-sm text-muted-foreground">
          <p className="font-medium text-foreground">صورتحساب ایمپورت شد (نمایشی)</p>
          <p className="mt-1">تطبیق هوشمند با خزانه از projection در موج بعد فعال می‌شود.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="py-10">
        <div className="sk-empty flex flex-col items-center text-center gap-3">
          <span className="grid size-14 place-items-center rounded-full bg-muted text-muted-foreground">
            <CreditCard className="size-7" />
          </span>
          <p className="text-sm font-medium">هیچ صورتحساب فعالی انتخاب یا ایمپورت نشده است</p>
          <Button size="sm" onClick={onImport}>
            <Upload className="size-4 ml-1" />
            ایمپورت فایل صورتحساب بانکی (Excel / CSV)
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function SessionsPanel() {
  return (
    <Card>
      <CardContent className="py-14 text-center text-sm text-muted-foreground">
        <p className="font-medium text-foreground">جلسهٔ مغایرت بانکی ثبت نشده</p>
        <p className="mt-1">پس از تطبیق اقلام، «ثبت صورت مغایرت بانکی» یک جلسه جدید می‌سازد.</p>
      </CardContent>
    </Card>
  );
}
