import {
  CLOUD_SUBSCRIPTION_SETTING_KEY,
  DEFAULT_CLOUD_SUBSCRIPTION_RATES,
  type CloudSubscriptionRates,
  type ErpModuleCode,
} from '@repo/contracts';
import { platformDb } from '../../prisma/platform-db';
import { listPlansWithModules } from './pricing-catalog.service';

type CloudSettingValue = Partial<{
  baseMonthlyTomans: number;
  includedSeats: number;
  extraSeatTomans: number;
  maxSeats: number;
  moduleMonthlyTomans: Partial<Record<ErpModuleCode, number>>;
  planCode: string;
}>;

function mergeRates(base: CloudSubscriptionRates, patch: CloudSettingValue): CloudSubscriptionRates {
  return {
    ...base,
    ...patch,
    moduleMonthlyTomans: { ...base.moduleMonthlyTomans, ...patch.moduleMonthlyTomans },
    source: 'platform_setting',
  };
}

/** تعرفه اشتراک ابری — تنظیم ادمین > پلن > modulePrices یا platform_setting */
export type CloudSubscriptionPatch = Partial<{
  baseMonthlyTomans: number;
  includedSeats: number;
  extraSeatTomans: number;
  maxSeats: number;
  moduleMonthlyTomans: Partial<Record<ErpModuleCode, number>>;
  planCode: string;
}>;

export async function saveCloudSubscriptionRates(patch: CloudSubscriptionPatch): Promise<CloudSubscriptionRates> {
  const current = await loadCloudSubscriptionRates();
  const value: CloudSettingValue = {
    baseMonthlyTomans: patch.baseMonthlyTomans ?? current.baseMonthlyTomans,
    includedSeats: patch.includedSeats ?? current.includedSeats,
    extraSeatTomans: patch.extraSeatTomans ?? current.extraSeatTomans,
    maxSeats: patch.maxSeats ?? current.maxSeats,
    moduleMonthlyTomans: { ...current.moduleMonthlyTomans, ...patch.moduleMonthlyTomans },
    planCode: patch.planCode ?? current.planCode,
  };
  await platformDb.platformSetting.upsert({
    where: { key: CLOUD_SUBSCRIPTION_SETTING_KEY },
    create: { key: CLOUD_SUBSCRIPTION_SETTING_KEY, value },
    update: { value },
  });
  return loadCloudSubscriptionRates();
}

export async function clearCloudSubscriptionOverrides(): Promise<CloudSubscriptionRates> {
  await platformDb.platformSetting.deleteMany({ where: { key: CLOUD_SUBSCRIPTION_SETTING_KEY } });
  return loadCloudSubscriptionRates();
}

export async function loadCloudSubscriptionRates(): Promise<CloudSubscriptionRates> {
  const setting = await platformDb.platformSetting.findUnique({
    where: { key: CLOUD_SUBSCRIPTION_SETTING_KEY },
  });
  const stored = setting?.value as CloudSettingValue | undefined;
  if (stored && typeof stored === 'object') {
    return mergeRates(DEFAULT_CLOUD_SUBSCRIPTION_RATES, stored);
  }

  const planCode = process.env.CLOUD_PLAN_CODE?.trim() || 'professional';
  const plans = await listPlansWithModules();
  const plan = plans.find((p) => p.code === planCode && p.isActive) ?? plans.find((p) => p.isActive);
  if (!plan) return { ...DEFAULT_CLOUD_SUBSCRIPTION_RATES };

  const moduleMonthly: Partial<Record<ErpModuleCode, number>> = {
    ...DEFAULT_CLOUD_SUBSCRIPTION_RATES.moduleMonthlyTomans,
  };
  for (const [code, price] of Object.entries(plan.modulePrices ?? {})) {
    if (typeof price === 'number' && price > 0) {
      moduleMonthly[code as ErpModuleCode] = price;
    }
  }

  const baseFromPlan = Number(plan.basePrice);
  const usePlanBase =
    baseFromPlan >= 1_000_000 ? baseFromPlan : DEFAULT_CLOUD_SUBSCRIPTION_RATES.baseMonthlyTomans;

  return {
    ...DEFAULT_CLOUD_SUBSCRIPTION_RATES,
    baseMonthlyTomans: usePlanBase,
    moduleMonthlyTomans: moduleMonthly,
    planCode: plan.code,
    source: 'platform_plan',
  };
}
