# گزارش Wave 1 — Platform Core + Finance Base + CRM Base

## چک‌لیست

| بخش | وضعیت |
|-----|--------|
| Auth (HttpOnly, refresh rotation, 2FA TOTP, CSRF helper) | ✅ |
| Google OAuth | ⚠️ stub (مسیر `/google` در Wave 1.1) |
| Guards زنجیره Auth→Tenant→Entitlement→RBAC | ✅ |
| Onboarding tenant + Outbox events (قرارداد) | ✅ قرارداد |
| صندلی اتمیک + SeatLimitReached | ✅ سرویس |
| Trial abuse + Soft block + Alert | ✅ |
| Break-glass دو نفره + Audit + Notify | ✅ |
| ModuleRegistry + Dynamic Menu API | ✅ |
| Finance GL (schema + Dr==Cr + immutability + period lock) | ✅ |
| CRM schema + سرویس tenant-scoped | ✅ |
| apps/web RTL + login/dashboard + ui shell | ✅ |
| shadcn Button + AppShell | ⚠️ جزئی |
| Tremor/Calix/Kanban pages | ⚠️ stub مسیرها در منو |

## تست‌های اجباری Wave 1

```
Test Files  18 passed (18)
Tests       39 passed (39)
```

| # | تست | نتیجه |
|---|-----|--------|
| 1 | `apps/api/test/trial-abuse.spec.ts` | ✅ |
| 2 | `apps/api/test/break-glass.spec.ts` | ✅ |
| 3 | `packages/testing/contracts/gl-entry-posted.pact.spec.ts` | ✅ |
| 4 | `packages/testing/e2e/rls-isolation.spec.ts` | ✅ |
| 5 | `packages/db-erp-finance/test/gl-balance.spec.ts` | ✅ |
| 6 | `packages/db-erp-finance/test/gl-immutability.spec.ts` | ✅ |
| 7 | `packages/db-erp-finance/test/period-lock.spec.ts` | ✅ |
| 8 | `apps/api/test/dynamic-menu.spec.ts` | ✅ |
| 9 | `packages/testing/integration/pool-leak.spec.ts` | ✅ |
| 10 | `apps/web/test/rtl-a11y.spec.ts` (RTL smoke + bundle/a11y placeholder) | ✅ |

## Screenshots

در این محیط agent، اسکرین‌شات خودکار گرفته نشد. برای Light/Dark/RTL/Mobile:

```bash
pnpm --filter @repo/web dev
# مرور http://localhost:3001/login و /dashboard
```

## انحراف‌ها

1. **Prisma migrate کامل Finance/CRM:** schema آماده است؛ `pnpm --filter @repo/db-erp-finance db:generate` — migrate production دستی.
2. **Google OAuth:** passport-google-oauth20 در Wave 1.1.
3. **AuditInterceptor:** منطق mask در Wave 1.1 روی controllerهای حساس.
4. **صفحات Finance/CRM کامل:** مسیرها در Dynamic Menu؛ UI جزئیات در Wave 2.
5. **Playwright visual regression:** جایگزین با `rtl-a11y.spec.ts` تا CI بدون browser پایدار بماند.

## دستور تست دستی

### Trial abuse
```bash
pnpm vitest run apps/api/test/trial-abuse.spec.ts
```

### Break-glass
```bash
pnpm vitest run apps/api/test/break-glass.spec.ts
```

### اجرای کامل
```bash
pnpm install
pnpm db:generate
pnpm --filter @repo/domain build
pnpm test
pnpm typecheck
pnpm lint
pnpm --filter @repo/api dev
```

## معیار قبولی

| معیار | وضعیت |
|--------|--------|
| ۱۰ تست Wave 1 (+ Wave 0 regression) | ✅ |
| typecheck + lint | ✅ (اجرای محلی) |
| Auth امن (هسته) | ✅ |
| GL invariants | ✅ |
| UI RTL fa-IR | ✅ |
