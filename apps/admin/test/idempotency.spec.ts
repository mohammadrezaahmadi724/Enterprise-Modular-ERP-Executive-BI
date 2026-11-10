import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

describe('Admin idempotency wiring', () => {
  it('Public billing checkout از Idempotency پشتیبانی می‌کند', () => {
    const ctrl = readFileSync(path.join(__dirname, '../../api/src/modules/public/public-billing.controller.ts'), 'utf8');
    expect(ctrl).toContain('idempotency-key');
    expect(existsSync(path.join(__dirname, '../app/break-glass/page.tsx'))).toBe(true);
  });
});
