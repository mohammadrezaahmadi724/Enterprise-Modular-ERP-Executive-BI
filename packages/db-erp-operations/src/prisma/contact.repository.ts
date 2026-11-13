import { TenantContext } from '@repo/domain';
import { crmPersistenceEnabled } from './client.js';
import { operationsSession } from './rls.js';

export type ContactRow = {
  id: string;
  tenantId: string;
  fullName: string;
  email?: string | null;
  phone?: string | null;
  company?: string | null;
  deletedAt?: Date | null;
  updatedAt?: Date;
};

export async function listContactsPrisma(): Promise<ContactRow[]> {
  if (!crmPersistenceEnabled()) return [];
  const tenantId = TenantContext.requireTenantId();
  return operationsSession((tx) =>
    tx.contact.findMany({
      where: { tenantId, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    }),
  );
}

export async function getContactByIdPrisma(id: string): Promise<ContactRow | null> {
  if (!crmPersistenceEnabled()) return null;
  const tenantId = TenantContext.requireTenantId();
  return operationsSession((tx) =>
    tx.contact.findFirst({
      where: { id, tenantId, deletedAt: null },
    }),
  );
}

export async function createContactPrisma(input: {
  fullName: string;
  email?: string;
}): Promise<ContactRow> {
  const tenantId = TenantContext.requireTenantId();
  const data = { tenantId, fullName: input.fullName, email: input.email };
  return operationsSession((tx) => tx.contact.create({ data }));
}
