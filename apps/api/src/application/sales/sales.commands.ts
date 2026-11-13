import { fulfillSalesOrder } from '../../bridges/sales-fulfillment.bridge';
import { postSalesReturnWithRestock } from '../../bridges/sales-return-wms.bridge';
import type {
  CreateInvoiceBody,
  CreateOrderBody,
  CreateQuoteBody,
  CreateReturnBody,
  FulfillSalesOrderBody,
  PostReturnBody,
} from '../../modules/sales/sales.dto';
import {
  confirmOrderSupply,
  createInvoice,
  createOrder,
  createQuote,
  createReturn,
  createReturnFromInvoice,
  postInvoice,
  postReturn,
  salesDocSource,
} from '../../modules/sales/sales.service';

export async function createQuoteCommand(body: CreateQuoteBody) {
  return { quote: await createQuote(body), source: salesDocSource() };
}

export async function createOrderCommand(body: CreateOrderBody) {
  return { order: await createOrder(body), source: salesDocSource() };
}

export async function confirmOrderSupplyCommand(number: string) {
  return { ...(await confirmOrderSupply(number)), source: salesDocSource() };
}

export async function fulfillSalesOrderCommand(
  number: string,
  body: FulfillSalesOrderBody,
  approverUserId?: string,
) {
  const needsUser = body.postCogs || body.autoPostInvoice;
  const result = await fulfillSalesOrder(number, body, needsUser ? approverUserId : undefined);
  return { ...result, source: salesDocSource() };
}

export async function createInvoiceCommand(body: CreateInvoiceBody) {
  return { invoice: await createInvoice(body), source: salesDocSource() };
}

export async function postInvoiceCommand(number: string, approverUserId: string) {
  const invoice = await postInvoice(number, approverUserId);
  return { invoice, status: 'posted' as const, source: salesDocSource() };
}

export async function createReturnFromInvoiceCommand(number: string, reason?: string) {
  return { return: await createReturnFromInvoice(number, reason), source: salesDocSource() };
}

export async function createReturnCommand(body: CreateReturnBody) {
  return { return: await createReturn(body), source: salesDocSource() };
}

export async function postReturnCommand(id: string, body: PostReturnBody, approverUserId: string) {
  if (body.restock) {
    const result = await postSalesReturnWithRestock(id, approverUserId, true);
    return {
      return: result.memo,
      status: 'posted' as const,
      wmsReceiptDocNo: result.receiptDocNo,
      source: salesDocSource(),
    };
  }
  const memo = await postReturn(id, approverUserId);
  return { return: memo, status: 'posted' as const, source: salesDocSource() };
}
