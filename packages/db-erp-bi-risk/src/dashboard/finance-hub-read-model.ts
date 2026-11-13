import { getProjectionSlice, queryDashboardKpis, seedMetric, seedProjection } from './metric-query';

export type FinanceAgingBucket = {
  key: string;
  labelFa: string;
  amountIrr: number;
};

export type FinanceHubReadModel = {
  currency: 'IRR';
  kpis: {
    receivablesIrr: number;
    payablesIrr: number;
    treasuryIrr: number;
    overdueArIrr: number;
    pendingApprovalCount: number;
  };
  journalStatus: {
    draft: number;
    sent: number;
    approved: number;
    posted: number;
  };
  agingReceivable: FinanceAgingBucket[];
  agingPayable: FinanceAgingBucket[];
  sources: string[];
};

const AGING_LABELS: Record<string, string> = {
  over90: 'بیش از ۹۰ روز',
  d61_90: '۶۱–۹۰',
  d31_60: '۳۱–۶۰',
  d1_30: '۱–۳۰',
  current: 'جاری',
};

const seededTenants = new Set<string>();

export function ensureFinanceHubProjection(tenantId: string): void {
  if (seededTenants.has(tenantId)) return;
  seededTenants.add(tenantId);

  const today = new Date().toISOString().slice(0, 10);
  seedMetric(tenantId, 'accounts_receivable_total', 17_271_822_240, today);
  seedMetric(tenantId, 'accounts_payable_total', 41_621_812_190, today);
  seedMetric(tenantId, 'treasury_balance', 161_529_595_270, today);
  seedMetric(tenantId, 'journals_pending_approval', 2, today);
  seedMetric(tenantId, 'overdue_ar', 14_700_000_000, today);

  seedProjection(tenantId, 'projection_financial_summary', 'aging_ar', {
    over90: 6_420_652_190,
    d61_90: 2_100_000_000,
    d31_60: 3_722_569_580,
    d1_30: 2_860_000_000,
    current: 2_170_000_000,
  });
  seedProjection(tenantId, 'projection_financial_summary', 'aging_ap', {
    over90: 15_681_480_110,
    d61_90: 3_779_350_460,
    d31_60: 4_282_814_920,
    d1_30: 8_880_855_440,
    current: 8_997_311_260,
  });
  seedProjection(tenantId, 'projection_financial_summary', 'journal_status', {
    draft: 2,
    sent: 2,
    approved: 0,
    posted: 2455,
  });
}

function bucketsFromProjection(raw: Record<string, number> | undefined): FinanceAgingBucket[] {
  if (!raw) return [];
  return Object.entries(raw).map(([key, amountIrr]) => ({
    key,
    labelFa: AGING_LABELS[key] ?? key,
    amountIrr,
  }));
}

export function queryFinanceHubReadModel(tenantId: string): FinanceHubReadModel {
  ensureFinanceHubProjection(tenantId);
  const kpis = queryDashboardKpis(tenantId);
  const status = getProjectionSlice(tenantId, 'projection_financial_summary', 'journal_status');

  return {
    currency: 'IRR',
    kpis: {
      receivablesIrr: kpis.accounts_receivable_total ?? 0,
      payablesIrr: kpis.accounts_payable_total ?? 0,
      treasuryIrr: kpis.treasury_balance ?? 0,
      overdueArIrr: kpis.overdue_ar ?? 0,
      pendingApprovalCount: kpis.journals_pending_approval ?? 0,
    },
    journalStatus: {
      draft: status?.draft ?? 0,
      sent: status?.sent ?? 0,
      approved: status?.approved ?? 0,
      posted: status?.posted ?? 0,
    },
    agingReceivable: bucketsFromProjection(
      getProjectionSlice(tenantId, 'projection_financial_summary', 'aging_ar'),
    ),
    agingPayable: bucketsFromProjection(
      getProjectionSlice(tenantId, 'projection_financial_summary', 'aging_ap'),
    ),
    sources: ['metric_snapshots', 'projection_financial_summary'],
  };
}
