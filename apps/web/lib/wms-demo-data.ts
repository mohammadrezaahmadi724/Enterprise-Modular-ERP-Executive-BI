import { formatToman } from './finance-receivables-demo';

export { formatToman };

export type StockStatus = 'ok' | 'low' | 'out';

export type WmsStockRow = {
  sku: string;
  name: string;
  warehouse: string;
  onHand: number;
  reserved: number;
  blocked: number;
  available: number;
  status: StockStatus;
};

export type WmsMovement = {
  id: string;
  type: 'receipt' | 'issue';
  date: string;
  status: 'posted';
};

export type StocktakingSession = {
  id: string;
  warehouse: string;
  warehouseLabel: string;
  countDate: string;
  status: 'reconciled' | 'draft';
  totalLines: number;
  varianceLines: number;
  varianceToman: number;
};

export type WmsReservation = {
  id: string;
  sku: string;
  itemName: string;
  warehouse: string;
  warehouseLabel: string;
  reference: string;
  qty: number;
  expiry: string | null;
  status: 'active' | 'released' | 'consumed';
};

export type WmsStockDoc = {
  docNo: string;
  date: string;
  party: string;
  orderRef: string;
  source: string;
  status: 'posted';
};

const PRODUCT_NAMES: Record<string, string> = {
  'PRD-1016': 'نمک یددار تصفیه‌شده',
  'PRD-CHAY': 'چای سیاه ممتاز',
  'PRD-BRN3': 'برنج هاشمی طارم',
  'PRD-1001': 'روغن آفتابگردان ۱۰ لیتری',
  'PRD-2044': 'رب گوجه صنعتی',
};

function mkStock(i: number): WmsStockRow {
  const skus = Object.keys(PRODUCT_NAMES);
  const sku = skus[i % skus.length]!;
  const wh = ['WH-ESF', 'WH-MSH', 'WH-THR'][i % 3]!;
  const onHand = 800 + (i % 17) * 227;
  const reserved = i % 11 === 0 ? 56 + (i % 40) : i % 7 === 0 ? 12 : 0;
  const blocked = i % 13 === 0 ? 8 : 0;
  const available = onHand - reserved - blocked;
  let status: StockStatus = 'ok';
  if (available <= 0) status = 'out';
  else if (available < 120) status = 'low';
  return {
    sku,
    name: PRODUCT_NAMES[sku] ?? `کالای ${sku}`,
    warehouse: wh,
    onHand,
    reserved,
    blocked,
    available,
    status,
  };
}

export const WMS_STOCK_ROWS: WmsStockRow[] = Array.from({ length: 100 }, (_, i) => mkStock(i));

export const WMS_OVERVIEW_KPIS = {
  activeWarehouses: 4,
  recentReservations: 4,
  criticalSkus: 0,
  expiringLotsWithin30: 0,
};

export const WMS_STOCK_PREVIEW = WMS_STOCK_ROWS.slice(0, 6);

export const WMS_RECENT_MOVEMENTS: WmsMovement[] = [
  { id: 'STK-F34F8A12C901', type: 'issue', date: '۱۴۰۵/۰۸/۱۲', status: 'posted' },
  { id: 'STK-A366C4852656', type: 'receipt', date: '۱۴۰۵/۰۸/۱۲', status: 'posted' },
  { id: 'STK-0304617E4F7C', type: 'issue', date: '۱۴۰۵/۰۸/۱۱', status: 'posted' },
  { id: 'STK-CC1E2B359F4D', type: 'receipt', date: '۱۴۰۵/۰۸/۱۰', status: 'posted' },
];

export const WMS_STOCKTAKING: StocktakingSession[] = [
  {
    id: 'CNT-20261108-06F8',
    warehouse: 'WH-THR',
    warehouseLabel: 'انبار مرکزی تهران',
    countDate: '۱۴۰۵/۰۷/۱۲',
    status: 'reconciled',
    totalLines: 65,
    varianceLines: 6,
    varianceToman: -813_000,
  },
  {
    id: 'CNT-20261108-0A2B',
    warehouse: 'WH-QAIM',
    warehouseLabel: 'انبار آزمون ایمپورت',
    countDate: '۱۴۰۵/۰۷/۳۰',
    status: 'draft',
    totalLines: 0,
    varianceLines: 0,
    varianceToman: 0,
  },
];

export const WMS_RESERVATIONS: WmsReservation[] = [
  {
    id: 'R8098371',
    sku: 'PRD-1016',
    itemName: 'نمک یددار تصفیه‌شده',
    warehouse: 'WH-ESF',
    warehouseLabel: 'انبار اصفهان',
    reference: 'SO-0480',
    qty: 120,
    expiry: null,
    status: 'active',
  },
  {
    id: 'R8098402',
    sku: 'PRD-CHAY',
    itemName: 'چای سیاه ممتاز',
    warehouse: 'WH-MSH',
    warehouseLabel: 'انبار مشهد',
    reference: 'SO-0478',
    qty: 856,
    expiry: '۱۴۰۵/۰۹/۰۱',
    status: 'consumed',
  },
];

