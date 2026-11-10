import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import path from 'node:path';

describe('Marketing RTL smoke', () => {
  it('layout rtl + Vazirmatn', () => {
    const layout = readFileSync(path.join(__dirname, '../app/layout.tsx'), 'utf8');
    const css = readFileSync(path.join(__dirname, '../app/globals.css'), 'utf8');
    expect(layout).toContain('dir="rtl"');
    expect(css).toContain('Vazirmatn');
  });
});
