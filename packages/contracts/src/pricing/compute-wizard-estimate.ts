import type { ErpModuleCode } from './module-catalog';
import { PRICE_CATALOG_VERSION } from './module-catalog';
import {
  computeCloudMonthlyBreakdown,
  computeCloudMonthlyWithRates,
  DEFAULT_CLOUD_SUBSCRIPTION_RATES,
  type CloudMonthlyBreakdown,
  type CloudSubscriptionRates,
} from './cloud-subscription';
import {
  CLOUD_ONBOARDING_BASE_TOMANS,
  CLOUD_ONBOARDING_PER_MODULE_TOMANS,
  COMPLEXITY_MULTIPLIER,
  ESTIMATOR_INTEGRATION_OPTIONS,
  ESTIMATOR_WIZARD_MODULES,
  IMPLEMENTATION_ERP_BASE_TOMANS,
  type EstimatorComplexity,
  type EstimatorDeliveryMode,
  type EstimatorDeployment,
  type EstimatorWizardModuleId,
  userCountMultiplier,
} from './wizard-catalog';

export type WizardModuleSelection = {
  moduleId: EstimatorWizardModuleId;
  complexity: EstimatorComplexity;
  addonIds: string[];
};

export type WizardEstimateInput = {
  userCount: number;
  deliveryMode?: EstimatorDeliveryMode;
  deployment: EstimatorDeployment;
  integrations: string[];
  modules: WizardModuleSelection[];
  /** اگر از API پلن ابری خوانده شود؛ پیش‌نمایش سمت کلاینت */
  cloudRates?: CloudSubscriptionRates;
};

export type WizardBreakdownLine = {
  key: string;
  titleFa: string;
  amountTomans: number;
  meta?: Record<string, string | number>;
};

export type WizardCostBucket = {
  key: string;
  titleFa: string;
  amountTomans: number;
  rangeMinTomans?: number;
  rangeMaxTomans?: number;
  sharePct: number;
};

export type WizardPrimaryQuoteKind = 'cloud_monthly' | 'implementation_range';

export type WizardEstimateResult = {
  pricingVersion: string;
  catalogVersion: number;
  deliveryMode: EstimatorDeliveryMode;
  primaryQuoteKind: WizardPrimaryQuoteKind;
  deployment: EstimatorDeployment;
  moduleCodes: ErpModuleCode[];
  lines: WizardBreakdownLine[];
  modulesSubtotalTomans: number;
  addonsSubtotalTomans: number;
  integrationsTomans: number;
  userMultiplier: number;
  afterUserTomans: number;
  deploymentTomans: number;
  deploymentRangeMinTomans: number;
  deploymentRangeMaxTomans: number;
  totalTomans: number;
  rangeMinTomans: number;
  rangeMaxTomans: number;
  costBuckets: WizardCostBucket[];
  durationMinDays: number;
  durationMaxDays: number;
  cloudMonthlyTomans: number;
  cloudBreakdown: CloudMonthlyBreakdown;
  confidence: 'high' | 'medium' | 'low';
  validUntil: string;
};

function integrationTomans(id: string): number {
  const row = ESTIMATOR_INTEGRATION_OPTIONS.find((o) => o.id === id);
  if (!row || !row.availableInProduct) return 0;
  return row.implementationTomans;
}

function moduleLineAmount(base: number, complexity: EstimatorComplexity, addonTomans: number): number {
  return Math.round(base * COMPLEXITY_MULTIPLIER[complexity] + addonTomans);
}

export function computeCloudMonthlyTomans(
  userCount: number,
  moduleIds: EstimatorWizardModuleId[],
  cloudRates?: CloudSubscriptionRates,
): number {
  return computeCloudMonthlyWithRates(
    userCount,
    moduleIds,
    cloudRates ?? DEFAULT_CLOUD_SUBSCRIPTION_RATES,
  );
}

