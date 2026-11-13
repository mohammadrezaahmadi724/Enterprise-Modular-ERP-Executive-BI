export type QcResultCode = 'Pass' | 'Fail' | 'Conditional';

export type QcInspectionRow = {
  id: string;
  tenantId: string;
  code: string;
  productionOrderId: string;
  workOrderNumber: string;
  productLabel: string;
  inspectionDate: string;
  result: QcResultCode;
  resultFa: string;
};

export type QcOverviewDto = {
  kpis: {
    inspectionsToday: number;
    passRatePct: number;
    onHold: number;
    failedLots: number;
  };
  preview: QcInspectionRow[];
};
