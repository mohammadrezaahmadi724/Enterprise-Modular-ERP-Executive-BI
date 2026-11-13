import {
  CORE_PLATFORM_FEE_IRR,
  DEFAULT_ERP_MODULE_CATALOG,
  PRICE_CATALOG_SETTING_KEY,
  PRICE_CATALOG_VERSION,
  computeWizardEstimate,
  tomansToIrr,
  type ErpModuleCode,
  type ModuleCatalogEntry,
  type PlanModulePricing,
  type WizardEstimateInput,
  type WizardEstimateResult,
  mergeCatalogWithOverrides,
} from '@repo/contracts';
import { platformDb } from '../../prisma/platform-db';
import { loadCloudSubscriptionRates } from './cloud-subscription.service';

type CatalogSettingValue = {
  version: number;
  modules: Partial<Record<ErpModuleCode, Partial<ModuleCatalogEntry>>>;
};

type PlanFeaturesJson = PlanModulePricing & Record<string, unknown>;

export async function loadModuleCatalog(): Promise<{
  catalogVersion: number;
  modules: ModuleCatalogEntry[];
}> {
  const setting = await platformDb.platformSetting.findUnique({
    where: { key: PRICE_CATALOG_SETTING_KEY },
  });
  const raw = setting?.value as CatalogSettingValue | undefined;
  const modules = mergeCatalogWithOverrides(raw?.modules);
  return {
    catalogVersion: raw?.version ?? PRICE_CATALOG_VERSION,
    modules: modules.filter((m) => m.active),
  };
}

export async function saveModuleCatalog(modules: ModuleCatalogEntry[]): Promise<void> {
  const overrides: CatalogSettingValue['modules'] = {};
  for (const m of modules) {
    const base = DEFAULT_ERP_MODULE_CATALOG.find((b) => b.code === m.code);
    if (!base) continue;
    const diff: Partial<ModuleCatalogEntry> = {};
    if (m.nameFa !== base.nameFa) diff.nameFa = m.nameFa;
    if (m.subtitle !== base.subtitle) diff.subtitle = m.subtitle;
    if (m.color !== base.color) diff.color = m.color;
    if (m.listPriceIrr !== base.listPriceIrr) diff.listPriceIrr = m.listPriceIrr;
    if (m.active !== base.active) diff.active = m.active;
    if (Object.keys(diff).length) overrides[m.code] = diff;
  }
  await platformDb.platformSetting.upsert({
    where: { key: PRICE_CATALOG_SETTING_KEY },
    create: { key: PRICE_CATALOG_SETTING_KEY, value: { version: PRICE_CATALOG_VERSION, modules: overrides } },
    update: { value: { version: PRICE_CATALOG_VERSION, modules: overrides } },
  });
}

function parsePlanFeatures(features: unknown): PlanModulePricing {
  const f = (features ?? {}) as PlanFeaturesJson;
  return {
    includedModules: Array.isArray(f.includedModules) ? (f.includedModules as ErpModuleCode[]) : [],
    modulePrices: (f.modulePrices ?? {}) as Partial<Record<ErpModuleCode, number>>,
  };
}

export async function listPlansWithModules() {
  const plans = await platformDb.plan.findMany({
    include: { versions: { orderBy: { version: 'desc' }, take: 1 } },
    orderBy: { code: 'asc' },
  });
  return plans.map((p) => {
    const pv = p.versions[0];
    const feat = parsePlanFeatures(pv?.features);
    return {
      id: p.id,
      code: p.code,
      nameFa: p.nameFa,
      planVersionId: pv?.id,
      version: pv?.version ?? 0,
      basePrice: pv ? Number(pv.basePrice) : 0,
      includedModules: feat.includedModules,
      modulePrices: feat.modulePrices,
      isActive: p.isActive,
    };
  });
}

export async function updatePlanModules(
  planId: string,
  input: { includedModules: ErpModuleCode[]; modulePrices: Partial<Record<ErpModuleCode, number>> },
) {
  const plan = await platformDb.plan.findUnique({
    where: { id: planId },
    include: { versions: { orderBy: { version: 'desc' }, take: 1 } },
  });
  if (!plan?.versions[0]) throw new Error('نسخه پلن یافت نشد');
  const pv = plan.versions[0];
  const prev = parsePlanFeatures(pv.features);
  const features: PlanFeaturesJson = {
    ...((pv.features as Record<string, unknown>) ?? {}),
    includedModules: input.includedModules,
    modulePrices: { ...prev.modulePrices, ...input.modulePrices },
  };
  await platformDb.planVersion.update({
    where: { id: pv.id },
    data: { features: features as object },
  });
  return listPlansWithModules().then((rows) => rows.find((r) => r.id === planId));
}

export async function computeModuleEstimate(moduleCodes: ErpModuleCode[]) {
  const { modules, catalogVersion } = await loadModuleCatalog();
  const byCode = new Map(modules.map((m) => [m.code, m]));
  const lines: Array<{ code?: ErpModuleCode; nameFa: string; amountIrr: number }> = [];
  let subtotal = CORE_PLATFORM_FEE_IRR;
  lines.push({ nameFa: 'هسته و زیرساخت ERP', amountIrr: CORE_PLATFORM_FEE_IRR });

  for (const code of moduleCodes) {
    const mod = byCode.get(code);
    if (!mod) continue;
    subtotal += mod.listPriceIrr;
    lines.push({ code, nameFa: mod.nameFa, amountIrr: mod.listPriceIrr });
  }

  const validUntil = new Date();
  validUntil.setDate(validUntil.getDate() + 14);

  return {
    catalogVersion,
    currency: 'IRR',
    moduleCodes,
    lines,
    subtotalIrr: subtotal,
    rangeMinIrr: Math.round(subtotal * 0.92),
    rangeMaxIrr: Math.round(subtotal * 1.18),
    validUntil: validUntil.toISOString(),
  };
}

export async function computeWizardEstimatePayload(input: WizardEstimateInput): Promise<
  WizardEstimateResult & {
  currency: 'IRR';
  subtotalIrr: number;
  totalIrr: number;
  rangeMinIrr: number;
  rangeMaxIrr: number;
  linesIrr: Array<{ key: string; titleFa: string; amountIrr: number; meta?: Record<string, string | number> }>;
  cloudSubscription: Awaited<ReturnType<typeof loadCloudSubscriptionRates>>;
}
> {
  const cloudRates = await loadCloudSubscriptionRates();
  const wizard = computeWizardEstimate({ ...input, cloudRates });
  return {
    ...wizard,
    currency: 'IRR',
    subtotalIrr: tomansToIrr(wizard.afterUserTomans),
    totalIrr: tomansToIrr(wizard.totalTomans),
    rangeMinIrr: tomansToIrr(wizard.rangeMinTomans),
    rangeMaxIrr: tomansToIrr(wizard.rangeMaxTomans),
    linesIrr: wizard.lines.map((line) => ({
      key: line.key,
      titleFa: line.titleFa,
      amountIrr: tomansToIrr(line.amountTomans),
      meta: line.meta,
    })),
    cloudSubscription: cloudRates,
  };
}