function computeCloudSaasEstimate(
  input: WizardEstimateInput,
  moduleIds: EstimatorWizardModuleId[],
  moduleCodes: ErpModuleCode[],
  cloudBreakdown: CloudMonthlyBreakdown,
): WizardEstimateResult {
  const integrationCloud = input.integrations.reduce((s, id) => s + integrationTomans(id), 0);
  const onboardingModules =
    CLOUD_ONBOARDING_BASE_TOMANS + moduleIds.length * CLOUD_ONBOARDING_PER_MODULE_TOMANS;
  const onboardingTotal = onboardingModules + Math.round(integrationCloud * 0.35);

  const lines: WizardBreakdownLine[] = [
    {
      key: 'cloud-base',
      titleFa: 'پایه اشتراک ماهانه (شامل ۱۰ کاربر)',
      amountTomans: cloudBreakdown.baseMonthlyTomans,
    },
    ...cloudBreakdown.moduleLines.map((m) => ({
      key: `cloud-mod-${m.moduleId}`,
      titleFa: `ماژول ${m.titleFa} (ماهانه)`,
      amountTomans: m.monthlyTomans,
    })),
  ];
  if (cloudBreakdown.extraSeatsTomans > 0) {
    lines.push({
      key: 'cloud-seats',
      titleFa: `کاربر اضافه (${cloudBreakdown.extraSeatCount} نفر)`,
      amountTomans: cloudBreakdown.extraSeatsTomans,
      meta: {
        perSeat: cloudBreakdown.perExtraSeatTomans,
        userCount: input.userCount,
      },
    });
  }
  lines.push({
    key: 'onboarding',
    titleFa: 'راه‌اندازی اولیه یک‌بار (آموزش، داده اولیه)',
    amountTomans: onboardingTotal,
  });

  const costBuckets: WizardCostBucket[] = [
    {
      key: 'cloud-fixed',
      titleFa: 'پایه و ماژول‌های ابری (ماهانه)',
      amountTomans: cloudBreakdown.baseMonthlyTomans + cloudBreakdown.modulesMonthlyTomans,
      sharePct: 0,
    },
    {
      key: 'cloud-seats',
      titleFa: 'کاربران اضافه (ماهانه)',
      amountTomans: cloudBreakdown.extraSeatsTomans,
      sharePct: 0,
    },
    {
      key: 'onboarding',
      titleFa: 'راه‌اندازی یک‌بار',
      amountTomans: onboardingTotal,
      rangeMinTomans: Math.round(onboardingTotal * 0.92),
      rangeMaxTomans: Math.round(onboardingTotal * 1.08),
      sharePct: 0,
    },
  ];
  const bucketTotal = costBuckets.reduce((s, b) => s + b.amountTomans, 0);
  for (const b of costBuckets) {
    b.sharePct = bucketTotal > 0 ? Math.round((b.amountTomans / bucketTotal) * 100) : 0;
  }

  const validUntil = new Date();
  validUntil.setDate(validUntil.getDate() + 30);
  const rangeMin = Math.round(onboardingTotal * 0.92);
  const rangeMax = Math.round(onboardingTotal * 1.08);

  return {
    pricingVersion: 'pricing-v4',
    catalogVersion: PRICE_CATALOG_VERSION,
    deliveryMode: 'cloud_saas',
    primaryQuoteKind: 'cloud_monthly',
    deployment: input.deployment,
    moduleCodes,
    lines,
    modulesSubtotalTomans: 0,
    addonsSubtotalTomans: 0,
    integrationsTomans: integrationCloud,
    userMultiplier: 1,
    afterUserTomans: onboardingTotal,
    deploymentTomans: 0,
    deploymentRangeMinTomans: 0,
    deploymentRangeMaxTomans: 0,
    totalTomans: onboardingTotal,
    rangeMinTomans: rangeMin,
    rangeMaxTomans: rangeMax,
    costBuckets,
    durationMinDays: 3,
    durationMaxDays: 10,
    cloudMonthlyTomans: cloudBreakdown.totalMonthlyTomans,
    cloudBreakdown,
    confidence: moduleIds.length >= 6 ? 'medium' : 'high',
    validUntil: validUntil.toISOString(),
  };
}

