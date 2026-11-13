import type { EstimatorWizardModuleId } from '@repo/contracts';

type StepKind =
  | { type: 'identity' }
  | { type: 'profile' }
  | { type: 'delivery' }
  | { type: 'modules' }
  | { type: 'module'; id: EstimatorWizardModuleId; index: number; total: number }
  | { type: 'integrations' }
  | { type: 'phone' }
  | { type: 'otp' }
  | { type: 'result' };

/** شماره‌های ثابت URL در sakhtar.net/pricing/estimate/?step=… */
export const SAKHTAR_URL_STEP = {
  profile: 1,
  modules: 2,
  moduleDetailStart: 3,
  integrations: 6,
  phone: 7,
  otp: 8,
  result: 12,
} as const;

export function stepIndexToSakhtarUrl(steps: StepKind[], stepIndex: number): number | undefined {
  const step = steps[stepIndex];
  if (!step) return undefined;
  switch (step.type) {
    case 'identity':
      return undefined;
    case 'profile':
    case 'delivery':
      return SAKHTAR_URL_STEP.profile;
    case 'modules':
      return SAKHTAR_URL_STEP.modules;
    case 'module': {
      const slot = steps
        .filter((s): s is Extract<StepKind, { type: 'module' }> => s.type === 'module')
        .findIndex((s) => s.id === step.id);
      return SAKHTAR_URL_STEP.moduleDetailStart + Math.max(0, slot);
    }
    case 'integrations':
      return SAKHTAR_URL_STEP.integrations;
    case 'phone':
      return SAKHTAR_URL_STEP.phone;
    case 'otp':
      return SAKHTAR_URL_STEP.otp;
    case 'result':
      return SAKHTAR_URL_STEP.result;
    default:
      return undefined;
  }
}

export function sakhtarUrlToStepIndex(
  steps: StepKind[],
  urlStep: number,
  opts: { verified: boolean },
): number {
  const find = (type: StepKind['type']) => steps.findIndex((s) => s.type === type);

  if (urlStep === SAKHTAR_URL_STEP.result) {
    const resultIdx = find('result');
    return opts.verified && resultIdx >= 0 ? resultIdx : Math.max(find('phone'), 0);
  }
  if (urlStep === SAKHTAR_URL_STEP.otp) return Math.max(find('otp'), 0);
  if (urlStep === SAKHTAR_URL_STEP.phone) return Math.max(find('phone'), 0);
  if (urlStep === SAKHTAR_URL_STEP.integrations) return Math.max(find('integrations'), 0);
  if (urlStep === SAKHTAR_URL_STEP.modules) return Math.max(find('modules'), 0);
  if (urlStep === SAKHTAR_URL_STEP.profile) return Math.max(find('profile'), 0);

  if (urlStep >= SAKHTAR_URL_STEP.moduleDetailStart && urlStep < SAKHTAR_URL_STEP.integrations) {
    const moduleSteps = steps
      .map((s, i) => ({ s, i }))
      .filter((x) => x.s.type === 'module');
    const pick = moduleSteps[urlStep - SAKHTAR_URL_STEP.moduleDetailStart];
    if (pick) return pick.i;
    return Math.max(find('integrations'), find('modules'));
  }

  return 0;
}
