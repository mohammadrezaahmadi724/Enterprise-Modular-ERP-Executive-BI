import { describe, expect, it } from 'vitest';
import { existsSync } from 'node:fs';
import path from 'node:path';

describe('Marketing bundle gate', () => {
  it('اسکریپت CI bundle موجود است', () => {
    expect(existsSync(path.join(__dirname, '../../../tools/load-test/marketing-bundle.ci.ts'))).toBe(true);
  });
});
