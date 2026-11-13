export const MFG_HUB_KPIS = {
  openWorkOrders: 18,
  wipUnits: 4200,
  oeePct: 78,
  qcHold: 3,
};

export const MFG_WORK_ORDERS_PREVIEW = [
  { code: 'WO-1404-0218', product: 'محصول A · خط ۱', qty: 500, workCenter: 'خط A', status: 'در حال تولید' },
  { code: 'WO-1404-0219', product: 'محصول B · بسته‌بندی', qty: 1200, workCenter: 'خط B', status: 'QC' },
  { code: 'WO-1404-0220', product: 'محصول C · مونتاژ', qty: 320, workCenter: 'ایستگاه ۳', status: 'برنامه‌ریزی' },
] as const;
