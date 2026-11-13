export type CustomerPartyType = 'person' | 'organization';
export type CustomerStatus = 'active' | 'inactive';

export type SalesCustomer = {
  code: string;
  name: string;
  tags: string | null;
  partyType: CustomerPartyType;
  roles: string[];
  status: CustomerStatus;
  updatedAt: string;
};

export const CUSTOMER_TOTAL_COUNT = 433;
export const CUSTOMERS_PAGE_SIZE = 25;

const PARTY_TYPE_FA: Record<CustomerPartyType, string> = {
  person: 'شخص',
  organization: 'سازمان',
};

export function partyTypeLabel(t: CustomerPartyType): string {
  return PARTY_TYPE_FA[t];
}

const FEATURED: SalesCustomer[] = [
  {
    code: '1',
    name: '2',
    tags: null,
    partyType: 'person',
    roles: ['مشتری'],
    status: 'active',
    updatedAt: '۱۴۰۵/۰۷/۳۰',
  },
  {
    code: 'BOTH-3001',
    name: 'کارخانه فولاد سپاهان',
    tags: null,
    partyType: 'organization',
    roles: ['مشتری', 'تأمین‌کننده'],
    status: 'inactive',
    updatedAt: '۱۴۰۵/۰۷/۱۸',
  },
  {
    code: 'CUS-1001',
    name: 'صنایع غذایی پارس',
    tags: null,
    partyType: 'organization',
    roles: ['مشتری'],
    status: 'active',
    updatedAt: '۱۴۰۵/۰۷/۰۴',
  },
  {
    code: 'CUS-1002',
    name: 'رستوران‌های زنجیره‌ای شیراز',
    tags: null,
    partyType: 'organization',
    roles: ['مشتری'],
    status: 'active',
    updatedAt: '۱۴۰۵/۰۷/۰۵',
  },
  {
    code: 'CUS-1003',
    name: 'گروه هتل‌های بین‌المللی مشهد',
    tags: null,
    partyType: 'organization',
    roles: ['مشتری'],
    status: 'active',
    updatedAt: '۱۴۰۵/۰۷/۱۳',
  },
  {
    code: 'CUS-1004',
    name: 'فروشگاه‌های زنجیره‌ای افق طلایی',
    tags: null,
    partyType: 'organization',
    roles: ['مشتری'],
    status: 'active',
    updatedAt: '۱۴۰۵/۰۷/۱۳',
  },
  {
    code: 'CUS-1005',
    name: 'تعاونی مصرف فرهنگیان اصفهان',
    tags: null,
    partyType: 'organization',
    roles: ['مشتری'],
    status: 'active',
    updatedAt: '۱۴۰۵/۰۷/۱۳',
  },
  {
    code: 'CUS-1006',
    name: 'هایپرمارکت ستاره کویر',
    tags: null,
    partyType: 'organization',
    roles: ['مشتری'],
    status: 'active',
    updatedAt: '۱۴۰۵/۰۷/۱۳',
  },
  {
    code: 'CUS-1101',
    name: 'فروشگاه زنجیره‌ای آفتاب تهران',
    tags: null,
    partyType: 'organization',
    roles: ['مشتری'],
    status: 'active',
    updatedAt: '۱۴۰۵/۰۷/۲۹',
  },
  {
    code: 'CUS-1102',
    name: 'رستوران البرز کرج',
    tags: null,
    partyType: 'organization',
    roles: ['مشتری'],
    status: 'active',
    updatedAt: '۱۴۰۵/۰۷/۲۹',
  },
  {
    code: 'CUS-1103',
    name: 'هتل ارغوان کرمان',
    tags: null,
    partyType: 'organization',
    roles: ['مشتری'],
    status: 'active',
    updatedAt: '۱۴۰۵/۰۷/۲۹',
  },
  {
    code: 'CUS-1104',
    name: 'تعاونی مصرف بهار مشهد',
    tags: null,
    partyType: 'organization',
    roles: ['مشتری'],
    status: 'active',
    updatedAt: '۱۴۰۵/۰۷/۲۹',
  },
  {
    code: 'CUS-1105',
    name: 'سوپرمارکت پارسیان یزد',
    tags: null,
    partyType: 'organization',
    roles: ['مشتری'],
    status: 'active',
    updatedAt: '۱۴۰۵/۰۷/۲۹',
  },
  {
    code: 'CUS-1106',
    name: 'شرکت پخش تابان اصفهان',
    tags: null,
    partyType: 'organization',
    roles: ['مشتری'],
    status: 'active',
    updatedAt: '۱۴۰۵/۰۷/۲۹',
  },
  {
    code: 'CUS-1107',
    name: 'کترینگ ثمین قم',
    tags: null,
    partyType: 'organization',
    roles: ['مشتری'],
    status: 'active',
    updatedAt: '۱۴۰۵/۰۷/۲۹',
  },
  {
    code: 'CUS-1108',
    name: 'بازرگانی جهان همدان',
    tags: null,
    partyType: 'organization',
    roles: ['مشتری'],
    status: 'active',
    updatedAt: '۱۴۰۵/۰۷/۲۹',
  },
  {
    code: 'CUS-1109',
    name: 'فروشگاه زنجیره‌ای چکاد تبریز',
    tags: null,
    partyType: 'organization',
    roles: ['مشتری'],
    status: 'active',
    updatedAt: '۱۴۰۵/۰۷/۲۹',
  },
  {
    code: 'CUS-1110',
    name: 'نرگس رضایی (خریدار عمده)',
    tags: null,
    partyType: 'person',
    roles: ['مشتری'],
    status: 'active',
    updatedAt: '۱۴۰۵/۰۷/۲۹',
  },
  {
    code: 'CUS-1111',
    name: 'هتل خلیج شیراز',
    tags: null,
    partyType: 'organization',
    roles: ['مشتری'],
    status: 'active',
    updatedAt: '۱۴۰۵/۰۷/۲۹',
  },
  {
    code: 'CUS-1112',
    name: 'تعاونی مصرف دنا اهواز',
    tags: null,
    partyType: 'organization',
    roles: ['مشتری'],
    status: 'active',
    updatedAt: '۱۴۰۵/۰۷/۲۹',
  },
  {
    code: 'CUS-1113',
    name: 'سوپرمارکت رویال تهران',
    tags: null,
    partyType: 'organization',
    roles: ['مشتری'],
    status: 'active',
    updatedAt: '۱۴۰۵/۰۷/۲۹',
  },
  {
    code: 'CUS-1114',
    name: 'شرکت پخش زاگرس کرج',
    tags: null,
    partyType: 'organization',
    roles: ['مشتری'],
    status: 'active',
    updatedAt: '۱۴۰۵/۰۷/۲۹',
  },
  {
    code: 'CUS-1115',
    name: 'کترینگ ساحل کرمان',
    tags: null,
    partyType: 'organization',
    roles: ['مشتری'],
    status: 'active',
    updatedAt: '۱۴۰۵/۰۷/۲۹',
  },
  {
    code: 'CUS-1116',
    name: 'بازرگانی شبنم مشهد',
    tags: null,
    partyType: 'organization',
    roles: ['مشتری'],
    status: 'active',
    updatedAt: '۱۴۰۵/۰۷/۲۹',
  },
  {
    code: 'CUS-1117',
    name: 'فروشگاه زنجیره‌ای صدف یزد',
    tags: null,
    partyType: 'organization',
    roles: ['مشتری'],
    status: 'active',
    updatedAt: '۱۴۰۵/۰۷/۲۹',
  },
];

