import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const ROOT = path.join(__dirname, '..');

describe('Checkout E2E shell', () => {
  it('مسیر ۷ مرحله + success/pending', () => {
    expect(existsSync(path.join(ROOT, 'app/(public)/checkout/plan/[planCode]/page.tsx'))).toBe(true);
    expect(existsSync(path.join(ROOT, 'components/checkout/checkout-stepper.tsx'))).toBe(true);
    const stepper = readFileSync(path.join(ROOT, 'components/checkout/checkout-stepper.tsx'), 'utf8');
    expect(stepper).toContain('Idempotency-Key');
    expect(existsSync(path.join(ROOT, 'app/register/page.tsx'))).toBe(true);
  });
});
