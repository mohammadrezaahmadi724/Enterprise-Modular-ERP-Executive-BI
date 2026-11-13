import {
  buildCloudCheckoutPath,
  wizardModuleIdsToErpCodes,
  type EstimatorDeliveryMode,
  type EstimatorWizardModuleId,
} from '@repo/contracts';
import { WEB_URL } from './constants';

const DEFAULT_PLAN = process.env.NEXT_PUBLIC_CLOUD_PLAN_CODE ?? 'professional';

export function cloudCheckoutUrlForEstimate(opts: {
  seats: number;
  moduleIds: EstimatorWizardModuleId[];
  estimateId?: string;
  deliveryMode?: EstimatorDeliveryMode;
  planCode?: string;
}): string {
  return buildCloudCheckoutPath(WEB_URL, opts.planCode ?? DEFAULT_PLAN, {
    seats: opts.seats,
    moduleCodes: wizardModuleIdsToErpCodes(opts.moduleIds),
    estimateId: opts.estimateId,
    deliveryMode: opts.deliveryMode,
    utmSource: 'estimate',
  });
}
