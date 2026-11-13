'use client';

import { ProcurementHubOverviewClient } from './ProcurementHubOverviewClient';
import { ProcurementPurchaseOrdersScreen } from './ProcurementPurchaseOrdersScreen';
import { ProcurementPurchaseRequestsScreen } from './ProcurementPurchaseRequestsScreen';
import { ProcurementReceiptsScreen } from './ProcurementReceiptsScreen';
import { ProcurementReportsScreen } from './ProcurementReportsScreen';
import { ProcurementRfqScreen } from './ProcurementRfqScreen';
import { ProcurementSupplierInvoicesScreen } from './ProcurementSupplierInvoicesScreen';
import { ProcurementSuppliersScreen } from './ProcurementSuppliersScreen';

const PROCUREMENT_SCREEN_MAP: Record<string, () => React.ReactNode> = {
  '/procurement': ProcurementHubOverviewClient,
  '/procurement/purchase-requests': ProcurementPurchaseRequestsScreen,
  '/procurement/purchase-orders': ProcurementPurchaseOrdersScreen,
  '/procurement/suppliers': ProcurementSuppliersScreen,
  '/procurement/rfq': ProcurementRfqScreen,
  '/procurement/reports': ProcurementReportsScreen,
  '/procurement/receipts': ProcurementReceiptsScreen,
  '/procurement/supplier-invoices': ProcurementSupplierInvoicesScreen,
};

export function renderProcurementScreen(href: string): React.ReactNode | null {
  const exact = PROCUREMENT_SCREEN_MAP[href];
  if (exact) return exact();
  return null;
}
