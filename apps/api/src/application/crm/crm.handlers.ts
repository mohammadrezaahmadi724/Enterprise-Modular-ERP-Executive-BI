import {
  createContact,
  getContactById,
  getCustomerPartyByCode,
  listContacts,
  listCustomerParties,
} from '../../modules/crm/crm.service';

export function crmPersistenceLabel(): string {
  return process.env.CRM_PERSISTENCE === '1' || process.env.CRM_PERSISTENCE === 'true'
    ? 'erp_operations.contacts'
    : 'in-memory';
}

export async function listContactsQuery() {
  return { contacts: await listContacts(), source: crmPersistenceLabel() };
}

export async function getContactQuery(id: string) {
  const contact = await getContactById(id);
  return contact ? { contact, source: crmPersistenceLabel() } : { contact: null };
}

export async function listCustomersQuery() {
  return { customers: await listCustomerParties(), source: crmPersistenceLabel() };
}

export async function getCustomerQuery(code: string) {
  const party = await getCustomerPartyByCode(code);
  return party ? { customer: party, source: crmPersistenceLabel() } : { customer: null };
}

export async function createContactCommand(input: { fullName: string; email?: string }) {
  return { contact: await createContact(input), source: crmPersistenceLabel() };
}
