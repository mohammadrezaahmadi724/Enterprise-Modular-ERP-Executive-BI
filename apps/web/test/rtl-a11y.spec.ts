import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';

describe('RTL smoke + a11y placeholder — Wave 1', () => {
  const layoutPath = path.join(__dirname, '../app/layout.tsx');
  const layout = readFileSync(layoutPath, 'utf8');

  it('layout باید dir=rtl داشته باشد', () => {
    expect(layout).toContain('dir="rtl"');
    expect(layout).toContain('lang="fa-IR"');
  });

  it('bundle gate placeholder — داشبورد سبک', () => {
    const dashboard = path.join(__dirname, '../app/dashboard/page.tsx');
    expect(existsSync(dashboard)).toBe(true);
    const size = readFileSync(dashboard).length;
    expect(size).toBeLessThan(250 * 1024);
  });

  it('axe critical = 0 (static: فرم login برچسب دارد)', () => {
    const login = readFileSync(path.join(__dirname, '../app/login/page.tsx'), 'utf8');
    expect(login.includes('ایمیل')).toBe(true);
    expect(login.includes('label')).toBe(true);
  });
});
