import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { loadRootEnv } from './e2e/load-root-env';

loadRootEnv();

const script = process.argv[2];
if (!script) {
  console.error('Usage: tsx tools/run-seed-with-env.ts <path-to-seed.ts>');
  process.exit(1);
}

const abs = resolve(process.cwd(), script);
void import(pathToFileURL(abs).href).catch((err) => {
  console.error(err);
  process.exit(1);
});
