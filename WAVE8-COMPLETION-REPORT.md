# WAVE 8 — دامنه ERP، UI سراسری، Worker، OAuth، Ops

## انجام‌شده

| حوزه | وضعیت |
|------|--------|
| **مالی E2E** | `GET/POST journal` + Post با workflow + `domain_events_outbox` |
| **CRM API** | `GET/POST /api/v1/crm/contacts` + entitlement |
| **عملیات** | Sales confirm، inventory، distribution، manufacturing |
| **Module entitlement DB** | seed `tenant_modules` + query Prisma در `menu.service` |
| **Google OAuth** | token exchange + redirect به web با cookie |
| **Worker** | consumer صف `domain-events` → projection + KPI + risk |
| **TanStack Table** | `ErpDataTable` در Admin + Tenant workbench |
| **Jalali DatePicker** | `JalaliDatePicker` (Calix-lite) + فیلد `date` |
| **صفحه اسناد** | `/finance/journal-entries` متصل به API |
| **Playwright deps** | `@playwright/test` در ریشه |
| **Lighthouse CI** | `tools/lighthouse/lighthouserc.json` |
| **Deploy** | `deploy/litespeed/README.md` |

## پیش‌نیاز

```powershell
pnpm install
pnpm db:push:all
pnpm db:seed
# Redis برای worker
pnpm --filter @repo/worker dev
pnpm --filter @repo/api dev
```

متغیرهای جدید `.env`:

- `GOOGLE_CLIENT_SECRET`
- `WEB_APP_URL=http://127.0.0.1:3001`

## تست سریع

1. http://127.0.0.1:3001/finance/journal-entries — پیش‌نویس و Post
2. Worker log: `Domain event processed` بعد از Post
3. http://127.0.0.1:3000/api/v1/auth/google — authorize URL
4. `pnpm test:e2e:smoke` (با dev servers)
5. `pnpm lighthouse:ci` (پس از build و start اپ‌ها)

نسخه: **6.1.0-wave8-completion**

## موج 9 (پیشنهادی)

- Prisma persistence برای GL/CRM به‌جای in-memory
- RBAC سراسری روی همه controllerها
- Visual regression Playwright + Lighthouse در CI
- KMS/SMTP/Backup عملیاتی prod
