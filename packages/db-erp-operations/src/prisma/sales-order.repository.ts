import { TenantContext } from '@repo/domain';
import { crmPersistenceEnabled } from './client.js';
import { operationsSession } from './rls.js';

export type SalesOrderRow = {
  id: string;
  tenantId: string;
  orderNumber: string;
  customerId: string;
  status: string;
  total: { toString(): string };
  currency: string;
  lines: Array<{
    productId: string;
    quantity: bigint;
    unitPrice: { toString(): string };
    lineTotal: { toString(): string };
  }>;
};

export async function listSalesOrdersPrisma(): Promise<SalesOrderRow[]> {
  if (!crmPersistenceEnabled()) return [];
  const tenantId = TenantContext.requireTenantId();
  return operationsSession((tx) =>
    tx.salesOrder.findMany({
      where: { tenantId },
      include: { lines: true },
      orderBy: { createdAt: 'desc' },
      take: 200,
    }),
  ) as Promise<SalesOrderRow[]>;
}

export async function getSalesOrderByNumberPrisma(orderNumber: string): Promise<SalesOrderRow | null> {
  if (!crmPersistenceEnabled()) return null;
  const tenantId = TenantContext.requireTenantId();
  return operationsSession((tx) =>
    tx.salesOrder.findFirst({
      where: { tenantId, orderNumber },
      include: { lines: true },
    }),
  ) as Promise<SalesOrderRow | null>;
}
