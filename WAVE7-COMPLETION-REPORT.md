# WAVE 7 — تکمیل شکاف‌های معماری و UX عملیاتی

## انجام‌شده

| حوزه | وضعیت |
|------|--------|
| AuditInterceptor سراسری | ✅ `apps/api/src/interceptors/audit.interceptor.ts` |
| SuperAdminGuard + Platform Admin API | ✅ CRUD DB واقعی |
| Admin UI → API | ✅ `admin-api.ts` + AdminResourceCrud |
| ERP screens → `erp_screen_records` | ✅ ErpResourceController + ModuleWorkbench |
| Finance GL Post + Workflow | ✅ `POST /api/v1/finance/journal/post` |
| Google OAuth | ✅ start/callback (تبادل توکن در 7.1) |
| Worker Outbox relay | ✅ poll Prisma + BullMQ |
| BI KPI seed پایدار | ✅ بدون reset هر request |
| JalaliDateInput + SimpleDataTable | ✅ در `@repo/ui` |
| `db:push:all` | ✅ اسکریپت ریشه |
| Playwright smoke RTL | ✅ `e2e/smoke-rtl.spec.ts` |

## پیش‌نیاز اجرا

```powershell
pnpm db:push
pnpm db:seed
pnpm --filter @repo/api dev
pnpm --filter @repo/worker dev
```

Schema جدید: `erp_screen_records`, `support_tickets`, `platform_feature_flags`

## هنوز در موج بعدی (عمدی)

- Passport Google token exchange
- TanStack Table کامل (sort/filter/pagination)
- Calix/Jalali picker پیشرفته
- Lighthouse CI خودکار
- LiteSpeed/Passenger deploy manifests
- سرویس‌های domain کامل برای هر ماژول ERP (تولید/پخش/…) — schema موجود، API تخصصی موج 8

نسخه: **6.1.0-wave7-completion**