const ORG_PREFIX = ['فروشگاه زنجیره‌ای', 'شرکت پخش', 'تعاونی مصرف', 'هتل', 'رستوران', 'بازرگانی', 'کترینگ'];
const CITIES = ['تهران', 'مشهد', 'شیراز', 'اصفهان', 'تبریز', 'کرج', 'اهواز', 'یزد', 'قم', 'کرمان'];

function buildCatalog(): SalesCustomer[] {
  const list = [...FEATURED];
  const need = CUSTOMER_TOTAL_COUNT - list.length;
  for (let i = 0; i < need; i++) {
    const n = 1200 + i;
    const code = `CUS-${n}`;
    const prefix = ORG_PREFIX[i % ORG_PREFIX.length]!;
    const city = CITIES[i % CITIES.length]!;
    list.push({
      code,
      name: `${prefix} ${city}`,
      tags: i % 11 === 0 ? 'VIP' : null,
      partyType: i % 17 === 0 ? 'person' : 'organization',
      roles: i % 23 === 0 ? ['مشتری', 'تأمین‌کننده'] : ['مشتری'],
      status: i % 31 === 0 ? 'inactive' : 'active',
      updatedAt: `۱۴۰۵/۰${(i % 8) + 1}/${10 + (i % 15)}`,
    });
  }
  return list;
}

export const SALES_CUSTOMERS = buildCatalog();

export function findCustomerByCode(code: string): SalesCustomer | undefined {
  return SALES_CUSTOMERS.find((c) => c.code === code);
}

export function crmPartyToCustomer(p: {
  code: string;
  name: string;
  tags: string | null;
  partyType: CustomerPartyType;
  roles: string[];
  status: CustomerStatus;
  updatedAt: string;
}): SalesCustomer {
  return {
    code: p.code,
    name: p.name,
    tags: p.tags,
    partyType: p.partyType,
    roles: p.roles,
    status: p.status,
    updatedAt: p.updatedAt,
  };
}

export function mergeCustomersWithApi(
  demo: SalesCustomer[],
  apiRows: SalesCustomer[],
): SalesCustomer[] {
  if (apiRows.length === 0) return demo;
  const codes = new Set(apiRows.map((c) => c.code));
  return [...apiRows, ...demo.filter((c) => !codes.has(c.code))];
}

export type CustomerStatusFilter = 'all' | 'active' | 'inactive';
export type CustomerSortKey = 'code' | 'name' | 'updatedAt';
export type RowDensity = 'compact' | 'normal' | 'comfortable';

export function filterCustomers(
  rows: SalesCustomer[],
  opts: {
    search: string;
    status: CustomerStatusFilter;
    sortKey: CustomerSortKey;
    sortDir: 'asc' | 'desc';
  },
): SalesCustomer[] {
  const q = opts.search.trim();
  let out = rows.filter((c) => {
    if (opts.status === 'active' && c.status !== 'active') return false;
    if (opts.status === 'inactive' && c.status !== 'inactive') return false;
    if (q && !c.code.includes(q) && !c.name.includes(q)) return false;
    return true;
  });

  const dir = opts.sortDir === 'asc' ? 1 : -1;
  out = [...out].sort((a, b) => {
    const av = a[opts.sortKey];
    const bv = b[opts.sortKey];
    if (av < bv) return -1 * dir;
    if (av > bv) return 1 * dir;
    return 0;
  });

  return out;
}
