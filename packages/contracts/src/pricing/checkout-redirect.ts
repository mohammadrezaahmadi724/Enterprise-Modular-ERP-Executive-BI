import type { ErpModuleCode } from './module-catalog';
import { ESTIMATOR_WIZARD_MODULES, type EstimatorDeliveryMode, type EstimatorWizardModuleId } from './wizard-catalog';

export type CloudCheckoutPrefill = {
  seats: number;
  moduleCodes: ErpModuleCode[];
  estimateId?: string;
  deliveryMode?: EstimatorDeliveryMode;
  utmSource?: string;
};

export function wizardModuleIdsToErpCodes(ids: EstimatorWizardModuleId[]): ErpModuleCode[] {
  return ids
    .map((id) => ESTIMATOR_WIZARD_MODULES.find((m) => m.id === id)?.erpCode)
    .filter((c): c is ErpModuleCode => Boolean(c));
}

export function erpCodesToWizardModuleIds(codes: ErpModuleCode[]): EstimatorWizardModuleId[] {
  const out: EstimatorWizardModuleId[] = [];
  for (const code of codes) {
    const def = ESTIMATOR_WIZARD_MODULES.find((m) => m.erpCode === code);
    if (def) out.push(def.id);
  }
  return out;
}

export function buildCloudCheckoutSearchParams(prefill: CloudCheckoutPrefill): URLSearchParams {
  const p = new URLSearchParams();
  p.set('utm_source', prefill.utmSource ?? 'estimate');
  if (prefill.estimateId) p.set('estimateId', prefill.estimateId);
  p.set('seats', String(Math.max(1, prefill.seats)));
  if (prefill.moduleCodes.length) p.set('modules', prefill.moduleCodes.join(','));
  if (prefill.deliveryMode) p.set('delivery', prefill.deliveryMode);
  return p;
}

export function buildCloudCheckoutPath(
  webBaseUrl: string,
  planCode: string,
  prefill: CloudCheckoutPrefill,
): string {
  const base = webBaseUrl.replace(/\/$/, '');
  const qs = buildCloudCheckoutSearchParams(prefill).toString();
  return `${base}/checkout/plan/${encodeURIComponent(planCode)}?${qs}`;
}
