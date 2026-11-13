'use client';

import { Suspense } from 'react';
import { WmsStockScreen } from './WmsStockScreen';
import { WmsKardexScreen } from './WmsKardexScreen';
import { WmsStocktakingScreen } from './WmsStocktakingScreen';
import { WmsReconciliationScreen } from './WmsReconciliationScreen';
import { WmsReservationsScreen } from './WmsReservationsScreen';
import { WmsReceiptsScreen } from './WmsReceiptsScreen';
import { WmsIssuesScreen } from './WmsIssuesScreen';
import { WmsTransfersScreen } from './WmsTransfersScreen';
import { WmsAdjustmentsScreen } from './WmsAdjustmentsScreen';
import { WmsTrackingScreen } from './WmsTrackingScreen';
import { WmsBatchesScreen } from './WmsBatchesScreen';
import { WmsSerialsScreen } from './WmsSerialsScreen';
import { WmsUomScreen } from './WmsUomScreen';
import { WmsReportsScreen } from './WmsReportsScreen';
import { WmsAssistantScreen } from './WmsAssistantScreen';

const WMS_SCREEN_MAP: Record<string, () => React.ReactNode> = {
  '/wms/stock': WmsStockScreen,
  '/wms/kardex': WmsKardexScreen,
  '/wms/stocktaking': WmsStocktakingScreen,
  '/wms/reconciliation': WmsReconciliationScreen,
  '/wms/reservations': WmsReservationsScreen,
  '/wms/receipts': function WmsReceiptsRoute() {
    return (
      <Suspense fallback={<p className="text-sm text-muted-foreground">در حال بارگذاری رسیدها…</p>}>
        <WmsReceiptsScreen />
      </Suspense>
    );
  },
  '/wms/issues': WmsIssuesScreen,
  '/wms/transfers': WmsTransfersScreen,
  '/wms/adjustments': WmsAdjustmentsScreen,
  '/wms/tracking': WmsTrackingScreen,
  '/wms/batches': WmsBatchesScreen,
  '/wms/serials': WmsSerialsScreen,
  '/wms/uom': WmsUomScreen,
  '/wms/reports': WmsReportsScreen,
  '/wms/assistant': WmsAssistantScreen,
};

export function renderWmsScreen(href: string): React.ReactNode | null {
  const exact = WMS_SCREEN_MAP[href];
  if (exact) return exact();
  return null;
}
