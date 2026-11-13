import { PrismaClient } from '@prisma/client';
import { DEFAULT_PLAN_ROLE_TEMPLATES, PERMISSION_CATALOG, TENANT_ADMIN_PERMISSIONS } from '@repo/contracts';
import { loadRootEnv } from '../../../tools/e2e/load-root-env';

loadRootEnv();

const prisma = new PrismaClient();

async function ensureTenantRole(
  tenantId: string,
  code: string,
  name: string,
  preferredId: string,
  permissions: string[],
): Promise<string> {
  const byTenant = await prisma.role.findFirst({ where: { tenantId, code } });
  if (byTenant) {
    await prisma.role.update({
      where: { id: byTenant.id },
      data: { name, permissions },
    });
    return byTenant.id;
  }
  const byId = await prisma.role.findUnique({ where: { id: preferredId } });
  if (byId) {
    await prisma.role.update({
      where: { id: preferredId },
      data: { tenantId, code, name, permissions },
    });
    return preferredId;
  }
  await prisma.role.create({
    data: { id: preferredId, tenantId, code, name, permissions },
  });
  return preferredId;
}

async function ensurePermissionCatalog() {
  for (const entry of PERMISSION_CATALOG) {
    await prisma.permission.upsert({
      where: { code: entry.code },
      update: { description: entry.labelFa },
      create: { code: entry.code, description: entry.labelFa },
    });
  }
}

