import type { ErpModuleCode } from './module-catalog';

export type EstimatorComplexity = 'minimal' | 'standard' | 'advanced';

export type EstimatorWizardModuleId =
  | 'sales'
  | 'inventory'
  | 'finance'
  | 'hr'
  | 'distribution'
  | 'retail'
  | 'manufacturing'
  | 'org-comms';

export type EstimatorAddonDef = {
  id: string;
  titleFa: string;
  descriptionFa: string;
  /** هزینه پیاده‌سازی تقریبی (تومان) */
  implementationTomans: number;
  /** اگر false باشد در برآورد عددی لحاظ نمی‌شود (نیازمند بررسی) */
  availableInProduct: boolean;
};

export type EstimatorModuleDef = {
  id: EstimatorWizardModuleId;
  erpCode: ErpModuleCode;
  nameFa: string;
  metaFa: string;
  color: string;
  includedFeatures: string[];
  addons: EstimatorAddonDef[];
  /** پایه پیاده‌سازی (میلیون تومان در UI؛ ذخیره به تومان) */
  implementationBaseTomans: number;
  /** اشتراک ماهانه ابری (تومان) — هم‌تراز پنل tenant */
  cloudMonthlyTomans: number;
};

export const ESTIMATOR_INDUSTRY_OPTIONS = [
  'تولیدی',
  'بازرگانی',
  'خدماتی',
  'پخش و توزیع',
  'فروشگاهی',
  'پروژه‌ای و پیمانکاری',
  'سایر',
] as const;

export const ESTIMATOR_BRANCH_OPTIONS = ['یک مجموعه', '۲ تا ۵ شعبه', 'بیش از ۵ شعبه', 'چند شرکت'] as const;

export const ESTIMATOR_MGMT_OPTIONS = [
  'اکسل و ابزارهای جدا',
  'نرم‌افزار آماده',
  'سیستم قدیمی اختصاصی',
  'فرآیند دستی',
] as const;

export const ESTIMATOR_INTEGRATION_OPTIONS = [
  {
    id: 'data-migration',
    titleFa: 'انتقال داده‌های فعلی',
    subtitleFa: 'اکسل یا نرم‌افزار قبلی',
    implementationTomans: 8_000_000,
    availableInProduct: true,
  },
  {
    id: 'finance-bridge',
    titleFa: 'اتصال نرم‌افزار مالی',
    subtitleFa: 'هماهنگی با سیستم موجود',
    implementationTomans: 6_000_000,
    availableInProduct: true,
  },
  {
    id: 'voip',
    titleFa: 'VOIP و مرکز تماس',
    subtitleFa: 'تماس و ثبت خودکار پیگیری',
    implementationTomans: 7_000_000,
    availableInProduct: false,
  },
  {
    id: 'sms-notify',
    titleFa: 'پیامک و اعلان',
    subtitleFa: 'اطلاع‌رسانی رویدادها',
    implementationTomans: 4_000_000,
    availableInProduct: true,
  },
  {
    id: 'exec-dashboard',
    titleFa: 'داشبورد مدیریتی پیشرفته',
    subtitleFa: 'تحلیل و شاخص‌های اختصاصی',
    implementationTomans: 5_000_000,
    availableInProduct: true,
  },
] as const;

export type EstimatorDeployment = 'private_cloud' | 'on_prem';

/** مسیر انتخاب‌شده: اشتراک ابری سازمانی یا پروژه پیاده‌سازی اختصاصی */
export type EstimatorDeliveryMode = 'cloud_saas' | 'custom_implementation';

export const ESTIMATOR_DELIVERY_LABELS: Record<EstimatorDeliveryMode, string> = {
  cloud_saas: 'ERP ابری سازمانی',
  custom_implementation: 'پیاده‌سازی اختصاصی',
};

/** راه‌اندازی اولیه یک‌بار برای مسیر ابری (تومان) */
export const CLOUD_ONBOARDING_BASE_TOMANS = 8_000_000;
export const CLOUD_ONBOARDING_PER_MODULE_TOMANS = 1_500_000;

export const IMPLEMENTATION_ERP_BASE_TOMANS = 32_000_000;

