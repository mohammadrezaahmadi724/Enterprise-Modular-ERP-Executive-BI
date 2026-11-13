import { randomUUID } from 'node:crypto';
import { TenantContext } from '@repo/domain';
import {
  createContactPrisma,
  crmPersistenceEnabled,
  getContactByIdPrisma,
  listContactsPrisma,
} from '@repo/db-erp-operations';
import type { CrmContactDto, CrmCustomerPartyDto } from './crm.dto';

type Contact = {
  id: string;
  tenantId: string;
  fullName: string;
  email?: string;
  phone?: string;
  company?: string;
  deletedAt?: Date;
  updatedAt: Date;
};

const contacts = new Map<string, Contact>();

function jalaliStub(d: Date): string {
  const y = d.getFullYear() - 621;
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}/${m}/${day}`;
}

export function crmContactPartyCode(contactId: string): string {
  return `CRM-${contactId.replace(/-/g, '').slice(0, 8).toUpperCase()}`;
}

function partyCodeToPrefix(code: string): string | null {
  const m = /^CRM-([A-F0-9]{8})$/i.exec(code.trim());
  return m ? m[1]!.toUpperCase() : null;
}

function toContactDto(row: Contact): CrmContactDto {
  return {
    id: row.id,
    tenantId: row.tenantId,
    fullName: row.fullName,
    email: row.email,
    phone: row.phone,
    company: row.company,
    updatedAt: row.updatedAt.toISOString(),
  };
}

function toCustomerParty(row: Contact): CrmCustomerPartyDto {
  const hasCompany = Boolean(row.company?.trim());
  return {
    code: crmContactPartyCode(row.id),
    contactId: row.id,
    name: row.fullName,
    tags: null,
    partyType: hasCompany ? 'organization' : 'person',
    roles: ['مشتری'],
    status: 'active',
    updatedAt: jalaliStub(row.updatedAt),
    email: row.email,
    phone: row.phone,
    company: row.company,
  };
}

export async function createContact(input: { fullName: string; email?: string }): Promise<CrmContactDto> {
  if (crmPersistenceEnabled()) {
    const row = await createContactPrisma(input);
    return toContactDto({
      id: row.id,
      tenantId: row.tenantId,
      fullName: row.fullName,
      email: row.email ?? undefined,
      phone: row.phone ?? undefined,
      company: row.company ?? undefined,
      updatedAt: row.updatedAt ?? new Date(),
    });
  }
  const tenantId = TenantContext.requireTenantId();
  const row: Contact = {
    id: randomUUID(),
    tenantId,
    fullName: input.fullName,
    email: input.email,
    updatedAt: new Date(),
  };
  contacts.set(row.id, row);
  return toContactDto(row);
}

export async function listContacts(): Promise<CrmContactDto[]> {
  if (crmPersistenceEnabled()) {
    const rows = await listContactsPrisma();
    return rows.map((r) =>
      toContactDto({
        id: r.id,
        tenantId: r.tenantId,
        fullName: r.fullName,
        email: r.email ?? undefined,
        phone: r.phone ?? undefined,
        company: r.company ?? undefined,
        updatedAt: r.updatedAt ?? new Date(),
      }),
    );
  }
  const tenantId = TenantContext.requireTenantId();
  return [...contacts.values()]
    .filter((c) => c.tenantId === tenantId && !c.deletedAt)
    .map(toContactDto);
}

export async function listCustomerParties(): Promise<CrmCustomerPartyDto[]> {
  if (crmPersistenceEnabled()) {
    const rows = await listContactsPrisma();
    return rows.map((r) =>
      toCustomerParty({
        id: r.id,
        tenantId: r.tenantId,
        fullName: r.fullName,
        email: r.email ?? undefined,
        phone: r.phone ?? undefined,
        company: r.company ?? undefined,
        updatedAt: r.updatedAt ?? new Date(),
      }),
    );
  }
  const tenantId = TenantContext.requireTenantId();
  return [...contacts.values()]
    .filter((c) => c.tenantId === tenantId && !c.deletedAt)
    .map(toCustomerParty);
}

export async function getContactById(id: string): Promise<CrmContactDto | null> {
  if (crmPersistenceEnabled()) {
    const row = await getContactByIdPrisma(id);
    if (!row) return null;
    return toContactDto({
      id: row.id,
      tenantId: row.tenantId,
      fullName: row.fullName,
      email: row.email ?? undefined,
      phone: row.phone ?? undefined,
      company: row.company ?? undefined,
      updatedAt: row.updatedAt ?? new Date(),
    });
  }
  const tenantId = TenantContext.requireTenantId();
  const row = contacts.get(id);
  if (!row || row.tenantId !== tenantId || row.deletedAt) return null;
  return toContactDto(row);
}

export async function getCustomerPartyByCode(code: string): Promise<CrmCustomerPartyDto | null> {
  const all = await listCustomerParties();
  const exact = all.find((c) => c.code === code);
  if (exact) return exact;
  const prefix = partyCodeToPrefix(code);
  if (prefix) {
    const hit = all.find((c) => c.contactId.replace(/-/g, '').toUpperCase().startsWith(prefix));
    if (hit) return hit;
  }
  const byId = await getContactById(code);
  if (byId) {
    const row: Contact = {
      id: byId.id,
      tenantId: byId.tenantId,
      fullName: byId.fullName,
      email: byId.email,
      phone: byId.phone,
      company: byId.company,
      updatedAt: new Date(byId.updatedAt),
    };
    return toCustomerParty(row);
  }
  return null;
}
