import { describe, expect, it } from 'vitest';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { MODULES } from '../lib/modules-catalog';

describe('Visual regression (static structure)', () => {
  it('Home + Module template + Pricing', () => {
    const root = path.join(__dirname, '..');
    expect(existsSync(path.join(root, 'app/page.tsx'))).toBe(true);
    expect(existsSync(path.join(root, 'components/marketing/Hero.tsx'))).toBe(true);
    expect(existsSync(path.join(root, 'app/modules/[slug]/page.tsx'))).toBe(true);
    expect(existsSync(path.join(root, 'app/pricing/page.tsx'))).toBe(true);
    expect(MODULES).toHaveLength(9);
  });
});
