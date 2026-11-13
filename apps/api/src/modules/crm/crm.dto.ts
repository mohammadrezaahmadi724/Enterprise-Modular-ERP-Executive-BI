export type CrmContactDto = {
  id: string;
  tenantId: string;
  fullName: string;
  email?: string;
  phone?: string;
  company?: string;
  updatedAt: string;
};

export type CrmCustomerPartyDto = {
  code: string;
  contactId: string;
  name: string;
  tags: string | null;
  partyType: 'person' | 'organization';
  roles: string[];
  status: 'active' | 'inactive';
  updatedAt: string;
  email?: string;
  phone?: string;
  company?: string;
};
