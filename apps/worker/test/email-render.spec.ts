import { describe, expect, it } from 'vitest';
import {
  TEMPLATE_KEYS,
  assertRtlEmail,
  mockEmailAuthPass,
  renderEmailTemplate,
} from '@repo/db-alerts';

describe('Email render — خلأ ۱۹', () => {
  it('هر ۳۰+ قالب فارسی RTL رندر + SPF/DKIM/DMARC pass (mock)', () => {
    expect(TEMPLATE_KEYS.length).toBeGreaterThanOrEqual(30);
    const auth = mockEmailAuthPass();
    expect(auth.spf).toBe('pass');
    expect(auth.dkim).toBe('pass');
    expect(auth.dmarc).toBe('pass');

    for (const key of TEMPLATE_KEYS) {
      const rendered = renderEmailTemplate(key, {
        message: `مشتری گرامی، مبلغ ${new Intl.NumberFormat('fa-IR').format(12_345_678)} ریال`,
        footer: 'تیم پشتیبانی',
        amount: 12_345_678,
      });
      expect(rendered, key).not.toBeNull();
      expect(assertRtlEmail(rendered!.html)).toBe(true);
      expect(rendered!.html).toContain('۱۲');
    }
  });
});
