export type ReconBankAccount = {
  id: string;
  label: string;
  iban: string | null;
  branch: string;
  branchCode: string | null;
  activeInTreasury: boolean;
};

export const RECON_BANK_ACCOUNTS: ReconBankAccount[] = [
  {
    id: '7e2cf386-f2a3-4bc5-b1b2-cd9a5eb6ec5a',
    label: 'بانک ملی — حساب جاری اصلی',
    iban: null,
    branch: 'مرکزی',
    branchCode: null,
    activeInTreasury: true,
  },
  {
    id: '0bd1bcd6-d0be-4fe0-977b-62e3102cbc97',
    label: 'بانک ملت — حساب فروش و عملیاتی',
    iban: null,
    branch: 'مرکزی',
    branchCode: null,
    activeInTreasury: true,
  },
  {
    id: '202f6b76-e3a4-45fa-ab8c-e94ca93e733c',
    label: 'بانک تجارت — حساب تسویه تأمین‌کنندگان',
    iban: null,
    branch: 'مرکزی',
    branchCode: null,
    activeInTreasury: true,
  },
];

export const RECON_SESSIONS_COUNT = 0;
