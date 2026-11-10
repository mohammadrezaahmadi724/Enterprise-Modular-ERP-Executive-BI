import { operationsPrisma } from '../src/prisma/client.js';

const DEMO_TENANT = '11111111-1111-4111-8111-111111111111';

async function main() {
  await operationsPrisma.contact.upsert({
    where: { id: 'c0000000-0000-4000-8000-000000000001' },
    update: {},
    create: {
      id: 'c0000000-0000-4000-8000-000000000001',
      tenantId: DEMO_TENANT,
      fullName: 'مشتری نمونه',
      email: 'demo@example.ir',
    },
  });
  console.log('CRM demo seed OK');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => operationsPrisma.$disconnect());
