import { formatToman } from './finance-receivables-demo';

export { formatToman };

export type CostCenter = {
  id: string;
  code: string;
  name: string;
  manager: string;
  budgetYtdToman: number;
  actualYtdToman: number;
  active: boolean;
};

export type Project = {
  id: string;
  code: string;
  name: string;
  costCenterCode: string;
  progressPct: number;
  budgetToman: number;
  spentToman: number;
  status: 'باز' | 'بسته';
};

export const COST_CENTERS: CostCenter[] = [
  { id: 'cc1', code: 'CC-ADM', name: 'اداری و عمومی', manager: 'سارا احمدی', budgetYtdToman: 420_000_000, actualYtdToman: 398_200_000, active: true },
  { id: 'cc2', code: 'CC-SLS', name: 'فروش و بازاریابی', manager: 'رضا کاظمی', budgetYtdToman: 680_000_000, actualYtdToman: 712_400_000, active: true },
  { id: 'cc3', code: 'CC-PRD', name: 'تولید — خط بسته‌بندی', manager: 'مهدی نوری', budgetYtdToman: 1_250_000_000, actualYtdToman: 1_189_000_000, active: true },
  { id: 'cc4', code: 'CC-LOG', name: 'توزیع و لجستیک', manager: 'نرگس ملکی', budgetYtdToman: 390_000_000, actualYtdToman: 401_500_000, active: true },
];

export const PROJECTS: Project[] = [
  { id: 'p1', code: 'PRJ-1405-01', name: 'نوسازی خط تولید آبان', costCenterCode: 'CC-PRD', progressPct: 62, budgetToman: 2_400_000_000, spentToman: 1_488_000_000, status: 'باز' },
  { id: 'p2', code: 'PRJ-1405-02', name: 'اتوماسیون انبار مرکزی', costCenterCode: 'CC-LOG', progressPct: 38, budgetToman: 890_000_000, spentToman: 338_200_000, status: 'باز' },
  { id: 'p3', code: 'PRJ-1404-08', name: 'ERP فاز اول — مالی', costCenterCode: 'CC-ADM', progressPct: 100, budgetToman: 1_100_000_000, spentToman: 1_095_000_000, status: 'بسته' },
];

/** پروژه‌های عملیاتی (ماژول projects) که در پل مالی نمایش داده می‌شوند */
export const OPS_PROJECTS_FINANCE: Project[] = [
  {
    id: 'ops-p24',
    code: 'PRJ-0024',
    name: 'تأمین قطعات خط تولید',
    costCenterCode: 'CC-310',
    progressPct: 74,
    budgetToman: 1_200_000_000,
    spentToman: 890_000_000,
    status: 'باز',
  },
  {
    id: 'ops-p18',
    code: 'PRJ-0018',
    name: 'کمپین بازاریابی و فروش سازمانی پاییزه',
    costCenterCode: 'CC-220',
    progressPct: 71,
    budgetToman: 450_000_000,
    spentToman: 320_000_000,
    status: 'باز',
  },
];

export function allFinanceProjects(): Project[] {
  const known = new Set(PROJECTS.map((p) => p.code));
  return [...PROJECTS, ...OPS_PROJECTS_FINANCE.filter((p) => !known.has(p.code))];
}

export const ANALYTIC_LEVELS = ['مرکز هزینه', 'پروژه', 'شعبه', 'قرارداد'] as const;
