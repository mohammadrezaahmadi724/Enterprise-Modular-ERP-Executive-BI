import { receivePurchaseOrder, type ReceivePurchaseOrderBody } from '../../bridges/procurement-wms.bridge';
import type {
  AddRfqQuoteBody,
  AwardRfqBody,
  CreatePurchaseOrderBody,
  CreatePurchaseRequestBody,
  CreateRfqBody,
  CreateSupplierBody,
} from '../../modules/procurement/procurement.dto';
import {
  addRfqQuote,
  approvePurchaseOrder,
  approvePurchaseRequest,
  awardRfq,
  createPurchaseOrder,
  createPurchaseRequest,
  createRfq,
  createSupplier,
  getProcurementOverview,
  getProcurementReports,
  getProcurementThresholds,
  listApprovedPurchaseRequests,
  listPurchaseOrders,
  listPurchaseRequests,
  listRfqs,
  listSuppliers,
  listSupplierInvoices,
  procurementSource,
} from '../../modules/procurement/procurement.service';
import { wmsSource } from '../../modules/wms/wms.service';

export {
  addRfqQuote,
  awardRfq,
  createPurchaseOrder,
  createPurchaseRequest,
  createRfq,
  createSupplier,
  getProcurementOverview,
  getProcurementReports,
  getProcurementThresholds,
  listApprovedPurchaseRequests,
  listPurchaseOrders,
  listPurchaseRequests,
  listRfqs,
  listSuppliers,
  listSupplierInvoices,
  procurementSource,
};

export async function approvePurchaseRequestCommand(number: string, approverUserId: string) {
  const request = await approvePurchaseRequest(number, { approverUserId, approverRole: 'CFO' });
  return { request, source: procurementSource() };
}

export async function approvePurchaseOrderCommand(number: string, approverUserId: string) {
  const order = await approvePurchaseOrder(number, { approverUserId, approverRole: 'CFO' });
  return { order, source: procurementSource() };
}

export async function createPurchaseRequestCommand(body: CreatePurchaseRequestBody) {
  const request = await createPurchaseRequest(body);
  return { request, source: procurementSource() };
}

export async function createPurchaseOrderCommand(body: CreatePurchaseOrderBody) {
  const order = await createPurchaseOrder(body);
  return { order, source: procurementSource() };
}

export async function receivePurchaseOrderCommand(number: string, body: ReceivePurchaseOrderBody) {
  const result = await receivePurchaseOrder(number, body);
  return { ...result, source: wmsSource() };
}

export async function createSupplierCommand(body: CreateSupplierBody) {
  const supplier = await createSupplier(body);
  return { supplier, source: procurementSource() };
}

export async function createRfqCommand(body: CreateRfqBody) {
  const rfq = await createRfq(body);
  return { rfq, source: procurementSource() };
}

export async function addRfqQuoteCommand(number: string, body: AddRfqQuoteBody) {
  const rfq = await addRfqQuote(number, body);
  return { rfq, source: procurementSource() };
}

export async function awardRfqCommand(number: string, body: AwardRfqBody) {
  const result = await awardRfq(number, body);
  return { ...result, source: procurementSource() };
}
