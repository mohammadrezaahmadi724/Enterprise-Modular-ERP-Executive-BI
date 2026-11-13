# WAVE 10 — RBAC از DB، RLS، HR Persistence، Visual CI

## انجام‌شده

| حوزه | وضعیت |
|------|--------|
| **RBAC DB** | نقش‌های `CFO` / `HR_MANAGER` + کاربر `cfo@demo.ir` در seed |
| **Login DB** | `AUTH_DB_ENABLED` + `authenticateDbUser` |
| **Permissions live** | `AUTH_PERMISSIONS_DB` + hydrate JWT + dev `x-user-id` |
| **RLS transactions** | `withRlsTransaction` روی finance/ops/hr writes |
| **HR API** | `/api/v1/hr/employees|payslips` + `HR_PERSISTENCE` |
| **منوی HR** | ماژول `hr-base` |
| **Playwright baseline** | `toHaveScreenshot` + artifact در CI |
| **CI** | job `e2e-visual` در `quality.yml` |

## env (پیشنهادی dev/prod)

```env
AUTH_DB_ENABLED=true
AUTH_PERMISSIONS_DB=true
RLS_ENABLED=true
HR_PERSISTENCE=true
```

## دستورات

```powershell
# حتماً از ریشه monorepo — .env را خودکار می‌خواند
pnpm db:generate:platform   # یا db:generate:all (سرور dev را ببندید تا EPERM نشود)
pnpm db:push:all
pnpm db:seed
pnpm db:seed:erp
pnpm db:seed:hr
```

اگر `PrismaClient does not provide an export` دیدید: `pnpm db:generate:platform` بعد از بستن `api`/`web`.

ورود نمونه: **cfo@demo.ir** / **Demo1234!**

به‌روزرسانی baseline تصویر:

```powershell
pnpm test:e2e:visual:update
```

## تست

1. Login DB → JWT با `finance.write` (بدون `*` کور)
2. `GET /api/v1/hr/employees` با entitlement `hr-base`
3. `pnpm test:e2e:visual` (baseline در `e2e/__screenshots__`)

نسخه: **6.1.0-wave10-completion**

## موج 11 (شروع — ماژول پروژه‌ها)

| مورد | وضعیت |
|------|--------|
| Prisma `erp_projects` / tasks / members | ✅ |
| تیم پروژه در context UI | ✅ |
| Playwright `test:e2e:projects` (API+Web) | ✅ CI job `e2e-projects` |
| Vitest `projects-prisma.spec.ts` | ✅ با `DATABASE_URL` |

```powershell
pnpm exec playwright install chromium
pnpm test:e2e:projects:prepare
pnpm test:e2e:projects
```

`pnpm db:seed` از `.env` ریشه بارگذاری می‌کند (`tools/e2e/load-root-env.ts`).

## موج 11 — اطلاعات پایه (Master Data)

| مورد | وضعیت |
|------|--------|
| API aggregation + entitlement | ✅ |
| Prisma `erp_master_records` / branding | ✅ با `PROJECTS_PERSISTENCE` |
| آپلود برندینگ + audit + outbox | ✅ local یا S3/MinIO |
| سایدبار + MasterDataNav فیلتر entitlement | ✅ |
| آرشیو UI → API | ✅ |
| Vitest `master-data-prisma` / `object-storage-local` | ✅ |
| Playwright `master-data-hub.spec.ts` | ✅ در `test:e2e:projects` |

```env
PROJECTS_PERSISTENCE=true
# اختیاری: MinIO
OBJECT_STORAGE_ENDPOINT=http://127.0.0.1:9000
OBJECT_STORAGE_BUCKET=erp-tenant-assets
```

## مارکتینگ — برآوردگر پروژه (`/pricing/estimate`)

