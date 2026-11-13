export type ActivityType = 'call' | 'task' | 'meeting';
export type ActivityBucket = 'today' | 'overdue' | 'week' | 'done';
export type ActivityStatus = 'overdue' | 'scheduled' | 'done' | 'cancelled';

export type SalesActivity = {
  id: string;
  type: ActivityType;
  subject: string;
  relatedLabel: string;
  relatedHref?: string;
  dueAt: string;
  dueBucket: ActivityBucket;
  status: ActivityStatus;
};

export const ACTIVITY_TYPE_FA: Record<ActivityType, string> = {
  call: 'تماس',
  task: 'کار',
  meeting: 'جلسه',
};

export const ACTIVITY_TOTAL_HINT = 46;

const SUBJECTS = [
  'بررسی سوابق اعتباری مشتری',
  'جلسه حضوری با مدیر خرید',
  'تماس پیگیری پیش‌فاکتور',
  'ارسال نمونه محصول',
  'به‌روزرسانی اطلاعات تماس',
  'هماهنگی زمان تحویل',
];

const FEATURED: SalesActivity[] = [
  {
    id: 'ACT-0201',
    type: 'task',
    subject: 'بررسی سوابق اعتباری مشتری',
    relatedLabel: 'سرنخ — LEAD-0197',
    relatedHref: '/sales/leads',
    dueAt: '۱۴۰۵/۰۸/۲۵ ۱۳:۳۰',
    dueBucket: 'overdue',
    status: 'overdue',
  },
  {
    id: 'ACT-0198',
    type: 'meeting',
    subject: 'جلسه حضوری با مدیر خرید',
    relatedLabel: 'سرنخ — LEAD-0188',
    relatedHref: '/sales/leads',
    dueAt: '۱۴۰۵/۰۸/۲۶ ۱۰:۰۰',
    dueBucket: 'today',
    status: 'scheduled',
  },
  {
    id: 'ACT-0195',
    type: 'call',
    subject: 'تماس پیگیری پیش‌فاکتور',
    relatedLabel: 'مشتری — CUS-1004',
    relatedHref: '/sales/customers/CUS-1004',
    dueAt: '۱۴۰۵/۰۸/۲۶ ۱۵:۴۵',
    dueBucket: 'today',
    status: 'scheduled',
  },
  {
    id: 'ACT-0192',
    type: 'task',
    subject: 'ارسال نمونه محصول',
    relatedLabel: 'سرنخ — LEAD-0171',
    relatedHref: '/sales/leads',
    dueAt: '۱۴۰۵/۰۸/۲۸ ۱۱:۱۵',
    dueBucket: 'week',
    status: 'scheduled',
  },
  {
    id: 'ACT-0185',
    type: 'meeting',
    subject: 'هماهنگی زمان تحویل',
    relatedLabel: 'مشتری — CUS-1101',
    relatedHref: '/sales/customers/CUS-1101',
    dueAt: '۱۴۰۵/۰۸/۲۰ ۰۹:۰۰',
    dueBucket: 'done',
    status: 'done',
  },
];

function buildActivities(): SalesActivity[] {
  const list = [...FEATURED];
  const types: ActivityType[] = ['call', 'task', 'meeting'];
  const buckets: ActivityBucket[] = ['today', 'overdue', 'week', 'done'];
  for (let i = 0; i < 41; i++) {
    const n = 180 - i;
    const bucket = buckets[i % buckets.length]!;
    const status: ActivityStatus =
      bucket === 'done' ? 'done' : bucket === 'overdue' ? 'overdue' : bucket === 'today' && i % 5 === 0 ? 'overdue' : 'scheduled';
    list.push({
      id: `ACT-${n}`,
      type: types[i % 3]!,
      subject: SUBJECTS[i % SUBJECTS.length]!,
      relatedLabel: `سرنخ — LEAD-${String(1000 + i).padStart(4, '0')}`,
      relatedHref: '/sales/leads',
      dueAt: `۱۴۰۵/۰${(i % 8) + 1}/${12 + (i % 16)} ${9 + (i % 8)}:${(i % 4) * 15}`,
      dueBucket: bucket,
      status,
    });
  }
  return list;
}

export const SALES_ACTIVITIES = buildActivities();

export type ActivityTimeTab = 'today' | 'overdue' | 'week' | 'done';
export type ActivityTypeFilter = 'all' | ActivityType;

export function filterActivities(
  rows: SalesActivity[],
  opts: {
    timeTab: ActivityTimeTab;
    typeFilter: ActivityTypeFilter;
    search: string;
    includeCancelled: boolean;
  },
): SalesActivity[] {
  const q = opts.search.trim();
  return rows.filter((a) => {
    if (a.status === 'cancelled' && !opts.includeCancelled) return false;
    if (opts.timeTab === 'today' && a.dueBucket !== 'today') return false;
    if (opts.timeTab === 'overdue' && a.status !== 'overdue') return false;
    if (opts.timeTab === 'week' && a.dueBucket !== 'week') return false;
    if (opts.timeTab === 'done' && a.status !== 'done') return false;
    if (opts.typeFilter !== 'all' && a.type !== opts.typeFilter) return false;
    if (q) {
      const hay = `${a.subject} ${a.relatedLabel} ${a.id}`;
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}
