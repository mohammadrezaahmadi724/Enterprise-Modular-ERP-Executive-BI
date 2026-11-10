import { randomUUID } from 'node:crypto';
import { TenantContext } from '@repo/domain';
import {
  createContactPrisma,
  crmPersistenceEnabled,
  listContactsPrisma,
} from '@repo/db-erp-operations';

type Contact = {
  id: string;
  tenantId: string;
  fullName: string;
  email?: string;
  deletedAt?: Date;
};

const contacts = new Map<string, Contact>();

export async function createContact(input: { fullName: string; email?: string }): Promise<Contact> {
  if (crmPersistenceEnabled()) {
    const row = await createContactPrisma(input);
    return { id: row.id, tenantId: row.tenantId, fullName: row.fullName, email: row.email ?? undefined };
  }
  const tenantId = TenantContext.requireTenantId();
  const row: Contact = {
    id: randomUUID(),
    tenantId,
    fullName: input.fullName,
    email: input.email,
  };
  contacts.set(row.id, row);
  return row;
}

export async function listContacts(): Promise<Contact[]> {
  if (crmPersistenceEnabled()) {
    const rows = await listContactsPrisma();
    return rows.map((r) => ({
      id: r.id,
      tenantId: r.tenantId,
      fullName: r.fullName,
      email: r.email ?? undefined,
    }));
  }
  const tenantId = TenantContext.requireTenantId();
  return [...contacts.values()].filter((c) => c.tenantId === tenantId && !c.deletedAt);
}
