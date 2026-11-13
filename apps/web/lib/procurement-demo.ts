import { formatToman } from './finance-receivables-demo';

export type PrStatus = 'draft' | 'sent' | 'approved' | 'rejected' | 'canceled';
export type PoStatus = 'draft' | 'sent' | 'approved' | 'partial_receipt' | 'full_receipt' | 'canceled';

export const PROCUREMENT_HUB_KPIS = {
  pendingRequestToman: 5_419_000_000,
  pendingRequestIds: ['PR-00008', 'PR-00004', 'PR-00005'],
  openPoToman: 5_123_000_000,
  overduePoCount: 3,
  dueThisWeekPoCount: 2,
  incompleteReceiptCount: 0,
  activeSuppliers: 57,
  newSuppliersThisYear: 57,
};

export const PROCUREMENT_MONTHLY_TREND = [
  { period: '1405/02', orderToman: 1_200_000_000 },
  { period: '1405/03', orderToman: 980_000_000 },
  { period: '1405/04', orderToman: 1_450_000_000 },
  { period: '1405/05', orderToman: 1_100_000_000 },
  { period: '1405/06', orderToman: 1_750_000_000 },
  { period: '1405/07', orderToman: 2_100_000_000 },
  { period: '1405/08', orderToman: 1_850_000_000 },
];

export type DemoPurchaseRequest = {
  number: string;
  title: string;
  warehouse?: string;
  project?: string;
  costCenter?: string;
  requestDate: string;
  needDate?: string;
  estimatedToman: number;
  status: PrStatus;
};

export const DEMO_PURCHASE_REQUESTS: DemoPurchaseRequest[] = [
  {
    number: 'PR-00008',
    title: 'تأمین نایلون استرچ ۳۰ میکرون برای جشنواره فروش',
    requestDate: '۱۴۰۵/۰۷/۱۲',
    estimatedToman: 140_000_000,
    status: 'sent',
  },
  {
    number: 'PR-00004',
    title: 'درخواست خرید میلگرد برای پروژه مرکزی',
    warehouse: 'WH-ESF',
    project: 'PRJ-0024',
    costCenter: 'CC-310',
    requestDate: '۱۴۰۵/۰۷/۰۸',
    needDate: '۱۴۰۵/۰۷/۲۵',
    estimatedToman: 890_000_000,
    status: 'approved',
  },
  {
    number: 'PR-00005',
    title: 'خرید لوبیا برای انبار مرکزی تهران',
    warehouse: 'WH-THR',
    requestDate: '۱۴۰۵/۰۷/۱۰',
    estimatedToman: 45_000_000,
    status: 'sent',
  },
  {
    number: 'PR-00217',
    title: 'تأمین خرما و پسته — پخش کرمان',
    warehouse: 'WH-MSH',
    project: 'PRJ-0018',
    costCenter: 'CC-220',
    requestDate: '۱۴۰۵/۰۸/۰۱',
    needDate: '۱۴۰۵/۰۸/۱۵',
    estimatedToman: 320_000_000,
    status: 'approved',
  },
];

export const PR_STATUS_LABEL: Record<PrStatus, string> = {
  draft: 'پیش‌نویس',
  sent: 'ارسال‌شده',
  approved: 'تأیید‌شده',
  rejected: 'رد‌شده',
  canceled: 'لغو‌شده',
};

export const PO_STATUS_LABEL: Record<PoStatus, string> = {
  draft: 'پیش‌نویس',
  sent: 'ارسال‌شده',
  approved: 'تأیید‌شده',
  partial_receipt: 'دریافت جزئی',
  full_receipt: 'دریافت کامل',
  canceled: 'لغو‌شده',
};

export function formatProcurementToman(n: number): string {
  return `${formatToman(n)} تومان`;
}

export type RfqStatus = 'draft' | 'open' | 'comparing' | 'awarded' | 'closed';

export const RFQ_STATUS_LABEL: Record<RfqStatus, string> = {
  draft: 'پیش‌نویس',
  open: 'باز — در انتظار پاسخ',
  comparing: 'مقایسه پیشنهادها',
  awarded: 'برنده انتخاب شد',
  closed: 'بسته',
};

export const DEMO_RFQS = [
  {
    number: 'RFQ-00012',
    title: 'استعلام میلگرد پروژه مرکزی',
    purchaseRequestNumber: 'PR-00004',
    deadline: '۱۴۰۵/۰۸/۱۸',
    status: 'comparing' as RfqStatus,
    invitedSupplierCodes: ['SUP-12116', 'SUP-11002', 'SUP-12001'],
    quotes: [
      {
        supplierCode: 'SUP-12116',
        supplierName: 'پخش سراسری ظفر کرمان',
        submittedAt: '۱۴۰۵/۰۸/۱۰',
        totalToman: 875_000_000,
        lines: [{ sku: 'PRD-STEEL', quantity: 12, unit: 'تن', unitPriceToman: 72_916_666, leadDays: 7 }],
      },
      {
        supplierCode: 'SUP-11002',
        supplierName: 'بازرگانی آریا',
        submittedAt: '۱۴۰۵/۰۸/۱۱',
        totalToman: 912_000_000,
        lines: [{ sku: 'PRD-STEEL', quantity: 12, unit: 'تن', unitPriceToman: 76_000_000, leadDays: 5 }],
      },
    ],
  },
  {
    number: 'RFQ-00009',
    title: 'استعلام نایلون استرچ جشنواره',
    purchaseRequestNumber: 'PR-00008',
    deadline: '۱۴۰۵/۰۸/۲۰',
    status: 'open' as RfqStatus,
    invitedSupplierCodes: ['SUP-12001'],
    quotes: [],
  },
];