export function computeWizardEstimate(input: WizardEstimateInput): WizardEstimateResult {
  const deliveryMode = input.deliveryMode ?? 'custom_implementation';
  const moduleIds = input.modules.map((m) => m.moduleId);
  const rates = input.cloudRates ?? DEFAULT_CLOUD_SUBSCRIPTION_RATES;
  const cloudBreakdown = computeCloudMonthlyBreakdown(input.userCount, moduleIds, rates);

  const moduleCodes: ErpModuleCode[] = [];
  for (const sel of input.modules) {
    const def = ESTIMATOR_WIZARD_MODULES.find((m) => m.id === sel.moduleId);
    if (def) moduleCodes.push(def.erpCode);
  }

  if (deliveryMode === 'cloud_saas') {
    return computeCloudSaasEstimate(input, moduleIds, moduleCodes, cloudBreakdown);
  }

  const lines: WizardBreakdownLine[] = [];
  lines.push({ key: 'erp-base', titleFa: 'پایه ERP', amountTomans: IMPLEMENTATION_ERP_BASE_TOMANS });

  let modulesRaw = 0;
  let modulesBaseOnly = 0;
  let addonsSubtotal = 0;
  for (const sel of input.modules) {
    const def = ESTIMATOR_WIZARD_MODULES.find((m) => m.id === sel.moduleId);
    if (!def) continue;
    let addonSum = 0;
    for (const addonId of sel.addonIds) {
      const addon = def.addons.find((a) => a.id === addonId);
      if (addon?.availableInProduct) addonSum += addon.implementationTomans;
    }
    addonsSubtotal += addonSum;
    modulesBaseOnly += Math.round(def.implementationBaseTomans * COMPLEXITY_MULTIPLIER[sel.complexity]);
    const amount = moduleLineAmount(def.implementationBaseTomans, sel.complexity, addonSum);
    modulesRaw += amount;
    lines.push({
      key: `mod-${sel.moduleId}`,
      titleFa: def.nameFa,
      amountTomans: amount,
      meta: {
        complexity: COMPLEXITY_MULTIPLIER[sel.complexity],
        addonsTomans: addonSum,
      },
    });
  }

  const integrationsSum = input.integrations.reduce((s, id) => s + integrationTomans(id), 0);
  if (integrationsSum > 0) {
    lines.push({
      key: 'integrations',
      titleFa: 'یکپارچه‌سازی و انتقال داده',
      amountTomans: integrationsSum,
    });
  }

  const subBeforeUser = IMPLEMENTATION_ERP_BASE_TOMANS + modulesRaw + integrationsSum;
  const userMultiplier = userCountMultiplier(input.userCount);
  const afterUser = Math.round(subBeforeUser * userMultiplier);

  lines.push({
    key: 'user-factor',
    titleFa: 'جمع راهکار بعد از ضریب کاربران',
    amountTomans: afterUser,
    meta: { userMultiplier, userCount: input.userCount, subBeforeUser },
  });

  let deploymentTomans: number;
  let deploymentMin: number;
  let deploymentMax: number;
  if (input.deployment === 'private_cloud') {
    deploymentTomans = 42_000_000;
    deploymentMin = 33_000_000;
    deploymentMax = 50_000_000;
  } else {
    deploymentTomans = 28_000_000;
    deploymentMin = 22_000_000;
    deploymentMax = 36_000_000;
  }

  lines.push({
    key: 'deployment',
    titleFa:
      input.deployment === 'private_cloud'
        ? 'استقرار روی سرور ابری ساختار'
        : 'استقرار روی سرور سازمان (On-Premise)',
    amountTomans: deploymentTomans,
  });

  const total = afterUser + deploymentTomans;
  const rangeMin = Math.round(total * 0.91);
  const rangeMax = Math.round(total * 1.07);

  const moduleCount = input.modules.length;
  const durationMinDays = 14 + moduleCount * 4 + (input.integrations.length > 2 ? 4 : 0);
  const durationMaxDays = Math.round(durationMinDays * 1.45);

  const coreTomans = Math.round(IMPLEMENTATION_ERP_BASE_TOMANS * userMultiplier);
  const modulesBucket = Math.round(modulesBaseOnly * userMultiplier);
  const addonsBucket = Math.round(addonsSubtotal * userMultiplier);
  const integrationBucket = Math.round(integrationsSum * userMultiplier);
  const bucketParts = [
    { key: 'core', titleFa: 'هسته و زیرساخت ERP', amount: coreTomans },
    { key: 'modules', titleFa: 'ماژول‌های انتخاب‌شده', amount: modulesBucket },
    { key: 'addons', titleFa: 'زیرماژول‌های اختیاری', amount: addonsBucket },
    ...(integrationBucket > 0
      ? [{ key: 'integrations', titleFa: 'یکپارچه‌سازی', amount: integrationBucket }]
      : []),
    {
      key: 'deployment',
      titleFa:
        input.deployment === 'private_cloud'
          ? 'استقرار روی سرور ابری ساختار'
          : 'استقرار روی سرور سازمان',
      amount: deploymentTomans,
      rangeMin: deploymentMin,
      rangeMax: deploymentMax,
    },
  ];
  const bucketTotal = bucketParts.reduce((s, b) => s + b.amount, 0);
  const costBuckets: WizardCostBucket[] = bucketParts.map((b) => ({
    key: b.key,
    titleFa: b.titleFa,
    amountTomans: b.amount,
    rangeMinTomans: b.rangeMin,
    rangeMaxTomans: b.rangeMax,
    sharePct: bucketTotal > 0 ? Math.round((b.amount / bucketTotal) * 100) : 0,
  }));

  const confidence: WizardEstimateResult['confidence'] =
    moduleCount <= 3 && input.userCount <= 50 ? 'high' : moduleCount > 5 ? 'medium' : 'high';

  const validUntil = new Date();
  validUntil.setDate(validUntil.getDate() + 30);

  return {
    pricingVersion: 'pricing-v4',
    catalogVersion: PRICE_CATALOG_VERSION,
    deliveryMode: 'custom_implementation',
    primaryQuoteKind: 'implementation_range',
    deployment: input.deployment,
    moduleCodes,
    lines,
    modulesSubtotalTomans: modulesRaw,
    addonsSubtotalTomans: addonsSubtotal,
    integrationsTomans: integrationsSum,
    userMultiplier,
    afterUserTomans: afterUser,
    deploymentTomans,
    deploymentRangeMinTomans: deploymentMin,
    deploymentRangeMaxTomans: deploymentMax,
    totalTomans: total,
    rangeMinTomans: rangeMin,
    rangeMaxTomans: rangeMax,
    costBuckets,
    durationMinDays,
    durationMaxDays,
    cloudMonthlyTomans: cloudBreakdown.totalMonthlyTomans,
    cloudBreakdown,
    confidence,
    validUntil: validUntil.toISOString(),
  };
}

/** تبدیل تومان به ریال برای APIهای مبتنی بر IRR */
export function tomansToIrr(tomans: number): number {
  return tomans * 10;
}
