import { formatToman } from './finance-receivables-demo';

export { formatToman };

export type QuoteStatus = 'draft' | 'accepted' | 'rejected' | 'expired';

export type SalesQuote = {
  number: string;
  accountCode: string;
  accountName?: string;
  totalToman: number;
  validUntil: string;
  status: QuoteStatus;
};

export const NEXT_QUOTE_NUMBER = 'QT-0325';
export const QUOTES_TOTAL = 325;

export const SALES_QUOTES: SalesQuote[] = [
  { number: 'QT-0324', accountCode: 'CUS-DEMO-020', totalToman: 4_850_000, validUntil: '۱۴۰۵/۰۸/۲۲', status: 'draft' },
  { number: 'QT-0323', accountCode: 'CUS-1154', totalToman: 3_150_000, validUntil: '۱۴۰۵/۰۸/۲۰', status: 'accepted' },
  { number: 'QT-0322', accountCode: 'CUS-1101', totalToman: 12_400_000, validUntil: '۱۴۰۵/۰۸/۱۸', status: 'draft' },
  { number: 'QT-0321', accountCode: 'CUS-1004', totalToman: 890_000, validUntil: '۱۴۰۵/۰۸/۱۵', status: 'accepted' },
];

for (let i = 0; i < 30; i++) {
  SALES_QUOTES.push({
    number: `QT-${320 - i}`,
    accountCode: `CUS-${1100 + i}`,
    totalToman: (i + 1) * 275_000,
    validUntil: `۱۴۰۵/۰۸/${10 + (i % 18)}`,
    status: i % 4 === 0 ? 'accepted' : 'draft',
  });
}

export function formatQuoteAmount(n: number): string {
  return `${formatToman(n)}`;
}