| مورد | وضعیت |
|------|--------|
| ویزارد ۸ ماژول + تکمیلی‌ها (پرچم به‌زودی) | ✅ |
| ضریب کاربران + اشتراک ابری ماهانه | ✅ `packages/contracts` |
| OTP عمومی + ثبت لید (`estimate_lead`) | ✅ در dev کد `devCode` |
| نتیجه: roadmap، scope، تفکیک هزینه | ✅ |
| API `POST .../pricing/estimate` با `{ wizard }` | ✅ |
| تعرفه ابری از پلن/`cloud_subscription_v1` + `GET cloud-subscription` | ✅ |
| OTP با `ESTIMATE_OTP_SMS_PROVIDER=http` یا dev `devCode` | ✅ |
| لینک checkout/register tenant از برآورد | ✅ `NEXT_PUBLIC_WEB_URL` |
| ادمین `/cloud-pricing` + API `PUT platform/pricing/cloud-subscription` | ✅ |
| SMS کاوه‌نگار `ESTIMATE_OTP_SMS_PROVIDER=kavenegar` | ✅ |
| ادمین `/tickets` — لیست واقعی `estimate_lead` + `meeting_request` | ✅ |
| تفکیک مسیر **ابر سازمانی** vs **پیاده‌سازی اختصاصی** + انتخاب همه ماژول + تفکیک کاربر/ماژول | ✅ `pricing-v4` |
| چک‌اوت tenant با prefill از برآورد (`seats`, `modules`, `estimateId`) + تعرفه API | ✅ |
| تنظیمات اشتراک — تب ماژول‌ها با تعرفه عمومی + لینک چک‌اوت | ✅ |
| تست قراردادی estimate → checkout (`estimate-checkout-link.spec`) | ✅ |
| هم‌ترازی sakhtar.net: `?step=1|6|7|12`، chrome تمام‌صفحه، سایدبار خلاصه | ✅ |
| پنل tenant ابری: ریل آیکون + هدر + داشبورد/اشتراک شبیه cloud.sakhtar.net | ✅ |
| فاز ۲ tenant: flyout زیرمنو از `TENANT_MODULES` کنار ریل | ✅ |
| `GET api/v1/tenant/billing/subscription` + `invoices` (tenant-scoped) | ✅ |
| داشبورد KPI از `/api/bi/kpis` (read models) | ✅ |
| تب تاریخچه پرداخت اشتراک از API billing | ✅ |
| OTP برآورد: Redis + rate limit (send/verify) با fallback حافظه | ✅ |
| Seed `platform_settings.cloud_subscription_v1` | ✅ |
| Playwright `e2e/estimate-checkout.spec.ts` (OTP → checkout prefill) | ✅ |
| رفع باگ `otp/verify` (متغیر `phone`) | ✅ |
| Seed فاکتور demo tenant (`CLD-1403-01001/2`) | ✅ |
| Playwright ویزارد مارکتینگ (`test:e2e:marketing`) | ✅ |
| پنل Super Admin: `PlatformCloudShell` + ریل آیکون (مثل tenant) | ✅ |
| `GET platform/admin/users` + صفحه `/users` | ✅ |
| Tenant `/settings/users` + `GET tenant/users` | ✅ |
| داشبورد admin از `ops/monitor` + شمارش کاربر/تیکت | ✅ |
| QC API · گردش‌کار شل + inbox · ریل تولید/پخش/خرده/BI | ✅ |
| `.cursorrules` v6.1 گسترده (Planes · Sakhtar · persistence · Wave 11) | ✅ |
| کارتابل `/workflows/my-tasks` از API inbox + seed demo WF | ✅ |
| URL `/inventory` → WMS + UI انبار‌یار و KPI قهوه‌ای | ✅ |

```powershell
pnpm exec vitest run packages/contracts/test/compute-wizard-estimate.spec.ts
```

```env
CLOUD_PLAN_CODE=professional
ESTIMATE_OTP_SMS_PROVIDER=none
NEXT_PUBLIC_WEB_URL=http://127.0.0.1:3001
```

```powershell
pnpm exec vitest run apps/api/test/estimate-otp.spec.ts
pnpm run test:e2e:estimate
# قبل از E2E (۳ ترمینال):
# pnpm --filter @repo/api dev
# pnpm --filter @repo/web dev
# pnpm --filter @repo/marketing dev
pnpm run test:e2e:marketing
```

بدون سرویس‌ها تست‌ها **skip** می‌شوند (نه fail) — `e2e/global-setup.ts` وضعیت stack را چک می‌کند.

## موج 11 — انجام‌شده (۱۴۰۴/۰۸/۲۱)

| مورد | خروجی |
|------|--------|
| RLS reads/writes | `withRlsRead` روی HR/Finance/QC lists؛ `erp-tenant-rls.sql` برای `erp_hr`/`erp_finance`/`erp_operations` |
| Admin نقش‌ها | `GET/PATCH /api/platform/admin/roles` + `/admin/roles` |
| Payslip finalize | `POST /api/v1/hr/payslips/:id/finalize` + bridge `hr-payroll-gl` (۵۱۰۱/۲۱۰۱) |
| Platform Prisma guard | `PLATFORM_PRISMA_CONTEXT_GUARD` در `apps/api/src/prisma/platform-db.ts` |
| QC Postgres seed | `ensureQcDemoPrismaSeed` (BOM + WO + بازرسی) |

