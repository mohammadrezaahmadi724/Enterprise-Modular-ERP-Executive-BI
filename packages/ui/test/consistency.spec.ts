import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const ROOT = path.join(__dirname, '..');

describe('Cross-app Design System consistency', () => {
  it('globals.css یکسان در web/admin/marketing', () => {
    const ui = readFileSync(path.join(ROOT, 'src/styles/globals.css'), 'utf8');
    expect(ui).toContain('--primary');
    for (const app of ['web', 'admin', 'marketing']) {
      const g = readFileSync(path.join(ROOT, `../../apps/${app}/app/globals.css`), 'utf8');
      expect(g).toContain("@repo/ui/styles/globals.css");
    }
  });

  it('tailwind preset مشترک', () => {
    for (const app of ['web', 'admin', 'marketing']) {
      const t = readFileSync(path.join(ROOT, `../../apps/${app}/tailwind.config.ts`), 'utf8');
      expect(t).toContain('packages/ui/tailwind.config');
    }
  });
});
