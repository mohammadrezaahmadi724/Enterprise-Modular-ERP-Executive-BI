# گزارش Wave 0 — Foundation First

تاریخ: ۱۴۰۴/۰۸/۱۸

## چک‌لیست پیاده‌سازی

| بخش | وضعیت |
|-----|--------|
| ساختار Monorepo (pnpm + turbo) | ✅ |
| `packages/domain` (TenantContext, VO, Aggregate, Errors) | ✅ |
| `packages/db-core-adapter` (Pool, RLS, Prisma ext, Outbox writer) | ✅ |
| `packages/db-platform` (Schema platform + outbox + RLS SQL) | ✅ |
| `packages/module-sdk` (Registry, Guard, Lifecycle, Saga, Ordering) | ✅ |
| `apps/api` (NestJS, Middleware, Idempotency, Health, Metrics) | ✅ |
| `apps/worker` (Base worker, Outbox relay skeleton) | ✅ |
| `packages/observability` | ✅ |
| `packages/testing` (Factories, Testcontainers setup) | ✅ |
| `packages/ui` (توکن‌های CSS — کامپوننت shadcn در Wave 2) | ⚠️ جزئی |
| `apps/web`, `admin`, `marketing` | ⚠️ اسکلت package.json |
| `packages/db-erp-*` | ✅ فقط placeholder (بدون ماژول تجاری) |
| `/docs/architecture/*` (۶ فایل) | ✅ |
| README, `.env.example`, husky/commitlint | ✅ |
| ماژول ERP تجاری (Finance, Sales, …) | ✅ ساخته نشده |

## نتیجه تست‌ها (`pnpm test`)

```
Test Files  9 passed (9)
Tests       18 passed (18)
```

| # | تست | نتیجه |
|---|-----|--------|
| 1 | `packages/domain/test/tenant-context.spec.ts` | ✅ |
| 2 | `packages/testing/integration/pool-leak.spec.ts` | ✅ |
| 3 | `packages/module-sdk/test/topological-sort.spec.ts` | ✅ |
| 4 | `packages/module-sdk/test/upgrade-rollback.spec.ts` | ✅ |
| 5 | `packages/module-sdk/test/entitlement-cache.spec.ts` | ✅ |
| 6 | `apps/api/test/idempotency-upload.spec.ts` | ✅ |
| 7 | `packages/observability/test/trace-propagation.spec.ts` | ✅ |
| 8 | `packages/testing/e2e/saga-compensation.spec.ts` | ✅ |
| 9 | `packages/testing/e2e/acid-boundary.spec.ts` | ✅ |

## معیار قبولی

| معیار | وضعیت |
|--------|--------|
| ۹ تست اجباری | ✅ |
| `pnpm typecheck` | ✅ |
| `pnpm lint` | ✅ |
| `GET /health` → `{ "status": "ok" }` | ✅ (بدون DATABASE_URL: `checks.db=skipped`) |
| بدون ماژول ERP تجاری | ✅ |

## انحراف‌ها و توضیح

1. **`pool-leak`:** اگر Docker (Testcontainers) یا PostgreSQL در دسترس نباشد، همان سناریو با شبیه‌ساز `SET LOCAL` اجرا می‌شود؛ با DB واقعی مسیر Testcontainers فعال است.
2. **`csurf`:** در NestJS 10 / Express 4 به‌صورت پیش‌فرض حذف شد؛ جایگزین Wave 1: Double Submit Cookie + SameSite.
3. **`OutboxRelayWorker`:** اسکلت BullMQ آماده است؛ polling `FOR UPDATE SKIP LOCKED` پس از `db:migrate` کامل در Wave 1.
4. **`packages/ui`:** توکن‌های تم و RTL در CSS؛ نصب کامل shadcn/Tremor/Jalali در Wave 2 (طبق محدودیت «بدون ERP/UI سنگین» در Wave 0).
5. **Next.js apps:** فقط workspace و اسکریپت dev — صفحات App Router در Wave 1.
6. **Husky:** `prepare` اجرا می‌شود؛ بدون `git init` پیام `.git can't be found` بی‌ضرر است.
7. **Prisma migrate:** `schema.prisma` کامل است؛ `migration.sql` اولیه schemaها را می‌سازد — برای محیط prod دستور `pnpm --filter @repo/db-platform db:migrate` و اعمال دستی `rls.sql` لازم است.

## دستور اجرا

```bash
pnpm install
pnpm db:generate
# اختیاری: DATABASE_URL=... pnpm db:migrate
pnpm --filter @repo/api dev   # پورت 3000
pnpm test
pnpm typecheck
pnpm lint
```

## پیش‌نیاز محیط

- Node ≥ 20, pnpm 9
- PostgreSQL 16 (برای API/RLS کامل)
- Redis خارجی برای Production (`REDIS_URL` — Upstash توصیه می‌شود)
- Docker (اختیاری، برای Testcontainers در integration)

---

*تولید شده در پایان پیاده‌سازی Wave 0 — v6.1*
