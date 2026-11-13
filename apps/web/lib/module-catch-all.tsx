import { findMenuItemByHref, TENANT_MODULES } from '@repo/ui';
import { notFound } from 'next/navigation';
import { ModuleHub } from '../components/module-placeholder';
import { ErpScreenByHref } from '../components/erp-screen-by-href';
import { FinanceHubOverviewClient } from '../components/finance/FinanceHubOverviewClient';
import { SalesHubOverviewClient } from '../components/sales/SalesHubOverviewClient';
import { WmsHubOverviewClient } from '../components/wms/WmsHubOverviewClient';
import { ProcurementHubOverviewClient } from '../components/procurement/ProcurementHubOverviewClient';
import { ProjectsHubOverviewClient } from '../components/projects/ProjectsHubOverviewClient';
import { ManufacturingHubOverviewClient } from '../components/manufacturing/ManufacturingHubOverviewClient';
import { DistributionHubOverviewClient } from '../components/distribution/DistributionHubOverviewClient';
import { RetailHubOverviewClient } from '../components/retail/RetailHubOverviewClient';
import { BiModuleEntitlementGate } from '../components/bi/BiModuleEntitlementGate';
import { HrHubOverviewClient } from '../components/hr/HrHubOverviewClient';
import { AiHubOverviewClient } from '../components/ai/AiHubOverviewClient';

export function resolveCatchAll(moduleId: string, basePath: string, slug?: string[]) {
  const mod = TENANT_MODULES.find((m) => m.id === moduleId);
  if (!mod) notFound();

  if (!slug?.length) {
    if (moduleId === 'finance') return <FinanceHubOverviewClient />;
    if (moduleId === 'sales') return <SalesHubOverviewClient />;
    if (moduleId === 'inventory' && basePath === '/wms') return <WmsHubOverviewClient />;
    if (moduleId === 'inventory' && basePath === '/procurement') return <ProcurementHubOverviewClient />;
    if (moduleId === 'projects' && basePath === '/projects') return <ProjectsHubOverviewClient />;
    if (moduleId === 'manufacturing') return <ManufacturingHubOverviewClient />;
    if (moduleId === 'distribution') return <DistributionHubOverviewClient />;
    if (moduleId === 'retail') return <RetailHubOverviewClient />;
    if (moduleId === 'bi') return <BiModuleEntitlementGate />;
    if (moduleId === 'hr') return <HrHubOverviewClient />;
    if (moduleId === 'ai') return <AiHubOverviewClient />;
    return <ModuleHub module={mod} />;
  }

  const href = `${basePath}/${slug.join('/')}`;
  const found = findMenuItemByHref(href);
  return <ErpScreenByHref href={href} />;
}