export const COMPLEXITY_MULTIPLIER: Record<EstimatorComplexity, number> = {
  minimal: 0.88,
  standard: 1,
  advanced: 1.22,
};

/** اشتراک ابری پایه (تا ۱۰ کاربر) */
export const CLOUD_PLAN_BASE_MONTHLY_TOMANS = 12_000_000;
export const CLOUD_PLAN_INCLUDED_SEATS = 10;
export const CLOUD_PLAN_EXTRA_SEAT_TOMANS = 500_000;
export const CLOUD_PLAN_MAX_SEATS = 30;

export const ESTIMATOR_WIZARD_MODULES: EstimatorModuleDef[] = [
  {
    id: 'sales',
    erpCode: 'sales',
    nameFa: 'فروش',
    metaFa: 'CRM، سفارش و قرارداد',
    color: '#0EA5E9',
    implementationBaseTomans: 23_000_000,
    cloudMonthlyTomans: 4_000_000,
    includedFeatures: [
      'مدیریت لید',
      'قیف فروش',
      'پیگیری فروش',
      'پیش‌فاکتور',
      'سفارش فروش',
      'داشبورد فروش',
    ],
    addons: [
      {
        id: 'voip',
        titleFa: 'اتصال VOIP',
        descriptionFa: 'اتصال سیستم تلفنی سازمان به ERP برای ثبت تماس‌ها و تحلیل تماس تیم فروش.',
        implementationTomans: 5_000_000,
        availableInProduct: false,
      },
      {
        id: 'sms-panel',
        titleFa: 'پنل پیامک',
        descriptionFa: 'ارسال پیامک تکی یا گروهی با الگوهای آماده و ثبت وضعیت ارسال.',
        implementationTomans: 3_500_000,
        availableInProduct: true,
      },
      {
        id: 'sales-advanced-dashboard',
        titleFa: 'داشبورد فروش پیشرفته',
        descriptionFa: 'گزارش‌های تحلیلی فروش شامل ارزش قیف، نرخ تبدیل و عملکرد فروشندگان.',
        implementationTomans: 4_000_000,
        availableInProduct: true,
      },
      {
        id: 'sales-invoice-bridge',
        titleFa: 'اتصال فروش به فاکتور',
        descriptionFa: 'اتصال فرآیند فروش و مشتری به پیش‌فاکتور و فاکتور مالی.',
        implementationTomans: 2_500_000,
        availableInProduct: true,
      },
    ],
  },
  {
    id: 'inventory',
    erpCode: 'inventory',
    nameFa: 'تدارکات و لجستیک',
    metaFa: 'خرید، انبار و ارسال',
    color: '#F59E0B',
    implementationBaseTomans: 26_000_000,
    cloudMonthlyTomans: 3_500_000,
    includedFeatures: ['مدیریت انبار چندسطحی', 'فرآیند خرید', 'سفارش تأمین‌کننده', 'موجودی و کاردکس'],
    addons: [
      {
        id: 'wms-advanced',
        titleFa: 'WMS انبار پیشرفته',
        descriptionFa: 'مکان‌یابی کالا، چیدمان قفسه و جمع‌آوری سفارش در انبارهای بزرگ.',
        implementationTomans: 8_000_000,
        availableInProduct: true,
      },
      {
        id: 'barcode',
        titleFa: 'بارکد و RFID',
        descriptionFa: 'تعریف و چاپ بارکد و خواندن با اسکنر یا تگ RFID.',
        implementationTomans: 4_500_000,
        availableInProduct: true,
      },
      {
        id: 'multi-vendor-rfq',
        titleFa: 'استعلام قیمت چندتأمین‌کننده',
        descriptionFa: 'ارسال استعلام به چند تأمین‌کننده و مقایسه پیشنهادها.',
        implementationTomans: 3_000_000,
        availableInProduct: true,
      },
    ],
  },
  {
    id: 'finance',
    erpCode: 'finance',
    nameFa: 'حسابداری و مالی',
    metaFa: 'خزانه، چک و گزارش مالی',
    color: '#22C55E',
    implementationBaseTomans: 25_000_000,
    cloudMonthlyTomans: 3_000_000,
    includedFeatures: [
      'سند حسابداری',
      'دفاتر مالی',
      'تراز آزمایشی',
      'مدیریت بانک و چک',
      'گزارش‌های قانونی',
    ],
    addons: [
      {
        id: 'costing',
        titleFa: 'بسته بهای تمام‌شده و سودآوری',
        descriptionFa: 'محاسبه بهای تمام‌شده کالا و خدمات و تحلیل سودآوری محصولات و مراکز هزینه.',
        implementationTomans: 7_000_000,
        availableInProduct: true,
      },
      {
        id: 'moadian',
        titleFa: 'سامانه مودیان و مالیات',
        descriptionFa: 'تولید و ارسال صورتحساب الکترونیکی به سامانه مودیان.',
        implementationTomans: 5_500_000,
        availableInProduct: false,
      },
      {
        id: 'budget',
        titleFa: 'بودجه‌بندی و کنترل بودجه',
        descriptionFa: 'تعریف بودجه واحدها و مقایسه عملکرد واقعی با بودجه مصوب.',
        implementationTomans: 4_000_000,
        availableInProduct: true,
      },
    ],
  },
  {
    id: 'hr',
    erpCode: 'hr',
    nameFa: 'سرمایه انسانی',
    metaFa: 'پرسنل، تردد و درخواست‌ها',
    color: '#8B5CF6',
    implementationBaseTomans: 20_000_000,
    cloudMonthlyTomans: 2_500_000,
    includedFeatures: ['پرسنل', 'حضور و غیاب', 'حقوق و دستمزد پایه', 'مرخصی و مأموریت'],
    addons: [
      {
        id: 'hiring',
        titleFa: 'استخدام و آنبوردینگ',
        descriptionFa: 'ثبت درخواست استخدام و پیگیری مصاحبه و آنبوردینگ.',
        implementationTomans: 3_500_000,
        availableInProduct: false,
      },
      {
        id: 'performance',
        titleFa: 'ارزیابی عملکرد',
        descriptionFa: 'تعریف شاخص، ثبت بازخورد دوره‌ای و گزارش عملکرد.',
        implementationTomans: 3_000_000,
        availableInProduct: false,
      },
      {
        id: 'payroll-advanced',
        titleFa: 'حقوق و دستمزد پیشرفته',
        descriptionFa: 'محاسبه احکام و کسورات پیچیده، اضافه‌کار، پاداش و گزارش‌های قانونی.',
        implementationTomans: 6_000_000,
        availableInProduct: true,
      },
    ],
  },
  {
    id: 'distribution',
    erpCode: 'distribution',
    nameFa: 'پخش',
    metaFa: 'مسیر، ویزیتور و تسویه',
    color: '#F97316',
    implementationBaseTomans: 22_000_000,
    cloudMonthlyTomans: 2_500_000,
    includedFeatures: ['مسیریابی پخش', 'سفارش‌گیری موبایل', 'تسویه ویزیتورها'],
    addons: [
      {
        id: 'gps',
        titleFa: 'ردیابی GPS ویزیتور',
        descriptionFa: 'ثبت موقعیت ویزیتورها برای پیگیری مسیر و حضور در محل.',
        implementationTomans: 4_500_000,
        availableInProduct: false,
      },
      {
        id: 'dist-dashboard',
        titleFa: 'داشبورد پخش',
        descriptionFa: 'گزارش عملکرد ویزیتورها، مسیرها، فروش و وصول.',
        implementationTomans: 3_500_000,
        availableInProduct: true,
      },
    ],
  },
  {
    id: 'retail',
    erpCode: 'retail',
    nameFa: 'خرده‌فروشی',
    metaFa: 'فروشگاه، صندوق و وفاداری',
    color: '#EC4899',
    implementationBaseTomans: 21_000_000,
    cloudMonthlyTomans: 2_500_000,
    includedFeatures: ['POS پایه', 'مدیریت فروشگاه', 'باشگاه مشتریان پایه'],
    addons: [
      {
        id: 'pos-advanced',
        titleFa: 'POS و نقطه‌فروش پیشرفته',
        descriptionFa: 'فروش سریع، چند صندوق، تخفیف و اتصال به موجودی.',
        implementationTomans: 5_000_000,
        availableInProduct: true,
      },
      {
        id: 'loyalty-advanced',
        titleFa: 'باشگاه مشتریان پیشرفته',
        descriptionFa: 'امتیازدهی و برنامه‌های وفاداری برای مشتریان.',
        implementationTomans: 3_000_000,
        availableInProduct: true,
      },
      {
        id: 'retail-dashboard',
        titleFa: 'داشبورد خرده‌فروشی',
        descriptionFa: 'گزارش پرفروش‌ها، عملکرد صندوق‌ها و روند فروش.',
        implementationTomans: 3_500_000,
        availableInProduct: true,
      },
    ],
  },
  {
    id: 'manufacturing',
    erpCode: 'manufacturing',
    nameFa: 'مدیریت کارخانه',
    metaFa: 'BOM، تولید و کنترل کیفیت',
    color: '#84CC16',
    implementationBaseTomans: 28_000_000,
    cloudMonthlyTomans: 3_000_000,
    includedFeatures: ['BOM و فرمولاسیون', 'برنامه‌ریزی تولید', 'دستور کار', 'کنترل کیفیت پایه'],
    addons: [
      {
        id: 'mes',
        titleFa: 'MES سالن تولید',
        descriptionFa: 'ثبت کارکرد ماشین، توقفات و پیشرفت دستور کارها در خط تولید.',
        implementationTomans: 9_000_000,
        availableInProduct: true,
      },
      {
        id: 'cmms',
        titleFa: 'نگهداری و تعمیرات (CMMS)',
        descriptionFa: 'ثبت تجهیزات، نگهداری پیشگیرانه و سوابق تعمیرات.',
        implementationTomans: 5_000_000,
        availableInProduct: false,
      },
      {
        id: 'qc-advanced',
        titleFa: 'کنترل کیفیت پیشرفته',
        descriptionFa: 'طرح‌های بازرسی، ثبت نتایج مرحله‌ای و گزارش انطباق.',
        implementationTomans: 4_500_000,
        availableInProduct: true,
      },
    ],
  },
  {
    id: 'org-comms',
    erpCode: 'ai-messaging',
    nameFa: 'ارتباطات سازمانی',
    metaFa: 'وظیفه، فرم و گردش کار',
    color: '#14B8A6',
    implementationBaseTomans: 18_000_000,
    cloudMonthlyTomans: 1_500_000,
    includedFeatures: ['نامه‌نگاری داخلی', 'فرم‌های پایه', 'اعلان‌ها'],
    addons: [
      {
        id: 'form-workflow',
        titleFa: 'بسته فرم‌ساز و گردش کار',
        descriptionFa: 'ساخت فرم اختصاصی و تعریف گردش کار و تأیید چندمرحله‌ای.',
        implementationTomans: 6_000_000,
        availableInProduct: true,
      },
      {
        id: 'dms',
        titleFa: 'مدیریت اسناد (DMS)',
        descriptionFa: 'ثبت، طبقه‌بندی و بایگانی اسناد با کنترل نسخه و دسترسی.',
        implementationTomans: 5_000_000,
        availableInProduct: false,
      },
    ],
  },
];

export function defaultRecommendedModules(industry: string): EstimatorWizardModuleId[] {
  if (industry === 'تولیدی') return ['sales', 'inventory', 'finance'];
  if (industry === 'فروشگاهی') return ['retail', 'finance', 'inventory'];
  if (industry === 'پخش و توزیع') return ['distribution', 'sales', 'inventory'];
  return ['sales', 'finance', 'inventory'];
}

export function userCountMultiplier(userCount: number): number {
  if (userCount <= 10) return 1;
  if (userCount <= 20) return 1.08;
  if (userCount <= 35) return 1.15;
  if (userCount <= 50) return 1.22;
  if (userCount <= 80) return 1.28;
  return 1.35;
}

export const ALL_ESTIMATOR_WIZARD_MODULE_IDS = ESTIMATOR_WIZARD_MODULES.map((m) => m.id);
