import type { ErpModuleCode, ModuleCatalogEntry } from '@repo/contracts';
import {
  listPlansWithModules,
  loadModuleCatalog,
  saveModuleCatalog,
  updatePlanModules,
} from '../../modules/platform/pricing-catalog.service';
import {
  clearCloudSubscriptionOverrides,
  loadCloudSubscriptionRates,
  saveCloudSubscriptionRates,
  type CloudSubscriptionPatch,
} from '../../modules/platform/cloud-subscription.service';
import { loadMarketingSite, saveMarketingSite } from '../../modules/platform/marketing-site.service';
import type { MarketingSiteContent } from '@repo/contracts';

export function moduleCatalogQuery() {
  return loadModuleCatalog();
}

export async function saveModuleCatalogCommand(modules: ModuleCatalogEntry[]) {
  await saveModuleCatalog(modules);
  return loadModuleCatalog();
}

export function plansWithModulesQuery() {
  return listPlansWithModules();
}

export function cloudSubscriptionQuery() {
  return loadCloudSubscriptionRates();
}

export function saveCloudSubscriptionCommand(body: CloudSubscriptionPatch) {
  return saveCloudSubscriptionRates(body);
}

export function clearCloudSubscriptionCommand() {
  return clearCloudSubscriptionOverrides();
}

export function marketingSiteQuery() {
  return loadMarketingSite();
}

export function saveMarketingSiteCommand(patch: Partial<MarketingSiteContent>) {
  return saveMarketingSite(patch);
}

export async function updatePlanModulesCommand(
  planId: string,
  body: { includedModules: ErpModuleCode[]; modulePrices: Partial<Record<ErpModuleCode, number>> },
) {
  return { plan: await updatePlanModules(planId, body) };
}
