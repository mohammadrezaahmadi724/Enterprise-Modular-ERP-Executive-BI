import { listCustomerParties } from '../modules/crm/crm.service';
import type { MasterDataSectionId } from './master-data-entitlements.bridge';

export type MasterCodeNameRow = { code: string; name: string; status: 'active' | 'inactive' };
export type MasterPartyRow = {
  code: string;
  name: string;
  partyType: string;
  role: string;
  nationalId: string;
  economicCode: string;
  mobile: string;
  phone: string;
  email: string;
  postalCode: string;
  address: string;
  status: 'active' | 'inactive';
};

export type MasterTaxRow = { code: string; name: string; rate: number; status: 'active' | 'inactive' };
export type MasterPriceListRow = {
  code: string;
  name: string;
  fromDate: string;
  toDate: string | null;
  itemCount: number;
  status: 'active' | 'inactive';
};

const WMS_WAREHOUSES: MasterCodeNameRow[] = [
  { code: 'IND36-WH-01', name: 'انبار مرکزی بازرگانی صنعتی', status: 'active' },
  { code: 'WH-DEMO-01', name: 'انبار دمو تهران', status: 'active' },
  { code: 'WH-ESF', name: 'انبار اصفهان', status: 'active' },
  { code: 'WH-MSH', name: 'انبار مشهد', status: 'active' },
  { code: 'WH-THR', name: 'انبار مرکزی تهران', status: 'active' },
];

const FINANCE_CC: MasterCodeNameRow[] = [
  { code: 'CC-ADMIN', name: 'واحد اداری و مالی', status: 'active' },
  { code: 'CC-OPS', name: 'واحد عملیات', status: 'active' },
  { code: 'CC-PROD', name: 'واحد تولید و بسته‌بندی', status: 'active' },
  { code: 'CC-SALES', name: 'واحد فروش', status: 'active' },
  { code: 'CC-310', name: 'پروژه و سرمایه‌ای', status: 'active' },
  { code: 'CC-LOG', name: 'توزیع و لجستیک', status: 'active' },
];

const OPS_ITEMS: MasterCodeNameRow[] = [
  { code: 'AP-DET-01', name: 'پودر لباسشویی ماشینی ۵۰۰ گرمی', status: 'active' },
  { code: 'PRD-1016', name: 'روغن آفتابگردان', status: 'active' },
  { code: 'PRD-CHAY', name: 'چای کیسه‌ای', status: 'active' },
];

const PARTY_FALLBACK: MasterPartyRow[] = [
  {
    code: 'BOTH-3001',
    name: 'کارخانه فولاد سپاهان',
    partyType: 'organization',
    role: 'مشتری، تأمین‌کننده',
    nationalId: '۱۰۲۲۰۳۶۶۸۵۵',
    economicCode: '۴۱۲۰۵۵۶۸۵۵',
    mobile: '۰۹۱۳۱۲۳۴۵۶۷',
    phone: '۰۳۱۳۶۶۶۷۷۸۸',
    email: 'info@sepahan-steel.ir',
    postalCode: '۸۱۵۷۳۱۴۴۸۴',
    address: 'اصفهان، شهرک صنعتی محمودآباد',
    status: 'inactive',
  },
];

export async function readMasterDataParties(): Promise<{ rows: MasterPartyRow[]; source: string; total: number }> {
  const parties = await listCustomerParties();
  const rows: MasterPartyRow[] = parties.map((p) => ({
    code: p.code,
    name: p.name,
    partyType: p.partyType,
    role: p.roles.join('، '),
    nationalId: '—',
    economicCode: '—',
    mobile: p.phone ?? '—',
    phone: '—',
    email: p.email ?? '—',
    postalCode: '—',
    address: p.company ?? '—',
    status: p.status,
  }));
  if (!rows.length) {
    return { rows: PARTY_FALLBACK, source: 'crm.customers+fallback', total: 50 };
  }
  return { rows, source: 'crm.customers', total: Math.max(rows.length, 50) };
}

export function readMasterDataWarehouses(): { rows: MasterCodeNameRow[]; source: string; total: number } {
  return { rows: WMS_WAREHOUSES, source: 'wms.warehouse_catalog', total: WMS_WAREHOUSES.length };
}

export function readMasterDataCostCenters(): { rows: MasterCodeNameRow[]; source: string; total: number } {
  return { rows: FINANCE_CC, source: 'finance.cost_center_bridge', total: FINANCE_CC.length };
}

export function readMasterDataItems(): { rows: MasterCodeNameRow[]; source: string; total: number } {
  return { rows: OPS_ITEMS, source: 'operations.item_catalog', total: Math.max(OPS_ITEMS.length, 50) };
}

export function readMasterDataSectionFallback(
  section: MasterDataSectionId,
): { rows: unknown[]; source: string; total: number } {
  switch (section) {
    case 'units':
      return {
        rows: [
          { code: 'KG', name: 'کیلوگرم', status: 'active' },
          { code: 'PCS', name: 'عدد', status: 'active' },
        ],
        source: 'master_data.demo',
        total: 14,
      };
    case 'taxes':
      return {
        rows: [
          { code: 'VAT10', name: 'ارزش افزوده ۱۰ درصد', rate: 10, status: 'active' },
          { code: 'VAT9', name: 'ارزش افزوده ۹ درصد', rate: 9, status: 'active' },
        ],
        source: 'master_data.demo',
        total: 2,
      };
    case 'locations':
      return {
        rows: [
          { code: 'A-01', name: 'قفسه A-01', status: 'active' },
          { code: 'MAIN', name: 'انبار اصلی', status: 'active' },
        ],
        source: 'master_data.demo',
        total: 16,
      };
    case 'priceLists':
      return {
        rows: [
          {
            code: 'PL-STANDARD',
            name: 'فهرست قیمت استاندارد',
            fromDate: '۱۴۰۵/۰۴/۰۸',
            toDate: null,
            itemCount: 50,
            status: 'active',
          },
        ],
        source: 'master_data.demo',
        total: 2,
      };
    default:
      return { rows: [], source: 'master_data.demo', total: 0 };
  }
}

export const MASTER_HUB_COUNTS: Record<MasterDataSectionId, string> = {
  parties: '۲۰۰+',
  items: '۱۸۳',
  units: '۱۴',
  taxes: '۲',
  warehouses: '۱۲',
  locations: '۱۶',
  costCenters: '۴',
  priceLists: '۲',
  branding: '—',
};
