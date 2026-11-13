export const QC_HUB_KPIS = {
  inspectionsToday: 8,
  passRatePct: 94,
  onHold: 3,
  failedLots: 1,
};

export const QC_INSPECTIONS_PREVIEW = [
  { code: 'QC-88401', workOrder: 'WO-1404-0218', product: 'محصول A', result: 'قبول', date: '۱۴۰۴/۰۸/۱۲' },
  { code: 'QC-88402', workOrder: 'WO-1404-0219', product: 'محصول B', result: 'نگه‌داری', date: '۱۴۰۴/۰۸/۱۲' },
  { code: 'QC-88403', workOrder: 'WO-1404-0220', product: 'محصول C', result: 'قبول', date: '۱۴۰۴/۰۸/۱۱' },
] as const;
