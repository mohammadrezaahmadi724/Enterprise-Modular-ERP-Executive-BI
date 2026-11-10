import { describe, expect, it } from 'vitest';
import { isIpWhitelisted, signWebhookBody, verifyN8nSignature } from '../src/security/webhook-hmac';

describe('Webhook HMAC (Wave 5)', () => {
  it('امضای معتبر n8n را می‌پذیرد', () => {
    const body = JSON.stringify({ tenantId: 't1', workflowCode: 'wf', executionId: 'e1' });
    const secret = 'test-secret';
    const sig = signWebhookBody(body, secret);
    expect(verifyN8nSignature(body, sig, secret)).toBe(true);
    expect(verifyN8nSignature(body, `sha256=${sig}`, secret)).toBe(true);
  });

  it('IP whitelist', () => {
    expect(isIpWhitelisted('10.0.0.1', ['10.0.0.1'])).toBe(true);
    expect(isIpWhitelisted('10.0.0.2', ['10.0.0.1'])).toBe(false);
    expect(isIpWhitelisted('any', [])).toBe(true);
  });
});
