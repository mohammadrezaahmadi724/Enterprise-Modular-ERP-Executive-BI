import { PrismaClient } from '@prisma/client';

async function main() {
  const p = new PrismaClient();
  try {
    const r = await p.platformSetting.findUnique({ where: { key: 'price_catalog_v1' } });
    console.log('setting', r ? 'found' : 'null');
    const plans = await p.plan.findMany({ take: 3 });
    console.log('plans', plans.length);
  } catch (e) {
    console.error('PRISMA_ERR', e);
  } finally {
    await p.$disconnect();
  }
}

void main();
