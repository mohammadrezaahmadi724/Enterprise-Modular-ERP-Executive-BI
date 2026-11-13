import { listInventoryBalancesPrisma } from './inventory.repository.js';
import { listWmsStockDocumentsPrisma } from './wms-document.repository.js';
import { listWmsReservationsPrisma } from './wms-reservation.repository.js';

export type WmsHydrateTarget = {
  applyBalance: (sku: string, warehouse: string, onHand: number, reserved: number) => void;
  putReceipt: (doc: Record<string, unknown>) => void;
  putIssue: (doc: Record<string, unknown>) => void;
  putTransfer: (doc: Record<string, unknown>) => void;
  putReservation: (memo: Record<string, unknown>) => void;
};

export async function loadWmsStateFromPrisma(target: WmsHydrateTarget): Promise<{
  balances: number;
  documents: number;
  reservations: number;
}> {
  const balances = await listInventoryBalancesPrisma();
  for (const b of balances) {
    target.applyBalance(
      b.productId,
      b.warehouseId,
      Number(b.quantity),
      Number(b.reservedQuantity),
    );
  }

  const docs = await listWmsStockDocumentsPrisma();
  for (const d of docs) {
    if (d.kind === 'receipt') target.putReceipt(d.body);
    else if (d.kind === 'issue') target.putIssue(d.body);
    else target.putTransfer(d.body);
  }

  const reservations = await listWmsReservationsPrisma();
  for (const r of reservations) {
    target.putReservation(r.body);
  }

  return { balances: balances.length, documents: docs.length, reservations: reservations.length };
}
