import { describe, expect, it } from 'vitest';
import {
  SAKHTAR_URL_STEP,
  sakhtarUrlToStepIndex,
  stepIndexToSakhtarUrl,
} from '../lib/estimate-sakhtar-url';

const cloudSteps = [
  { type: 'identity' as const },
  { type: 'profile' as const },
  { type: 'delivery' as const },
  { type: 'modules' as const },
  { type: 'integrations' as const },
  { type: 'phone' as const },
  { type: 'otp' as const },
  { type: 'result' as const },
];

describe('sakhtar estimate URL steps', () => {
  it('maps magic steps like sakhtar.net', () => {
    expect(stepIndexToSakhtarUrl(cloudSteps, 4)).toBe(SAKHTAR_URL_STEP.integrations);
    expect(stepIndexToSakhtarUrl(cloudSteps, 5)).toBe(SAKHTAR_URL_STEP.phone);
    expect(stepIndexToSakhtarUrl(cloudSteps, 7)).toBe(SAKHTAR_URL_STEP.result);
    expect(sakhtarUrlToStepIndex(cloudSteps, 12, { verified: false })).toBe(5);
    expect(sakhtarUrlToStepIndex(cloudSteps, 12, { verified: true })).toBe(7);
    expect(sakhtarUrlToStepIndex(cloudSteps, 6, { verified: false })).toBe(4);
    expect(sakhtarUrlToStepIndex(cloudSteps, 7, { verified: false })).toBe(5);
  });
});
