import { TenantContext } from '@repo/domain';
import { listPurchaseOrders, listPurchaseRequests } from '../modules/procurement/procurement.service';

export type ProjectProcurementLink = {
  purchaseRequests: Array<{ number: string; title: string; status: string; estimatedToman: number }>;
  purchaseOrders: Array<{ number: string; supplierName: string; status: string; totalToman: number }>;
  /** PR تأییدشده که هنوز PO ندارند — مناسب «صدور سفارش سریع» */
  readyForPurchaseOrder: Array<{ purchaseRequestNumber: string; title: string; estimatedToman: number }>;
  /** PR ارسال‌شده برای workflow CFO */
  pendingApproval: Array<{ purchaseRequestNumber: string; title: string; estimatedToman: number }>;
  /** PO تأییدشده آماده ثبت رسید WMS */
  readyForReceipt: Array<{
    purchaseOrderNumber: string;
    supplierName: string;
    totalToman: number;
    status: string;
    lineCount: number;
  }>;
};

/** Cross-module read via procurement service facade (no direct table access from projects domain UI). */
export async function readProjectProcurementLinks(projectCode: string): Promise<ProjectProcurementLink> {
  void TenantContext.requireTenantId();
  const key = projectCode.trim();
  const matchProject = (p?: string) => {
    if (!p || p === '—') return false;
    return p === key || p.startsWith(key) || key.startsWith(p);
  };

  const purchaseRequests = (await listPurchaseRequests())
    .filter((r) => matchProject(r.project))
    .map((r) => ({
      number: r.number,
      title: r.title,
      status: r.status,
      estimatedToman: r.estimatedToman,
    }));

  const purchaseRequestsAll = await listPurchaseRequests();
  const prProjectByNumber = new Map(
    purchaseRequestsAll.filter((r) => r.project && r.project !== '—').map((r) => [r.number, r.project!.trim()]),
  );

  const ordersRaw = await listPurchaseOrders();
  const poByPr = new Set(ordersRaw.map((o) => o.purchaseRequestNumber).filter(Boolean));

  const purchaseOrders = ordersRaw
    .filter((o) => {
      const direct = matchProject(o.project);
      if (direct) return true;
      if (!o.purchaseRequestNumber) return false;
      const linked = prProjectByNumber.get(o.purchaseRequestNumber);
      return linked ? matchProject(linked) : false;
    })
    .map((o) => ({
      number: o.number,
      supplierName: o.supplierName,
      status: o.status,
      totalToman: o.totalToman,
    }));

  const matchedPrs = purchaseRequestsAll.filter((r) => matchProject(r.project));

  const readyForPurchaseOrder = matchedPrs
    .filter((r) => r.status === 'approved' && !poByPr.has(r.number))
    .map((r) => ({
      purchaseRequestNumber: r.number,
      title: r.title,
      estimatedToman: r.estimatedToman,
    }));

  const pendingApproval = matchedPrs
    .filter((r) => r.status === 'sent')
    .map((r) => ({
      purchaseRequestNumber: r.number,
      title: r.title,
      estimatedToman: r.estimatedToman,
    }));

  const projectOrders = ordersRaw.filter((o) => {
    const direct = matchProject(o.project);
    if (direct) return true;
    if (!o.purchaseRequestNumber) return false;
    const linked = prProjectByNumber.get(o.purchaseRequestNumber);
    return linked ? matchProject(linked) : false;
  });

  const readyForReceipt = projectOrders
    .filter((o) => o.status === 'approved' || o.status === 'partial_receipt')
    .map((o) => ({
      purchaseOrderNumber: o.number,
      supplierName: o.supplierName,
      totalToman: o.totalToman,
      status: o.status,
      lineCount: o.lines.length,
    }));

  return { purchaseRequests, purchaseOrders, readyForPurchaseOrder, pendingApproval, readyForReceipt };
}
