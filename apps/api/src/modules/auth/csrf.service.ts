import { randomBytes } from 'node:crypto';

const csrfStore = new Map<string, string>();

export function issueCsrfToken(sessionKey: string): string {
  const token = randomBytes(32).toString('hex');
  csrfStore.set(sessionKey, token);
  return token;
}

export function validateCsrf(sessionKey: string, cookieToken: string, headerToken: string): boolean {
  const expected = csrfStore.get(sessionKey) ?? cookieToken;
  if (!cookieToken || !headerToken) return false;
  return headerToken === cookieToken && cookieToken === expected;
}