for (let i = 0; i < 18; i++) {
  WMS_RESERVATIONS.push({
    id: `R80${98000 + i}`,
    sku: i % 2 ? 'PRD-BRN3' : 'PRD-1001',
    itemName: i % 2 ? 'برنج هاشمی طارم' : 'روغن آفتابگردان ۱۰ لیتری',
    warehouse: ['WH-ESF', 'WH-THR'][i % 2]!,
    warehouseLabel: i % 2 ? 'انبار اصفهان' : 'انبار مرکزی تهران',
    reference: `SO-04${70 + i}`,
    qty: 20 + i * 3,
    expiry: i % 3 === 0 ? `۱۴۰۵/۰۹/${10 + i}` : null,
    status: i % 5 === 0 ? 'released' : i % 4 === 0 ? 'consumed' : 'active',
  });
}

export const WMS_RECEIPTS: WmsStockDoc[] = [
  {
    docNo: 'STK-A366C4852656',
    date: '۱۴۰۵/۰۸/۱۲',
    party: '—',
    orderRef: 'PO-۰۰۱۲۷۴',
    source: 'سیستم',
    status: 'posted',
  },
  {
    docNo: 'STK-9F12B883A201',
    date: '۱۴۰۵/۰۸/۱۱',
    party: 'تأمین صنعت غذا',
    orderRef: 'PO-۰۰۱۲۷۰',
    source: 'سایر',
    status: 'posted',
  },
];

for (let i = 0; i < 28; i++) {
  WMS_RECEIPTS.push({
    docNo: `STK-${(1000 + i).toString(16).toUpperCase()}${i}`,
    date: `۱۴۰۵/۰۸/${8 + (i % 12)}`,
    party: i % 3 ? 'تأمین‌کننده نمونه' : '—',
    orderRef: i % 2 ? `PO-۰۰۱${260 + i}` : '—',
    source: i % 4 ? 'سیستم' : 'سایر',
    status: 'posted',
  });
}

export const WMS_ISSUES: WmsStockDoc[] = [
  {
    docNo: 'STK-0304617E4F7C',
    date: '۱۴۰۵/۰۹/۰۵',
    party: '—',
    orderRef: 'SO-0475',
    source: 'تحویل',
    status: 'posted',
  },
];

for (let i = 0; i < 24; i++) {
  WMS_ISSUES.push({
    docNo: `STK-I${i.toString(16).toUpperCase()}${100 + i}`,
    date: `۱۴۰۵/۰۸/${5 + (i % 15)}`,
    party: i % 2 ? 'مشتری نمونه' : '—',
    orderRef: `SO-04${60 + i}`,
    source: 'تحویل',
    status: 'posted',
  });
}

export const WMS_TRANSFERS: WmsStockDoc[] = [
  {
    docNo: 'STK-CC1E2B359F4D',
    date: '۱۴۰۵/۰۸/۱۳',
    party: '—',
    orderRef: 'demo-bulk-trf-14050802',
    source: 'انتقال بین انبار',
    status: 'posted',
  },
];

for (let i = 0; i < 24; i++) {
  WMS_TRANSFERS.push({
    docNo: `STK-T${i}${200}`,
    date: `۱۴۰۵/۰۸/${6 + (i % 10)}`,
    party: '—',
    orderRef: `trf-${i}`,
    source: 'انتقال بین انبار',
    status: 'posted',
  });
}

export type TrackingContract = {
  sku: string;
  name: string;
  baseUnit: string;
  method: string;
  decimals: number;
  fefo: boolean;
  minShelf: string;
  flags: string[];
  version: number;
};

export const WMS_TRACKING: TrackingContract[] = [
  {
    sku: 'AP-DET-01',
    name: 'پودر لباسشویی ماشینی ۵۰۰ گرمی',
    baseUnit: 'عدد',
    method: 'بدون ردیابی',
    decimals: 0,
    fefo: false,
    minShelf: '—',
    flags: ['قرنطینه‌پذیر'],
    version: 1,
  },
  {
    sku: 'AP-DET-02',
    name: 'مایع ظرفشویی ۷۵۰ گرمی',
    baseUnit: 'عدد',
    method: 'بدون ردیابی',
    decimals: 0,
    fefo: false,
    minShelf: '—',
    flags: ['قرنطینه‌پذیر'],
    version: 1,
  },
];

for (let i = 0; i < 40; i++) {
  WMS_TRACKING.push({
    sku: `AP-DET-${String(10 + i).padStart(2, '0')}`,
    name: `کالای مصرفی ${i + 1}`,
    baseUnit: 'عدد',
    method: ['بدون ردیابی', 'ردیابی بهر', 'سریال یکتا'][i % 3]!,
    decimals: 0,
    fefo: i % 5 === 0,
    minShelf: '—',
    flags: ['قرنطینه‌پذیر'],
    version: 1,
  });
}

export const WMS_KARDEX_WAREHOUSE_STATS = [
  { code: 'WH-ESF', rows: 41, ok: 39, reserved: 2, out: 0 },
  { code: 'WH-MSH', rows: 24, ok: 23, reserved: 1, out: 0 },
  { code: 'WH-THR', rows: 35, ok: 34, reserved: 1, out: 0 },
];

export const WMS_KARDEX_TOTALS = { ok: 96, reservedBlocked: 4, out: 0 };

export const STATUS_FA: Record<StockStatus, string> = {
  ok: 'کافی',
  low: 'کم‌موجود',
  out: 'ناموجود',
};