async function main() {
  await ensurePermissionCatalog();

  const plan = await prisma.plan.upsert({
    where: { code: 'professional' },
    update: {},
    create: {
      code: 'professional',
      nameFa: 'حرفه‌ای',
      description: 'همه ماژول‌ها — ۲۵ صندلی',
      isActive: true,
    },
  });

  const planVersion = await prisma.planVersion.upsert({
    where: { id: '00000000-0000-4000-8000-000000000001' },
    update: {},
    create: {
      id: '00000000-0000-4000-8000-000000000001',
      planId: plan.id,
      version: 1,
      pricingModel: 'PerSeat',
      basePrice: 1_290_000,
      currency: 'IRT',
      features: { modules: 'all', roleTemplates: DEFAULT_PLAN_ROLE_TEMPLATES },
      limits: { max_seats: 25 },
      effectiveFrom: new Date(),
    },
  });

  await prisma.planLimit.upsert({
    where: { id: '00000000-0000-4000-8000-000000000010' },
    update: { limitValue: '25' },
    create: {
      id: '00000000-0000-4000-8000-000000000010',
      planVersionId: planVersion.id,
      limitKey: 'max_seats',
      limitValue: '25',
    },
  });

  const demoTenantId = '11111111-1111-4111-8111-111111111111';
  const tenant = await prisma.tenant.upsert({
    where: { slug: 'demo-company' },
    update: {},
    create: {
      id: demoTenantId,
      name: 'شرکت نمونه',
      slug: 'demo-company',
      status: 'Trial',
      trialEndsAt: new Date(Date.now() + 14 * 86400_000),
    },
  });
  /** همیشه id واقعی ردیف tenant — نه UUID ثابت seed (ممکن است tenant از قبل با id دیگر ساخته شده باشد) */
  const tenantId = tenant.id;

  await prisma.platformFeatureFlag.upsert({
    where: { flagKey: 'checkout.v2' },
    update: {},
    create: { flagKey: 'checkout.v2', description: 'چک‌اوت ۷ مرحله', rollout: 100, enabled: true },
  });

  await prisma.supportTicket.upsert({
    where: { id: '00000000-0000-4000-8000-ticket0001' },
    update: {},
    create: {
      id: '00000000-0000-4000-8000-ticket0001',
      tenantId: tenant.id,
      subject: 'نمونه تیکت پشتیبانی',
      priority: 'high',
      status: 'open',
    },
  });

  const subscription = await prisma.subscription.upsert({
    where: { tenantId: tenant.id },
    update: { usedSeats: 3 },
    create: {
      tenantId: tenant.id,
      planVersionId: planVersion.id,
      planSnapshot: { code: 'professional', seats: 25 },
      status: 'Trial',
      currentPeriodStart: new Date(),
      currentPeriodEnd: new Date(Date.now() + 30 * 86400_000),
      seats: 25,
      usedSeats: 3,
    },
  });

  const planSnap = { code: 'professional', nameFa: plan.nameFa, seats: 25 };
  const fxSnap = { base: 'IRR', rate: 1, at: new Date().toISOString() };
  const invoiceDefs = [
    {
      id: '00000000-0000-4000-8000-inv00001',
      invoiceNumber: 'CLD-1403-01001',
      issueOffsetDays: -35,
      status: 'Paid' as const,
      total: 18_500_000,
    },
    {
      id: '00000000-0000-4000-8000-inv00002',
      invoiceNumber: 'CLD-1403-01002',
      issueOffsetDays: -5,
      status: 'Issued' as const,
      total: 19_200_000,
    },
  ];
  for (const inv of invoiceDefs) {
    const issue = new Date(Date.now() + inv.issueOffsetDays * 86400_000);
    const due = new Date(issue.getTime() + 7 * 86400_000);
    await prisma.invoice.upsert({
      where: { tenantId_invoiceNumber: { tenantId, invoiceNumber: inv.invoiceNumber } },
      update: { status: inv.status, total: inv.total },
      create: {
        id: inv.id,
        tenantId,
        subscriptionId: subscription.id,
        invoiceNumber: inv.invoiceNumber,
        serialPattern: 'CLD-{year}-{seq}',
        issueDate: issue,
        dueDate: due,
        status: inv.status,
        subtotal: inv.total,
        taxAmount: 0,
        discountAmount: 0,
        total: inv.total,
        currency: 'IRT',
        exchangeRateSnapshot: fxSnap,
        planSnapshot: planSnap,
        correlationId: `seed-invoice-${inv.invoiceNumber}`,
        items: {
          create: [
            {
              description: 'اشتراک Sakhtar Cloud — ماهانه',
              quantity: 1,
              unitPrice: inv.total,
              taxRate: 0,
              lineTotal: inv.total,
            },
          ],
        },
      },
    });
  }

  const demoUserId = '00000000-0000-4000-8000-000000000001';
  const demoAdminUserId = '00000000-0000-4000-8000-000000000099';
  const demoCfoRoleId = '00000000-0000-4000-8000-role00cfo';
  const demoHrRoleId = '00000000-0000-4000-8000-role00hr';
  const demoCompanyAdminRoleId = '00000000-0000-4000-8000-role0admin';

  const companyAdminRoleId = await ensureTenantRole(
    tenantId,
    'COMPANY_ADMIN',
    'مدیر سازمان',
    demoCompanyAdminRoleId,
    [
      ...TENANT_ADMIN_PERMISSIONS,
      'erp.read',
      'erp.write',
      'finance.read',
      'finance.write',
      'operations.read',
      'operations.write',
      'crm.read',
      'crm.write',
    ],
  );

  const cfoRoleId = await ensureTenantRole(tenantId, 'CFO', 'مدیر مالی', demoCfoRoleId, [
    'finance.read',
    'finance.write',
    'crm.read',
    'erp.read',
    'erp.write',
    'operations.read',
    'platform.ops.read',
  ]);

  await ensureTenantRole(tenantId, 'HR_MANAGER', 'مدیر منابع انسانی', demoHrRoleId, [
    'hr.read',
    'hr.write',
    'erp.read',
  ]);

  await prisma.user.upsert({
    where: { email: 'cfo@demo.ir' },
    update: { tenantId },
    create: {
      id: demoUserId,
      tenantId,
      email: 'cfo@demo.ir',
      passwordHash: '$2b$12$o4.2SIH3/CZnt/AgOQE9Bu0LGWWNfk4S9RwwkvEvpDm.DmSVX1Uda',
      fullName: 'مدیر مالی نمونه',
      isSuperAdmin: false,
    },
  });

  await prisma.userRoleAssignment.upsert({
    where: { userId_roleId: { userId: demoUserId, roleId: cfoRoleId } },
    update: {},
    create: { userId: demoUserId, roleId: cfoRoleId },
  });

  await prisma.user.upsert({
    where: { email: 'admin@demo.ir' },
    update: { tenantId, accountStatus: 'Active' },
    create: {
      id: demoAdminUserId,
      tenantId,
      email: 'admin@demo.ir',
      passwordHash: '$2b$12$o4.2SIH3/CZnt/AgOQE9Bu0LGWWNfk4S9RwwkvEvpDm.DmSVX1Uda',
      fullName: 'مدیر سازمان',
      isSuperAdmin: false,
      accountStatus: 'Active',
    },
  });

  await prisma.userRoleAssignment.upsert({
    where: { userId_roleId: { userId: demoAdminUserId, roleId: companyAdminRoleId } },
    update: {},
    create: { userId: demoAdminUserId, roleId: companyAdminRoleId },
  });

  for (const code of ['finance-base', 'crm-base', 'operations-base', 'projects-base', 'hr-base'] as const) {
    await prisma.tenantModule.upsert({
      where: { tenantId_moduleCode: { tenantId, moduleCode: code } },
      update: { status: 'Active', activatedAt: new Date() },
      create: {
        tenantId,
        moduleCode: code,
        version: '1.0.0',
        status: 'Active',
        activatedAt: new Date(),
      },
    });
  }

  await prisma.user.upsert({
    where: { email: 'superadmin@example.ir' },
    update: {},
    create: {
      email: 'superadmin@example.ir',
      passwordHash: '$2b$10$7EqJtq98hPqEX7fNZa1oOe8qKZ5n0Y5x0Y5x0Y5x0Y5x0Y5x0Y5x0',
      fullName: 'سوپر ادمین',
      isSuperAdmin: true,
    },
  });

  const planDefs = [
    {
      code: 'starter',
      nameFa: 'استارتر',
      basePrice: 4_900_000,
      includedModules: ['finance', 'sales', 'inventory'],
    },
    {
      code: 'growth',
      nameFa: 'رشد',
      basePrice: 12_900_000,
      includedModules: ['finance', 'sales', 'inventory', 'hr', 'distribution', 'retail'],
    },
    {
      code: 'enterprise',
      nameFa: 'سازمانی',
      basePrice: 0,
      includedModules: [
        'finance',
        'sales',
        'hr',
        'inventory',
        'manufacturing',
        'distribution',
        'retail',
        'bi-risk',
        'ai-messaging',
      ],
    },
  ] as const;

  for (const def of planDefs) {
    const p = await prisma.plan.upsert({
      where: { code: def.code },
      update: { nameFa: def.nameFa, isActive: true },
      create: { code: def.code, nameFa: def.nameFa, description: `پلن ${def.nameFa}`, isActive: true },
    });
    const existing = await prisma.planVersion.findFirst({
      where: { planId: p.id },
      orderBy: { version: 'desc' },
    });
    if (!existing) {
      await prisma.planVersion.create({
        data: {
          planId: p.id,
          version: 1,
          pricingModel: 'PerSeat',
          basePrice: def.basePrice,
          currency: 'IRT',
          features: {
            includedModules: [...def.includedModules],
            modulePrices: {},
          },
          limits: { max_seats: def.code === 'starter' ? 10 : def.code === 'growth' ? 30 : 999 },
          effectiveFrom: new Date(),
        },
      });
    }
  }

  await prisma.platformSetting.upsert({
    where: { key: 'price_catalog_v1' },
    update: {},
    create: { key: 'price_catalog_v1', value: { version: 3, modules: {} } },
  });

  /** هم‌تراز با @repo/contracts — CLOUD_SUBSCRIPTION_SETTING_KEY */
  await prisma.platformSetting.upsert({
    where: { key: 'cloud_subscription_v1' },
    update: {},
    create: {
      key: 'cloud_subscription_v1',
      value: {
        baseMonthlyTomans: 12_000_000,
        includedSeats: 10,
        extraSeatTomans: 500_000,
        maxSeats: 30,
        planCode: 'professional',
        moduleMonthlyTomans: {
          sales: 4_000_000,
          finance: 5_000_000,
          inventory: 4_500_000,
          hr: 3_500_000,
          manufacturing: 5_500_000,
          distribution: 4_800_000,
          retail: 4_200_000,
          'bi-risk': 2_500_000,
          'ai-messaging': 3_000_000,
        },
      },
    },
  });

  console.log('Seed OK:', { tenant: tenant.slug, plan: plan.code });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
