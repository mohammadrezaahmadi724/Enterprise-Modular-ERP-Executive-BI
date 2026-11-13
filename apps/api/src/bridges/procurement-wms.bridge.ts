import { BadRequestException } from '@nestjs/common';
import { OPS_EVENTS } from '@repo/contracts';
import { TenantContext } from '@repo/domain';
import { recordDomainEvent } from '../outbox/record-domain-event';
import { createReceipt } from '../modules/wms/wms.service';
import { applyPurchaseOrderReceiptProgress, getPurchaseOrder } from '../modules/procurement/procurement.service';
import type { WmsLineDto } from '../modules/wms/wms.dto';

const DEFAULT_WH = 'WH-ESF';

export type ReceivePurchaseOrderBody = {
  party?: string;
  lines: Array<{
    sku: string;
    warehouse?: string;
    quantity: number;
    unitPriceRial?: number;
  }>;
};

export async function receivePurchaseOrder(
  poNumber: string,
  body: ReceivePurchaseOrderBody,
): Promise<{ receiptDocNo: string; poNumber: string }> {
  const key = poNumber.trim();
  if (!key) throw new BadRequestException('poNumber is required');
  if (!body.lines?.length) throw new BadRequestException('At least one line is required');

  const po = getPurchaseOrder(key);
  if (po && po.status !== 'approved' && po.status !== 'partial_receipt') {
    throw new BadRequestException(`purchase order ${key} is not approved for receipt`);
  }

  const lines: WmsLineDto[] = body.lines.map((line) => ({
    sku: line.sku.trim(),
    warehouse: line.warehouse?.trim() || DEFAULT_WH,
    quantity: line.quantity,
    unitPriceRial: line.unitPriceRial,
  }));

  const receipt = await createReceipt({
    party: body.party?.trim() || 'تأمین‌کننده',
    orderRef: key,
    reference: `رسید خرید ${key}`,
    lines,
  });

  const tenantId = TenantContext.requireTenantId();
  await recordDomainEvent({
    eventType: OPS_EVENTS.PROCUREMENT_COMPLETED,
    aggregateId: key,
    payload: {
      poNumber: key,
      receiptDocNo: receipt.docNo,
      tenantId,
      lineCount: lines.length,
    },
    sourceSchema: 'erp_operations',
  });

  applyPurchaseOrderReceiptProgress(
    key,
    lines.map((l) => ({ sku: l.sku, quantity: l.quantity })),
  );

  return { receiptDocNo: receipt.docNo, poNumber: key };
}