**اعمال RLS در DB (دستی):** `psql $DATABASE_URL -f packages/db-core-adapter/sql/erp-tenant-rls.sql`

## موج 12 — Tenant/Platform RBAC

| مورد | خروجی |
|------|--------|
| Contracts RBAC | `@repo/contracts` — catalog، matrix، `tenant.users.*` |
| API Tenant Admin | users invite/patch/deactivate/**activate** + roles CRUD + rbac catalog |
| UI | `TenantAdminHub` — جستجو/فیلتر وضعیت و نقش، تراکم جدول، نقش درجا، فعال/غیرفعال، مودال دعوت‌نامه |
| UI مودال‌ها | دعوت همکار (ماتریس مجوز) + ویرایش نقش‌ها + **نقش جدید** (`createTenantRole`) |
| مسیر | `/admin/users`؛ `/settings/users` → redirect |
| Catalog fallback | `PERMISSION_CATALOG` از contracts اگر API catalog خالی/خطا |
| Platform | `/admin/permissions` + seed catalog + plan roleTemplates |
| فاز C | فیلتر ریل از JWT + RLS roles + vitest isolation |

**مهاجرت DB:** `pnpm --filter @repo/db-platform db:migrate` + `db:seed`

## اصلاح ساختار (پس از مرور invariant)

| مورد | تغییر |
|------|--------|
| Outbox | بدون `tenantId` در پروداکشن خطا می‌دهد؛ bridgeها خطا را فقط وقتی `VITEST` یا `OUTBOX_BEST_EFFORT` است می‌بلعند |
| Idempotency | نوشتن در `platform.idempotency_keys` با fallback حافظه اگر DB نباشد |
| Period lock | `create/post` ژورنال Prisma اگر دوره `Closed`/`Locked` باشد `PeriodLockedError` |
| RLS عملیات | خواندن/نوشتن CRM، پروژه، master data و لات از `operationsSession` (با `RLS_ENABLED`) |
| Break-Glass | علاوه بر حافظه، `audit_logs` و `sensitive_access_logs` |
| دعوت کاربر | رویداد `platform.tenant_user.invited.v1` |
| مرز ماژول | `wms-gl` و `sales-gl` به `apps/api/src/bridges` |
| UI | کامپوننت‌های `motion*` به PascalCase؛ variantهای `secondary`/`destructive`/`link` |

## تکمیل موارد باز

| مورد | تغییر |
|------|--------|
| Checkout | صفحات و stepper در `apps/marketing/app/checkout`؛ `apps/web` با redirect به `NEXT_PUBLIC_MARKETING_URL` |
| CQRS-lite | `apps/api/src/application` — journal handlers، tenant-user commands، sales queries. کنترلر مالی و کاربران دیگر Prisma را مستقیم صدا نمی‌زنند |
| منبع سفارش فروش | با `CRM_PERSISTENCE` لیست و دریافت سفارش فقط از Prisma است |
| کش انبار و پروژه | هر درخواست دوباره از Prisma بارگذاری می‌شود؛ نوشتن سند قبل از پاسخ await می‌شود |
| Handler خرید/انبار/پروژه | جهش‌ها از `apps/api/src/application/{wms,procurement,projects}` |
| خواندن سند انبار | overview، رزرو، رسید، حواله، انتقال و get سند اول `ensureWmsHydrated` |
| مانده و حرکت انبار | `syncSaga` و `recordStockMovement` قبل از پاسخ await می‌شوند (`flushDurableWrites`) |
| Handler فروش/CRM/نقش/اطلاعات پایه | جهش‌ها از `application/{sales,crm,tenant-roles,master-data}` |
| منوی مستاجر | از ماژول‌های Active در DB؛ شناسه از کانتکست؛ فعال‌سازی ماژول فقط Super Admin |
| BI و workflow | شناسه مستاجر از کانتکست؛ seed متریک به‌ازای هر مستاجر؛ GET ریسک دیگر ارزیابی نمی‌نویسد |
| Handler بقیهٔ ماژول‌ها | HR، QC، خزانه، عملیات، BI، workflow، مطالبات، billing، RBAC، و ادمین پلتفرم از `application/` |

## موج 11+ (بعدی)

- Vitest یکپارچه RLS با Testcontainers
- Idempotency روی `payslips/:id/finalize`
- Projection worker برای inbox workflow پس از outbox
