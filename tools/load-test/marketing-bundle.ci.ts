import { readFileSync, existsSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { gzipSync } from 'node:zlib';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const MKT = path.join(ROOT, 'apps/marketing/app');
const LIMIT = 150 * 1024;

function collect(dir: string): string[] {
  if (!existsSync(dir)) return [];
  const out: string[] = [];
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...collect(full));
    else if (e.name.endsWith('.tsx')) out.push(full);
  }
  return out;
}

const home = path.join(MKT, 'page.tsx');
const homeGzip = existsSync(home) ? gzipSync(readFileSync(home, 'utf8')).byteLength : 0;

const layout = path.join(MKT, 'layout.tsx');
const layoutGzip = existsSync(layout) ? gzipSync(readFileSync(layout, 'utf8')).byteLength : 0;

const total = homeGzip + layoutGzip;

if (total > LIMIT) {
  console.error('Marketing bundle gate failed', { total, limit: LIMIT });
  process.exit(1);
}

console.log('Marketing bundle gate passed', { homeGzip, layoutGzip, total });
