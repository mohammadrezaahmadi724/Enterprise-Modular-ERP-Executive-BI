import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { buildCloudCheckoutPath, wizardModuleIdsToErpCodes } from '@repo/contracts';
import { cloudCheckoutUrlForEstimate } from '../lib/cloud-checkout';

describe('estimate → checkout deep link', () => {
  it('marketing helper matches contracts builder', () => {
    const viaHelper = cloudCheckoutUrlForEstimate({
      seats: 30,
      moduleIds: ['sales', 'finance', 'inventory'],
      estimateId: 'abc',
      deliveryMode: 'cloud_saas',
    });
    const codes = wizardModuleIdsToErpCodes(['sales', 'finance', 'inventory']);
    expect(viaHelper).toContain('seats=30');
    expect(viaHelper).toContain(codes.join('%2C'));
    expect(viaHelper).toContain('estimateId=abc');
  });

  it('wizard wires cloudCheckoutHref', () => {
    const root = path.join(__dirname, '..');
    const wizard = readFileSync(path.join(root, 'components/estimator/ProjectEstimatorWizard.tsx'), 'utf8');
    expect(wizard).toContain('cloudCheckoutUrlForEstimate');
    expect(wizard).toContain('cloudCheckoutHref');
  });

  it('checkout stepper reads prefill query params', () => {
    const webRoot = path.join(__dirname, '../../web');
    const stepper = readFileSync(path.join(webRoot, 'components/checkout/checkout-stepper.tsx'), 'utf8');
    expect(stepper).toContain('searchParams.get(\'seats\')');
    expect(stepper).toContain('searchParams.get(\'modules\')');
    expect(stepper).toContain('cloud-subscription');
  });

  it('buildCloudCheckoutPath encodes modules', () => {
    const url = buildCloudCheckoutPath('http://127.0.0.1:3001', 'professional', {
      seats: 10,
      moduleCodes: ['sales'],
      utmSource: 'estimate',
    });
    expect(url).toBe(
      'http://127.0.0.1:3001/checkout/plan/professional?utm_source=estimate&seats=10&modules=sales',
    );
  });
});
