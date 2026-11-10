import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const ROOT = path.join(__dirname, '..', 'src', 'layout');

describe('Header/Footer RTL', () => {
  it('dir=rtl در PublicHeader و PublicFooter', () => {
    expect(readFileSync(path.join(ROOT, 'public-header.tsx'), 'utf8')).toContain('dir="rtl"');
    expect(readFileSync(path.join(ROOT, 'public-footer.tsx'), 'utf8')).toContain('dir="rtl"');
  });
});
