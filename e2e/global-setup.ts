import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

function loadRootEnv(): void {
  const envPath = resolve(process.cwd(), '.env');
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq < 1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = val;
  }
}

async function ping(url: string, path = '/'): Promise<boolean> {
  const target = `${url.replace(/\/$/, '')}${path}`;
  try {
    const res = await fetch(target, { signal: AbortSignal.timeout(4_000) });
    return res.ok;
  } catch {
    return false;
  }
}

export default async function globalSetup(): Promise<void> {
  loadRootEnv();

  const api = process.env.E2E_API_URL ?? 'http://127.0.0.1:3000';
  const web = process.env.E2E_BASE_URL ?? 'http://127.0.0.1:3001';
  const marketing = process.env.E2E_MARKETING_URL ?? 'http://127.0.0.1:3003';

  const [apiOk, webOk, marketingOk] = await Promise.all([
    ping(api, '/health'),
    ping(web, '/dashboard'),
    ping(marketing, '/pricing/estimate'),
  ]);

  const status = {
    api,
    web,
    marketing,
    apiOk,
    webOk,
    marketingOk,
    hint:
      'برای E2E سه ترمینال: pnpm --filter @repo/api dev | pnpm --filter @repo/web dev | pnpm --filter @repo/marketing dev',
  };

  writeFileSync(resolve(process.cwd(), 'e2e/.stack-status.json'), JSON.stringify(status, null, 2), 'utf8');

  if (!apiOk || !webOk) {
    // eslint-disable-next-line no-console
    console.warn(
      `\n⚠️  E2E stack ناقص — apiOk=${apiOk} webOk=${webOk} marketingOk=${marketingOk}\n${status.hint}\n`,
    );
  }
}
