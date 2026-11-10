import { describe, expect, it } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';

const ROOT = path.join(__dirname, '..');
const lighthouse = JSON.parse(
  readFileSync(path.join(ROOT, 'test/lighthouse-baseline.json'), 'utf8'),
) as {
  performance: number;
  seo: number;
  lcpMs: number;
  cls: number;
};

describe('Marketing SEO / Lighthouse — خلأ ۲۰', () => {
  it('Lighthouse thresholds', () => {
    expect(lighthouse.performance).toBeGreaterThanOrEqual(90);
    expect(lighthouse.seo).toBe(100);
    expect(lighthouse.lcpMs).toBeLessThan(2500);
    expect(lighthouse.cls).toBeLessThan(0.1);
  });

  it('metadata + JSON-LD + sitemap + robots', () => {
    const layout = readFileSync(path.join(ROOT, 'app/layout.tsx'), 'utf8');
    expect(layout).toContain('application/ld+json');
    expect(layout).toContain('fa-IR');
    expect(existsSync(path.join(ROOT, 'app/sitemap.ts'))).toBe(true);
    expect(existsSync(path.join(ROOT, 'app/robots.ts'))).toBe(true);
  });

  it('بدون Prisma در marketing', () => {
    const pkg = readFileSync(path.join(ROOT, 'package.json'), 'utf8');
    expect(pkg.includes('prisma')).toBe(false);
    expect(pkg.includes('@prisma')).toBe(false);
  });

  it('Plausible analytics (نه GA)', () => {
    const script = readFileSync(path.join(ROOT, 'components/marketing/PlausibleScript.tsx'), 'utf8');
    expect(script).toContain('plausible.io');
    expect(script.toLowerCase()).not.toContain('google-analytics');
  });
});
