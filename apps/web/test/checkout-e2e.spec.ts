import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const ROOT = path.join(__dirname, '..');
const MARKETING = path.join(__dirname, '..', '..', 'marketing');

describe('Checkout E2E shell', () => {
  it('چک‌اوت روی marketing است و web فقط ریدایرکت می‌کند', () => {
    const stepper = readFileSync(path.join(MARKETING, 'components/checkout/checkout-stepper.tsx'), 'utf8');
    expect(stepper).toContain('Idempotency-Key');
    expect(existsSync(path.join(MARKETING, 'app/checkout/plan/[planCode]/page.tsx'))).toBe(true);
    expect(existsSync(path.join(MARKETING, 'app/checkout/success/page.tsx'))).toBe(true);
    expect(existsSync(path.join(MARKETING, 'app/checkout/pending/page.tsx'))).toBe(true);
    const webConfig = readFileSync(path.join(ROOT, 'next.config.ts'), 'utf8');
    expect(webConfig).toContain('/checkout/:path*');
    expect(existsSync(path.join(ROOT, 'app/register/page.tsx'))).toBe(true);
  });
});
