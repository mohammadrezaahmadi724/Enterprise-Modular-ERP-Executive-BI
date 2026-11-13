import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { test } from '@playwright/test';

export type E2eStackStatus = {
  api: string;
  web: string;
  marketing: string;
  apiOk: boolean;
  webOk: boolean;
  marketingOk: boolean;
  hint: string;
};

export function readStackStatus(): E2eStackStatus {
  const path = resolve(process.cwd(), 'e2e/.stack-status.json');
  return JSON.parse(readFileSync(path, 'utf8')) as E2eStackStatus;
}

export function skipUnlessApiWeb(): void {
  const s = readStackStatus();
  if (!s.apiOk || !s.webOk) {
    test.skip(true, `API/Web در دسترس نیست. ${s.hint}`);
  }
}

export function skipUnlessMarketingStack(): void {
  const s = readStackStatus();
  if (!s.apiOk || !s.marketingOk) {
    test.skip(true, `API/Marketing در دسترس نیست. ${s.hint}`);
  }
}

/** شماره یکتا برای دور زدن rate limit OTP در Redis */
export function e2eMobile(): string {
  const tail = String(Date.now() % 1_000_000_000).padStart(9, '0');
  return `09${tail}`;
}
