import { ensureFinanceTenantBootstrap } from '../src/prisma/journal.repository.js';

const DEMO_TENANT = '11111111-1111-4111-8111-111111111111';

async function main() {
  process.env.FINANCE_PERSISTENCE = 'true';
  await ensureFinanceTenantBootstrap(DEMO_TENANT);
  console.log('Finance demo seed OK');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
