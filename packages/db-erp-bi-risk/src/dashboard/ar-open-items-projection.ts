/** Read-model اقلام باز دریافتنی — projection (نه OLTP) */

export type ArOpenItemRow = {
  docNo: string;
  customer: string;
  issueDate: string;
  dueDate: string;
  amountToman: number;
  openToman: number;
  delayDays: number;
};

const DEMO: ArOpenItemRow[] = [
  { docNo: 'INV-10442', customer: 'صنایع غذایی پارس', issueDate: '۱۴۰۵/۰۳/۱۲', dueDate: '۱۴۰۵/۰۵/۱۲', amountToman: 85_000_000, openToman: 85_000_000, delayDays: 160 },
  { docNo: 'INV-10501', customer: 'صنایع غذایی پارس', issueDate: '۱۴۰۵/۰۴/۰۱', dueDate: '۱۴۰۵/۰۶/۰۱', amountToman: 120_000_000, openToman: 120_000_000, delayDays: 140 },
  { docNo: 'INV-10688', customer: 'رستوران‌های زنجیره‌ای شیراز', issueDate: '۱۴۰۵/۰۵/۲۰', dueDate: '۱۴۰۵/۰۷/۲۰', amountToman: 240_287_061, openToman: 234_450_111, delayDays: 96 },
  { docNo: 'INV-10702', customer: 'بازرگانی گندم طلایی', issueDate: '۱۴۰۵/۰۶/۱۰', dueDate: '۱۴۰۵/۰۸/۱۰', amountToman: 58_599_490, openToman: 58_599_490, delayDays: 47 },
  { docNo: 'INV-10715', customer: 'گروه هتل‌های بین‌المللی مشهد', issueDate: '۱۴۰۵/۰۶/۲۲', dueDate: '۱۴۰۵/۰۸/۲۲', amountToman: 112_794_504, openToman: 112_794_504, delayDays: 79 },
  { docNo: 'INV-10720', customer: 'بازرگانی جهان همدان', issueDate: '۱۴۰۵/۰۸/۱۵', dueDate: '۱۴۰۵/۰۹/۱۵', amountToman: 22_000_000, openToman: 22_000_000, delayDays: 0 },
];

const store = new Map<string, ArOpenItemRow[]>();
const seeded = new Set<string>();

export function ensureArOpenItemsProjection(tenantId: string): void {
  if (seeded.has(tenantId)) return;
  seeded.add(tenantId);
  store.set(tenantId, DEMO);
}

export function queryArOpenItemsProjection(tenantId: string): { items: ArOpenItemRow[]; source: string } {
  ensureArOpenItemsProjection(tenantId);
  return {
    items: store.get(tenantId) ?? DEMO,
    source: 'projection_ar_open_items',
  };
}
