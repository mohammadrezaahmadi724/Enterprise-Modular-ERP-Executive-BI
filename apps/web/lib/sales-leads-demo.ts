import { formatToman } from './finance-receivables-demo';

export { formatToman };

export type LeadStage = 'qualify' | 'discover' | 'proposal' | 'negotiate';
export type LeadPriority = 'urgent' | 'high' | 'normal' | 'low';
export type LeadOutcome = 'open' | 'won' | 'lost';

export type SalesLead = {
  id: string;
  name: string;
  subject: string;
  amountToman: number;
  stage: LeadStage;
  priority: LeadPriority;
  closeDate?: string;
  nextAction?: string;
  nextActionDanger?: boolean;
  outcome: LeadOutcome;
  mine: boolean;
  needsFollowup: boolean;
};

export const STAGE_DEFS: Array<{
  id: LeadStage;
  title: string;
  probabilityPct: number;
  referenceCount: number;
  referenceSumToman: number;
}> = [
  { id: 'qualify', title: 'ارزیابی اولیه', probabilityPct: 10, referenceCount: 59, referenceSumToman: 8_753_000_000 },
  { id: 'discover', title: 'کشف نیاز', probabilityPct: 25, referenceCount: 15, referenceSumToman: 5_890_009_000 },
  { id: 'proposal', title: 'پیشنهاد', probabilityPct: 50, referenceCount: 12, referenceSumToman: 7_178_300_000 },
  { id: 'negotiate', title: 'مذاکره', probabilityPct: 75, referenceCount: 10, referenceSumToman: 7_370_000_000 },
];

export const STAGE_NEXT: Record<LeadStage, Array<{ value: LeadStage; label: string }>> = {
  qualify: [
    { value: 'discover', label: 'کشف نیاز' },
    { value: 'proposal', label: 'پیشنهاد' },
    { value: 'negotiate', label: 'مذاکره' },
  ],
  discover: [
    { value: 'proposal', label: 'پیشنهاد' },
    { value: 'negotiate', label: 'مذاکره' },
  ],
  proposal: [{ value: 'negotiate', label: 'مذاکره' }],
  negotiate: [],
};

export const PRIORITY_LABEL: Record<LeadPriority, string> = {
  urgent: 'فوری',
  high: 'بالا',
  normal: 'عادی',
  low: 'کم',
};

export function formatLeadAmount(toman: number): string {
  if (toman <= 0) return '۰ تومان';
  return `${formatToman(toman)} تومان`;
}

const FEATURED: Omit<SalesLead, 'id' | 'stage' | 'outcome'>[] = [
  {
    name: 'دانشگاه فدک کرمان',
    subject: 'تأمین سبد کالای کارکنان',
    amountToman: 770_000_000,
    priority: 'low',
    closeDate: '۱۴۰۵/۰۶/۲۷',
    nextAction: 'تماس — دیروز ۱۷:۰۰',
    nextActionDanger: true,
    mine: false,
    needsFollowup: true,
  },
  {
    name: 'شهرداری رویال تهران',
    subject: 'تأمین مواد اولیه آشپزخانه مرکزی',
    amountToman: 180_000_000,
    priority: 'normal',
    closeDate: '۱۴۰۵/۰۸/۱۰',
    nextAction: 'تماس — ۷ روز پیش',
    nextActionDanger: true,
    mine: true,
    needsFollowup: true,
  },
  {
    name: 'مریم کریمی',
    subject: 'خرید بسته‌بندی برای خط تولید',
    amountToman: 45_000_000,
    priority: 'low',
    closeDate: '۱۴۰۵/۰۶/۱۲',
    nextAction: 'جلسه — ۴ روز پیش',
    nextActionDanger: true,
    mine: true,
    needsFollowup: true,
  },
  {
    name: 'شهرداری ساحل تبریز',
    subject: 'تأمین مواد اولیه آشپزخانه مرکزی',
    amountToman: 155_000_000,
    priority: 'high',
    closeDate: '۱۴۰۵/۰۶/۱۷',
    nextAction: 'کار — ۳ روز پیش',
    nextActionDanger: true,
    mine: false,
    needsFollowup: true,
  },
  {
    name: 'پتروشیمی آفتاب تهران',
    subject: 'تأمین آجیل و خشکبار مناسبتی',
    amountToman: 1_180_000_000,
    priority: 'normal',
    closeDate: '۱۴۰۵/۰۷/۱۵',
    nextAction: 'تماس — ۲ روز پیش',
    nextActionDanger: true,
    mine: true,
    needsFollowup: true,
  },
  {
    name: 'بیمارستان یاس اهواز',
    subject: 'تأمین اقلام بهداشتی و شوینده',
    amountToman: 305_000_000,
    priority: 'urgent',
    closeDate: '۱۴۰۵/۰۸/۱۵',
    nextAction: 'تماس — ۵ روز پیش',
    nextActionDanger: true,
    mine: false,
    needsFollowup: true,
  },
  {
    name: 'پتروشیمی نگین تبریز',
    subject: 'تأمین سبد کالای کارکنان',
    amountToman: 440_000_000,
    priority: 'normal',
    closeDate: '۱۴۰۵/۰۸/۱۵',
    nextAction: 'جلسه — ۶ روز پیش',
    nextActionDanger: true,
    mine: false,
    needsFollowup: true,
  },
  {
    name: 'بیمارستان تابان اهواز',
    subject: 'تأمین اقلام بهداشتی و شوینده',
    amountToman: 1_245_000_000,
    priority: 'high',
    closeDate: '۱۴۰۵/۰۸/۲۱',
    nextAction: 'جلسه — ۴ روز دیگر',
    mine: false,
    needsFollowup: false,
  },
];

