export type SalesContact = {
  id: string;
  name: string;
  company?: string;
  phone: string;
  email?: string;
  role: string;
  consent: 'yes' | 'pending' | 'no';
};

export const CONTACTS_TOTAL = 1280;

export const SALES_CONTACTS: SalesContact[] = [
  { id: 'CNT-001', name: 'مهدی احمدی', company: 'پتروشیمی آفتاب', phone: '۰۹۱۲۱۲۳۴۵۶۷', email: 'm.ahmadi@example.ir', role: 'مدیر خرید', consent: 'yes' },
  { id: 'CNT-002', name: 'نرگس رضایی', company: undefined, phone: '۰۹۳۵۸۷۶۵۴۳۲', role: 'خریدار عمده', consent: 'yes' },
  { id: 'CNT-003', name: 'حسین کریمی', company: 'پخش تابان', phone: '۰۲۱۸۸۷۷۶۶۵۵', email: 'h.karimi@taban.ir', role: 'انبار', consent: 'pending' },
];

for (let i = 0; i < 40; i++) {
  SALES_CONTACTS.push({
    id: `CNT-${100 + i}`,
    name: `مخاطب ${i + 1}`,
    company: i % 3 === 0 ? `شرکت ${i}` : undefined,
    phone: `۰۹۱${String(2000000 + i).slice(0, 8)}`,
    role: ['مدیر خرید', 'مالی', 'انبار', 'بازرگانی'][i % 4]!,
    consent: (['yes', 'pending', 'no'] as const)[i % 3]!,
  });
}
