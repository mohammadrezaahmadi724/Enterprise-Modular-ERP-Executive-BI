import { createHmac, timingSafeEqual } from 'node:crypto';

export function signWebhookBody(body: string, secret: string): string {
  return createHmac('sha256', secret).update(body).digest('hex');
}

export function verifyN8nSignature(body: string, signature: string | undefined, secret: string): boolean {
  if (!signature) return false;
  const expected = signWebhookBody(body, secret);
  const a = Buffer.from(expected, 'hex');
  const b = Buffer.from(signature.replace(/^sha256=/, ''), 'hex');
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function isIpWhitelisted(ip: string, whitelist: string[]): boolean {
  if (whitelist.length === 0) return true;
  return whitelist.includes(ip) || whitelist.includes('*');
}
