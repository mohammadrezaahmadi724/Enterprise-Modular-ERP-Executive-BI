import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import path from 'node:path';

describe('A11y smoke — marketing', () => {
  it('skip-link + aria در PublicHeader', () => {
    const header = readFileSync(path.join(__dirname, '../../../packages/ui/src/layout/public-header.tsx'), 'utf8');
    expect(header).toContain('پرش به محتوا');
    expect(header).toContain('aria-label');
  });
});
