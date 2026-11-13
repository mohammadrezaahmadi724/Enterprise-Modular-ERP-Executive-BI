import { formatToman } from './finance-receivables-demo';

export { formatToman };

export type CheckLifecycle = 'in_safe' | 'in_collection' | 'cleared' | 'bounced' | 'returned';

export type ReceivedCheck = {
  id: string;
  sayadId: string;
  bank: string;
  party: string;
  serial: string;
  amountToman: number;
  dueDate: string;
  status: CheckLifecycle;
};

export type PayableCheck = {
  id: string;
  sayadId: string;
  bank: string;
  party: string;
  serial: string;
  amountToman: number;
  dueDate: string;
  status: CheckLifecycle;
};

export type Checkbook = {
  id: string;
  bank: string;
  series: string;
  leafFrom: number;
  leafTo: number;
  used: number;
  accountName: string;
};

/** دمو خالی — KPIها صفر؛ برای پر کردن از projection چک */
export const DEMO_RECEIVED_CHECKS: ReceivedCheck[] = [];
export const DEMO_PAYABLE_CHECKS: PayableCheck[] = [];
export const DEMO_CHECKBOOKS: Checkbook[] = [];

export const CHECK_STATUS_OPTIONS: { value: CheckLifecycle | 'all'; label: string }[] = [
  { value: 'all', label: 'همه وضعیت‌ها' },
  { value: 'in_safe', label: 'نزد صندوق' },
  { value: 'in_collection', label: 'در جریان وصول' },
  { value: 'cleared', label: 'وصول‌شده / پاس‌شده' },
  { value: 'bounced', label: 'برگشتی' },
  { value: 'returned', label: 'عودت‌داده‌شده' },
];

export function statusLabelFa(s: CheckLifecycle): string {
  const map: Record<CheckLifecycle, string> = {
    in_safe: 'نزد صندوق',
    in_collection: 'در جریان وصول',
    cleared: 'وصول‌شده',
    bounced: 'برگشتی',
    returned: 'عودت‌داده‌شده',
  };
  return map[s];
}

export function computeCheckKpis(items: Array<{ status: CheckLifecycle }>) {
  const count = (s: CheckLifecycle) => items.filter((i) => i.status === s).length;
  return {
    in_safe: count('in_safe'),
    in_collection: count('in_collection'),
    cleared: count('cleared'),
    bounced: count('bounced'),
  };
}

export function formatCheckCount(n: number): string {
  return `${new Intl.NumberFormat('fa-IR').format(n)} فقره چک`;
}
