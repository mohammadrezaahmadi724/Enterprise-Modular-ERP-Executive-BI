import { TenantContext } from '@repo/domain';
import { listPurchaseRequests } from '../modules/procurement/procurement.service';
import { readProjectProcurementLinks } from './projects-procurement.bridge';

export type ProjectFinanceSnapshot = {
  costCenterCode?: string;
  costCenterName?: string;
  budgetToman: number;
  spentToman: number;
  progressPct: number;
  budgetUtilizationPct: number;
  detailHref: string;
  sources: string[];
};

type FinanceProfile = {
  costCenterCode: string;
  costCenterName: string;
  budgetToman: number;
  spentToman?: number;
  progressPct?: number;
};

/** Read-model style snapshot — no direct GL table access from projects module. */
const FINANCE_PROFILES: Record<string, FinanceProfile> = {
  'PRJ-0024': {
    costCenterCode: 'CC-310',
    costCenterName: 'پروژه و سرمایه‌ای',
    budgetToman: 1_200_000_000,
    spentToman: 890_000_000,
    progressPct: 74,
  },
  'PRJ-0018': {
    costCenterCode: 'CC-220',
    costCenterName: 'بازاریابی میدانی',
    budgetToman: 450_000_000,
    spentToman: 320_000_000,
    progressPct: 71,
  },
  'PRJ-0012': {
    costCenterCode: 'CC-LOG',
    costCenterName: 'توزیع و لجستیک',
    budgetToman: 680_000_000,
    spentToman: 248_000_000,
    progressPct: 36,
  },
  'PRJ-0008': {
    costCenterCode: 'CC-LOG',
    costCenterName: 'توزیع و لجستیک',
    budgetToman: 220_000_000,
    spentToman: 96_000_000,
    progressPct: 44,
  },
};

const CC_NAMES: Record<string, string> = {
  'CC-310': 'پروژه و سرمایه‌ای',
  'CC-220': 'بازاریابی میدانی',
  'CC-401': 'اداری — عمومی',
  'CC-LOG': 'توزیع و لجستیک',
  'CC-PRD': 'تولید',
  'CC-ADM': 'اداری و عمومی',
};

export async function readProjectFinanceSnapshot(projectCode: string): Promise<ProjectFinanceSnapshot> {
  void TenantContext.requireTenantId();
  const code = projectCode.trim();
  const profile = FINANCE_PROFILES[code];
  const procurement = await readProjectProcurementLinks(code);

  const spentFromPo = procurement.purchaseOrders.reduce((s, o) => s + o.totalToman, 0);
  const spentFromPr = procurement.purchaseRequests
    .filter((r) => r.status === 'approved' || r.status === 'sent')
    .reduce((s, r) => s + r.estimatedToman, 0);

  const spentToman = profile?.spentToman ?? Math.max(spentFromPo, Math.round(spentFromPr * 0.85));
  const budgetToman = profile?.budgetToman ?? Math.max(Math.round(spentToman * 1.25), 500_000_000);
  const utilization = budgetToman > 0 ? Math.min(100, Math.round((spentToman / budgetToman) * 100)) : 0;
  const progressPct = profile?.progressPct ?? Math.min(95, utilization);

  const prRows = await listPurchaseRequests();
  const prForProject = prRows.find((r) => r.project?.trim() === code);
  const costCenterCode = profile?.costCenterCode ?? prForProject?.costCenter?.trim();

  const costCenterName = costCenterCode ? (CC_NAMES[costCenterCode] ?? profile?.costCenterName ?? 'مرکز هزینه') : profile?.costCenterName;

  const detailHref = `/finance/cost-centers?opsProject=${encodeURIComponent(code)}&tab=projects`;

  return {
    costCenterCode,
    costCenterName,
    budgetToman,
    spentToman,
    progressPct,
    budgetUtilizationPct: utilization,
    detailHref,
    sources: profile ? ['finance_analytic_bridge', 'procurement_commitments'] : ['procurement_commitments'],
  };
}
