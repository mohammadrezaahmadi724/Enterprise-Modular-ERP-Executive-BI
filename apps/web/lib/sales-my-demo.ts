export type MySalesItem = {
  id: string;
  kind: 'lead' | 'quote' | 'order';
  title: string;
  amountToman: number;
  dueLabel: string;
  stage: string;
};

export const MY_SALES_KPIS = {
  openLeads: 12,
  quotesPending: 5,
  ordersMonthToman: 18_400_000,
  targetPct: 74,
};

export const MY_SALES_ITEMS: MySalesItem[] = [
  { id: '1', kind: 'lead', title: 'شهرداری رویال تهران', amountToman: 180_000_000, dueLabel: 'تماس امروز', stage: 'ارزیابی اولیه' },
  { id: '2', kind: 'quote', title: 'QT-0320 — هایپرمارکت ستاره', amountToman: 4_200_000, dueLabel: 'اعتبار ۳ روز', stage: 'پیش‌نویس' },
  { id: '3', kind: 'order', title: 'SO-0482 — پخش تابان', amountToman: 6_800_000, dueLabel: 'تحویل فردا', stage: 'رزرو جزئی' },
];