const SUBJECTS = [
  'تأمین سبد کالای کارکنان',
  'تأمین مواد اولیه آشپزخانه مرکزی',
  'تأمین اقلام بهداشتی و شوینده',
  'خرید بسته‌بندی برای خط تولید',
  'سفارش عمده نوشیدنی فصل تابستان',
];

const ORG_NAMES = [
  'شهرداری',
  'دانشگاه',
  'پتروشیمی',
  'بیمارستان',
  'کارخانه',
  'مجتمع تجاری',
  'هتل',
  'فروشگاه زنجیره‌ای',
];

function buildLeads(): SalesLead[] {
  const leads: SalesLead[] = [];
  let seq = 1;

  const push = (partial: Omit<SalesLead, 'id'>) => {
    leads.push({ ...partial, id: `LEAD-${String(seq++).padStart(4, '0')}` });
  };

  const stageQuota: Record<LeadStage, number> = {
    qualify: 59,
    discover: 15,
    proposal: 12,
    negotiate: 10,
  };

  let featIdx = 0;
  for (const stage of Object.keys(stageQuota) as LeadStage[]) {
    const quota = stageQuota[stage];
    for (let i = 0; i < quota; i++) {
      if (featIdx < FEATURED.length) {
        const f = FEATURED[featIdx++]!;
        push({
          ...f,
          stage,
          outcome: 'open',
        });
        continue;
      }
      const org = ORG_NAMES[i % ORG_NAMES.length];
      const city = ['تهران', 'تبریز', 'شیراز', 'مشهد', 'اصفهان'][i % 5];
      push({
        name: `${org} ${city} — ${i + 1}`,
        subject: SUBJECTS[i % SUBJECTS.length]!,
        amountToman: i % 4 === 0 ? 0 : (i + 3) * 85_000_000,
        stage,
        priority: (['normal', 'low', 'high', 'normal'] as LeadPriority[])[i % 4]!,
        closeDate: i % 3 === 0 ? undefined : `۱۴۰۵/۰${(i % 9) + 1}/${10 + (i % 18)}`,
        nextAction: i % 5 === 0 ? 'بدون اقدام بعدی' : `کار — ${(i % 7) + 1} روز پیش`,
        nextActionDanger: i % 5 !== 0 && i % 2 === 0,
        outcome: 'open',
        mine: i % 7 === 0,
        needsFollowup: i % 5 !== 0 && i % 2 === 0,
      });
    }
  }

  push({
    name: 'قرارداد سالانه پخش افق',
    subject: 'تأمین اقلام خشک',
    amountToman: 2_400_000_000,
    stage: 'negotiate',
    priority: 'high',
    closeDate: '۱۴۰۵/۰۸/۰۱',
    nextAction: 'جلسه امضا — انجام شد',
    outcome: 'won',
    mine: true,
    needsFollowup: false,
  });
  push({
    name: 'سوپرمارکت ستاره — لغو مناقصه',
    subject: 'LEAD-0088',
    amountToman: 320_000_000,
    stage: 'qualify',
    priority: 'normal',
    nextAction: 'بایگانی',
    outcome: 'lost',
    mine: false,
    needsFollowup: false,
  });

  return leads;
}

export const SALES_LEADS: SalesLead[] = buildLeads();

export type QuickLeadTab = 'all' | 'open' | 'mine' | 'followup' | 'won' | 'lost';

export function filterLeads(
  leads: SalesLead[],
  tab: QuickLeadTab,
  search: string,
  priority: LeadPriority | '',
): SalesLead[] {
  const q = search.trim();
  return leads.filter((l) => {
    if (tab === 'open' && l.outcome !== 'open') return false;
    if (tab === 'mine' && !l.mine) return false;
    if (tab === 'followup' && !(l.needsFollowup || l.nextActionDanger)) return false;
    if (tab === 'won' && l.outcome !== 'won') return false;
    if (tab === 'lost' && l.outcome !== 'lost') return false;
    if (tab === 'all' && (l.outcome === 'won' || l.outcome === 'lost')) return false;
    if (priority && l.priority !== priority) return false;
    if (q) {
      const hay = `${l.name} ${l.subject} ${l.id} ${l.nextAction ?? ''}`.toLowerCase();
      if (!hay.includes(q.toLowerCase())) return false;
    }
    return true;
  });
}

export function stageStats(leads: SalesLead[], stage: LeadStage) {
  const inStage = leads.filter((l) => l.stage === stage && l.outcome === 'open');
  const sum = inStage.reduce((s, l) => s + l.amountToman, 0);
  return { count: inStage.length, sumToman: sum };
}

export const BOARD_CARD_LIMIT = 12;
