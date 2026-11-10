import { TenantContext } from '@repo/domain';
import { rlsSessionEnabled } from '@repo/db-core-adapter';
import { crmPersistenceEnabled, operationsPrisma } from './client.js';
import { operationsTransaction } from './rls.js';

export type ContactRow = {
  id: string;
  tenantId: string;
  fullName: string;
  email?: string | null;
  deletedAt?: Date | null;
};

export async function listContactsPrisma(): Promise<ContactRow[]> {
  if (!crmPersistenceEnabled()) return [];
  const tenantId = TenantContext.requireTenantId();
  return operationsPrisma.contact.findMany({
    where: { tenantId, deletedAt: null },
    orderBy: { createdAt: 'desc' },
  });
}

export async function createContactPrisma(input: {
  fullName: string;
  email?: string;
}): Promise<ContactRow> {
  const tenantId = TenantContext.requireTenantId();
  const data = { tenantId, fullName: input.fullName, email: input.email };
  return rlsSessionEnabled()
    ? operationsTransaction((tx) => tx.contact.create({ data }))
    : operationsPrisma.contact.create({ data });
}
