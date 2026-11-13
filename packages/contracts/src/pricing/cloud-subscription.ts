import { DEFAULT_ERP_MODULE_CATALOG, type ErpModuleCode } from './module-catalog';
import {
  CLOUD_PLAN_BASE_MONTHLY_TOMANS,
  CLOUD_PLAN_EXTRA_SEAT_TOMANS,
  CLOUD_PLAN_INCLUDED_SEATS,
  CLOUD_PLAN_MAX_SEATS,
  ESTIMATOR_WIZARD_MODULES,
  type EstimatorWizardModuleId,
} from './wizard-catalog';

export const CLOUD_SUBSCRIPTION_SETTING_KEY = 'cloud_subscription_v1';

export type CloudSubscriptionRates = {
  baseMonthlyTomans: number;
  includedSeats: number;
  extraSeatTomans: number;
  maxSeats: number;
  /** تعرفه ماهانه هر ماژول ERP (تومان) */
  moduleMonthlyTomans: Partial<Record<ErpModuleCode, number>>;
  planCode?: string;
  source: 'defaults' | 'platform_plan' | 'platform_setting';
};

/** تعرفه ماهانه یک ماژول — پلن ادمین > پیش‌فرض ویزارد */
export function resolveModuleMonthlyTomans(
  code: ErpModuleCode,
  rates: CloudSubscriptionRates = DEFAULT_CLOUD_SUBSCRIPTION_RATES,
): number {
  const fromRates = rates.moduleMonthlyTomans[code];
  if (fromRates != null) return fromRates;
  const wiz = ESTIMATOR_WIZARD_MODULES.find((m) => m.erpCode === code);
  if (wiz) return wiz.cloudMonthlyTomans;
  return 0;
}

export function computeCloudMonthlyFromErpCodes(
  userCount: number,
  moduleCodes: ErpModuleCode[],
  rates: CloudSubscriptionRates = DEFAULT_CLOUD_SUBSCRIPTION_RATES,
): CloudMonthlyBreakdown {
  const moduleLines = moduleCodes.map((code) => {
    const catalog = DEFAULT_ERP_MODULE_CATALOG.find((m) => m.code === code);
    return {
      moduleId: code as EstimatorWizardModuleId,
      titleFa: catalog?.nameFa ?? code,
      monthlyTomans: resolveModuleMonthlyTomans(code, rates),
    };
  });
  const modulesMonthlyTomans = moduleLines.reduce((s, l) => s + l.monthlyTomans, 0);
  const seats = Math.min(Math.max(userCount, 1), rates.maxSeats);
  const extraSeatCount = Math.max(0, seats - rates.includedSeats);
  const extraSeatsTomans = extraSeatCount * rates.extraSeatTomans;
  const totalMonthlyTomans =
    rates.baseMonthlyTomans + modulesMonthlyTomans + extraSeatsTomans;

  return {
    baseMonthlyTomans: rates.baseMonthlyTomans,
    includedSeats: rates.includedSeats,
    modulesMonthlyTomans,
    moduleLines,
    extraSeatCount,
    perExtraSeatTomans: rates.extraSeatTomans,
    extraSeatsTomans,
    totalMonthlyTomans,
    effectivePerUserTomans: seats > 0 ? Math.round(totalMonthlyTomans / seats) : totalMonthlyTomans,
  };
}

export const DEFAULT_CLOUD_SUBSCRIPTION_RATES: CloudSubscriptionRates = {
  baseMonthlyTomans: CLOUD_PLAN_BASE_MONTHLY_TOMANS,
  includedSeats: CLOUD_PLAN_INCLUDED_SEATS,
  extraSeatTomans: CLOUD_PLAN_EXTRA_SEAT_TOMANS,
  maxSeats: CLOUD_PLAN_MAX_SEATS,
  moduleMonthlyTomans: Object.fromEntries(
    ESTIMATOR_WIZARD_MODULES.map((m) => [m.erpCode, m.cloudMonthlyTomans]),
  ) as Partial<Record<ErpModuleCode, number>>,
  source: 'defaults',
};

export type CloudMonthlyBreakdown = {
  baseMonthlyTomans: number;
  includedSeats: number;
  modulesMonthlyTomans: number;
  moduleLines: Array<{ moduleId: EstimatorWizardModuleId; titleFa: string; monthlyTomans: number }>;
  extraSeatCount: number;
  perExtraSeatTomans: number;
  extraSeatsTomans: number;
  totalMonthlyTomans: number;
  /** میانگین ماهانه به ازای هر کاربر فعال */
  effectivePerUserTomans: number;
};

export function computeCloudMonthlyBreakdown(
  userCount: number,
  moduleIds: EstimatorWizardModuleId[],
  rates: CloudSubscriptionRates = DEFAULT_CLOUD_SUBSCRIPTION_RATES,
): CloudMonthlyBreakdown {
  const moduleLines = moduleIds
    .map((id) => {
      const def = ESTIMATOR_WIZARD_MODULES.find((m) => m.id === id);
      if (!def) return null;
      const fromRates = rates.moduleMonthlyTomans[def.erpCode];
      const monthlyTomans = fromRates ?? def.cloudMonthlyTomans;
      return { moduleId: id, titleFa: def.nameFa, monthlyTomans };
    })
    .filter(Boolean) as CloudMonthlyBreakdown['moduleLines'];

  const modulesMonthlyTomans = moduleLines.reduce((s, l) => s + l.monthlyTomans, 0);
  const seats = Math.min(Math.max(userCount, 1), rates.maxSeats);
  const extraSeatCount = Math.max(0, seats - rates.includedSeats);
  const extraSeatsTomans = extraSeatCount * rates.extraSeatTomans;
  const totalMonthlyTomans =
    rates.baseMonthlyTomans + modulesMonthlyTomans + extraSeatsTomans;

  return {
    baseMonthlyTomans: rates.baseMonthlyTomans,
    includedSeats: rates.includedSeats,
    modulesMonthlyTomans,
    moduleLines,
    extraSeatCount,
    perExtraSeatTomans: rates.extraSeatTomans,
    extraSeatsTomans,
    totalMonthlyTomans,
    effectivePerUserTomans: seats > 0 ? Math.round(totalMonthlyTomans / seats) : totalMonthlyTomans,
  };
}

export function computeCloudMonthlyWithRates(
  userCount: number,
  moduleIds: EstimatorWizardModuleId[],
  rates: CloudSubscriptionRates = DEFAULT_CLOUD_SUBSCRIPTION_RATES,
): number {
  return computeCloudMonthlyBreakdown(userCount, moduleIds, rates).totalMonthlyTomans;
}
