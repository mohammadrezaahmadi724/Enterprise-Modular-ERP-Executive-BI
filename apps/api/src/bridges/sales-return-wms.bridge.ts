import { NotFoundException } from '@nestjs/common';
import type { SalesReturnDto } from '../modules/sales/sales.dto';
import {
  attachWmsReceiptToReturn,
  getInvoice,
  postReturn,
  recordSalesReturnRestocked,
} from '../modules/sales/sales.service';
import { SALES_WMS_WAREHOUSE_BY_SKU } from './sales-wms.bridge';
import { createReceipt } from '../modules/wms/wms.service';

export async function postSalesReturnWithRestock(
  returnId: string,
  approverUserId: string,
  restock = true,
): Promise<{ memo: SalesReturnDto; receiptDocNo?: string }> {
  const memo = await postReturn(returnId, approverUserId);
  if (!restock) return { memo };

  const invoice = await getInvoice(memo.sourceInvoice);
  if (!invoice) throw new NotFoundException(`Invoice ${memo.sourceInvoice} not found`);

  const lines = memo.lines.map((line) => ({
    sku: line.sku,
    warehouse: SALES_WMS_WAREHOUSE_BY_SKU[line.sku] ?? 'WH-ESF',
    quantity: line.quantity,
    unitPriceRial: line.unitPriceRial,
    reference: memo.id,
  }));

  const receipt = await createReceipt({
    party: memo.customerName,
    reference: `برگشت ${memo.id}`,
    orderRef: invoice.orderNumber,
    salesReturnId: memo.id,
    lines,
  });

  const withReceipt = attachWmsReceiptToReturn(memo.id, receipt.docNo);
  await recordSalesReturnRestocked(memo.id, receipt.docNo);
  return { memo: withReceipt, receiptDocNo: receipt.docNo };
}
