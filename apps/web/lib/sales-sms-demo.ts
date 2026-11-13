export type SmsCampaign = {
  id: string;
  name: string;
  template: string;
  sentCount: number;
  deliveredPct: number;
  status: 'draft' | 'sending' | 'done';
  lastRun?: string;
};

export const SMS_QUOTA = { monthly: 10_000, used: 3_420 };

export const SMS_CAMPAIGNS: SmsCampaign[] = [
  { id: 'SMS-01', name: 'پیگیری پیش‌فاکتور QT', template: 'یادآوری اعتبار پیش‌فاکتور', sentCount: 0, deliveredPct: 0, status: 'draft' },
  { id: 'SMS-02', name: 'خوش‌آمد سرنخ جدید', template: 'خوش آمدید — کارشناس ما تماس می‌گیرد', sentCount: 156, deliveredPct: 94, status: 'done', lastRun: '۱۴۰۵/۰۸/۲۰' },
  { id: 'SMS-03', name: 'سررسید تحویل سفارش', template: 'سفارش شما آماده ارسال است', sentCount: 42, deliveredPct: 98, status: 'done', lastRun: '۱۴۰۵/۰۸/۱۹' },
];
