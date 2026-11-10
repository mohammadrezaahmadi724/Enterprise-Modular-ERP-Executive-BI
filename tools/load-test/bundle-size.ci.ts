/**
 * Bundle size gate — خلأ ۵ — بند ۳.۲
 * اجرا: pnpm exec tsx tools/load-test/bundle-size.ci.ts
 */
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { gzipSync } from 'node:zlib';

import { fileURLToPath } from 'node:url';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const WEB_APP = path.join(ROOT, 'apps/web/app');
const DASHBOARD_LIMIT = 250 * 1024;
const MODULE_SHARE_LIMIT = 0.2;

function collectTsxFiles(dir: string): string[] {
  if (!existsSync(dir)) return [];
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...collectTsxFiles(full));
    else if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) out.push(full);
  }
  return out;
}

function gzipSize(content: string): number {
  return gzipSync(Buffer.from(content, 'utf8')).byteLength;
}

const dashboardPath = path.join(WEB_APP, 'dashboard/page.tsx');
const dashboardSize = existsSync(dashboardPath) ? gzipSize(readFileSync(dashboardPath, 'utf8')) : 0;

const allFiles = collectTsxFiles(WEB_APP);
const totalGzip = allFiles.reduce((sum, f) => sum + gzipSize(readFileSync(f, 'utf8')), 0);
const crmOnly = allFiles.filter((f) => f.includes('crm') || f.includes('dashboard') || f.includes('login'));
const crmGzip = crmOnly.reduce((sum, f) => sum + gzipSize(readFileSync(f, 'utf8')), 0);
const ratio = totalGzip === 0 ? 0 : crmGzip / totalGzip;

const okDashboard = dashboardSize <= DASHBOARD_LIMIT;
const okRatio = ratio <= MODULE_SHARE_LIMIT || totalGzip < 5_000;

if (!okDashboard || !okRatio) {
  console.error('Bundle gate failed', { dashboardSize, ratio, okDashboard, okRatio });
  process.exit(1);
}

console.log('Bundle gate passed', { dashboardSize, totalGzip, crmGzip, ratio });
