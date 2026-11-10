# WAVE 9 — Persistence، RBAC سراسری، CI، Prod Ops

## انجام‌شده

| حوزه | وضعیت |
|------|--------|
| **GL Prisma** | `journal.repository` + `FINANCE_PERSISTENCE` |
| **CRM Prisma** | `contact.repository` + `CRM_PERSISTENCE` |
| **RBAC سراسری** | `CompositeAuthGuard`, `CompositeTenantGuard`, `RbacGuard` + `@Public()` |
| **مجوزها** | `@RequirePermission` روی finance/crm/ops/platform |
| **Dev auth** | `x-super-admin` + `permissions: ['*']` + `x-tenant-id` |
| **SMTP** | `mail.service.ts` (nodemailer) |
| **Runtime prod** | `GET /api/v1/platform/ops/runtime` |
| **Backup** | `tools/backup/pg-backup.ps1` + مستندات |
| **CI** | `.github/workflows/quality.yml` (unit, typecheck, e2e) |
| **E2E visual** | `e2e/visual-dashboard.spec.ts` |
| **Seed ERP** | `pnpm db:seed:erp` |

## فعال‌سازی persistence

`.env`:

```env
FINANCE_PERSISTENCE=true
CRM_PERSISTENCE=true
```

```powershell
pnpm db:push:all
pnpm db:generate
pnpm db:seed
pnpm db:seed:erp
```

## تست

1. Journal با DB: Post سند → ردیف در `erp_finance.journal_entries`
2. CRM: `POST /api/v1/crm/contacts` → ردیف در `erp_operations.contacts`
3. RBAC: بدون `*` باید `403` برای endpointهای دارای `@RequirePermission`
4. `pnpm test:e2e:smoke` + visual spec
5. Ops: `/api/v1/platform/ops/runtime` با Super Admin

نسخه: **6.1.0-wave9-completion**

## موج 10

- JWT/RBAC از DB نقش‌ها (نه فقط dev *)
- RLS session روی همه Prisma clientها
- Playwright screenshot baseline در artifact CI
- HR/Payroll persistence
