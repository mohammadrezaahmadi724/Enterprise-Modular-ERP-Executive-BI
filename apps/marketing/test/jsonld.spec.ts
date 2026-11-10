import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import path from 'node:path';

describe('JSON-LD validation', () => {
  it('layout حاوی Organization schema', () => {
    const layout = readFileSync(path.join(__dirname, '../app/layout.tsx'), 'utf8');
    expect(layout).toContain('schema.org');
    expect(layout).toContain('Organization');
  });
});
