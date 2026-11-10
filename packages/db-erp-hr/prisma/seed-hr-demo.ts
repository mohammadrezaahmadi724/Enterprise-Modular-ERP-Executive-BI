import { ensureHrDemoSeed } from '../src/prisma/hr.repository.js';

const DEMO_TENANT = '11111111-1111-4111-8111-111111111111';

async function main() {
  process.env.HR_PERSISTENCE = 'true';
  await ensureHrDemoSeed(DEMO_TENANT);
  console.log('HR demo seed OK');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
