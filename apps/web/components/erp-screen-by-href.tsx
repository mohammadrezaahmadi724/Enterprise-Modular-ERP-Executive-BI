'use client';

import { getModuleScreen } from '../lib/erp-module-screens';
import { ModuleWorkbench } from './module-workbench';
import { renderFinanceScreen } from './finance/FinanceTabScreens';
import { renderSalesScreen } from './sales/SalesTabScreens';
import { renderWmsScreen } from './wms/WmsTabScreens';
import { renderProcurementScreen } from './procurement/ProcurementTabScreens';
import { renderProjectsScreen } from './projects/ProjectsTabScreens';

export function ErpScreenByHref({ href }: { href: string }) {
  const finance = renderFinanceScreen(href);
  if (finance) return finance;
  const sales = renderSalesScreen(href);
  if (sales) return sales;
  const wms = renderWmsScreen(href);
  if (wms) return wms;
  const procurement = renderProcurementScreen(href);
  if (procurement) return procurement;
  const projects = renderProjectsScreen(href);
  if (projects) return projects;
  const screen = getModuleScreen(href);
  return <ModuleWorkbench screen={screen} />;
}
