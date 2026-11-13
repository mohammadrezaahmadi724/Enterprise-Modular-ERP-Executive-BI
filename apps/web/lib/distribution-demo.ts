export const DIST_HUB_KPIS = {
  activeRoutes: 12,
  onTimePct: 91,
  pendingDeliveries: 34,
  openSettlements: 7,
};

export const DIST_DELIVERIES_PREVIEW = [
  { code: 'DLV-8841', route: 'تهران غرب · ویزیتور ۲', qty: 48, vehicle: '۱۲ب۳۴۵-۶۷', status: 'در مسیر' },
  { code: 'DLV-8842', route: 'اصفهان · مسیر ۴', qty: 120, vehicle: '۴۵ج۱۲۳-۴۴', status: 'تحویل' },
  { code: 'DLV-8843', route: 'مشهد · منطقه ۲', qty: 65, vehicle: '۸۸د۹۹۰-۱۱', status: 'تخصیص' },
] as const;
