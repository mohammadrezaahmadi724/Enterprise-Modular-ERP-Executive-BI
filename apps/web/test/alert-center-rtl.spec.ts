import { describe, expect, it } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';

describe('Alert Center RTL + Template Editor visual regression (static)', () => {
  it('صفحه alerts باید RTL و Vazirmatn داشته باشد', () => {
    const page = path.join(__dirname, '../app/alerts/page.tsx');
    const src = readFileSync(page, 'utf8');
    expect(src).toContain('dir="rtl"');
    expect(src).toContain('Vazirmatn');
  });

  it('admin notification-templates preview RTL', () => {
    const adminTpl = path.resolve(__dirname, '../../admin/app/notification-templates/page.tsx');
    expect(existsSync(adminTpl)).toBe(true);
    expect(readFileSync(adminTpl, 'utf8')).toContain('dir="rtl"');
  });
});
