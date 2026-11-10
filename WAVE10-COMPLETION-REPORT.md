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
pnpm db:push:all
pnpm db:generate:all
pnpm db:seed
pnpm db:seed:erp
pnpm db:seed:hr
```

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

## موج 11

- RLS policies واقعی PostgreSQL
- نقش‌ها از UI Admin
- Payslip finalize + GL payroll posting
- Session Prisma platform با `createPrismaClient` extension
