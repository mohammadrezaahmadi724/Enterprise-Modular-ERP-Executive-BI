import { createWmsIssueForSalesOrder } from '../../bridges/sales-wms.bridge';
import type { CreateStockDocBody } from '../../modules/wms/wms.dto';
import {
  createAdjustment,
  createBatch,
  createReceipt,
  createReservation,
  createStocktakingSession,
  createTransfer,
  getDocument,
  getKardex,
  getOverview,
  getReservation,
  getSerialNumbers,
  getStocktakingSession,
  getTrackingContracts,
  getValuationReconciliation,
  getValuationReconciliationCsv,
  listBatches,
  listExpiringBatches,
  listIssues,
  listReceipts,
  listReconciliations,
  listReservations,
  listStock,
  listStocktakingSessions,
  listTransfers,
  postStocktakingSession,
  registerSerialNumbers,
  runBatchExpiry,
  runReconciliation,
  runWmsExpiryMaintenance,
  suggestFefoPick,
  updateStocktakingLine,
  wmsSource,
  wmsTrackingSource,
  type WmsAdjustmentOptions,
} from '../../modules/wms/wms.service';

export {
  createAdjustment,
  createBatch,
  createReceipt,
  createReservation,
  createStocktakingSession,
  createTransfer,
  getDocument,
  getKardex,
  getOverview,
  getReservation,
  getSerialNumbers,
  getStocktakingSession,
  getTrackingContracts,
  getValuationReconciliation,
  getValuationReconciliationCsv,
  listBatches,
  listExpiringBatches,
  listIssues,
  listReceipts,
  listReconciliations,
  listReservations,
  listStock,
  listStocktakingSessions,
  listTransfers,
  postStocktakingSession,
  registerSerialNumbers,
  runBatchExpiry,
  runReconciliation,
  runWmsExpiryMaintenance,
  suggestFefoPick,
  updateStocktakingLine,
  wmsSource,
  wmsTrackingSource,
};

export async function createWmsIssueCommand(body: CreateStockDocBody, approverUserId: string) {
  const needsUser = body.postCogs || body.autoPostInvoice;
  const { doc, invoice } = await createWmsIssueForSalesOrder(body, needsUser ? approverUserId : undefined);
  return { issue: doc, invoice: invoice ?? null, source: wmsSource() };
}

export async function adjustWmsStockCommand(body: Parameters<typeof createAdjustment>[0], approverUserId: string) {
  const options: WmsAdjustmentOptions = { approverUserId, approverRole: 'CFO' };
  const result = await createAdjustment(body, options);
  return { ...result, source: wmsSource() };
}
