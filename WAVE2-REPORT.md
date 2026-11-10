# گزارش Wave 2

## چک‌لیست

| بخش | وضعیت |
|-----|--------|
| Billing schema + Pricing Engine | ✅ |
| Payment gateway mock (Zarinpal) | ✅ |
| Contracts نسخه‌دار + Upcasters | ✅ |
| Sales + Inventory schema | ✅ |
| ConfirmSalesOrder Saga | ✅ |
| CQRS projections + workers | ✅ |
| Cache invalidation | ✅ |
| Frontend billing/sales stubs | ✅ |
| Bundle size gate script | ✅ |

## نتیجه تست‌ها (`pnpm test`)

```
Test Files  33 passed (33)
Tests       58 passed (58)
```

| # | تست | نتیجه |
|---|-----|--------|
| 1 | billing-idempotency | ✅ |
| 2 | multi-currency | ✅ |
| 3 | invoice-serial | ✅ |
| 4 | plan-versioning | ✅ |
| 5 | refund-exchange | ✅ |
| 6 | event-replay (1000) | ✅ |
| 7 | acid-boundary | ✅ (regression) |
| 8 | saga-compensation | ✅ (regression) |
| 9 | cache-invalidation | ✅ |
| 10 | bundle-size.ci.ts | `pnpm test:bundle` |
| 11 | contracts pact + upcasters | ✅ |

## Bundle

`pnpm test:bundle` — dashboard gzip ≤ 250KB.

## انحراف‌ها

- Addon/coupon/tax جداول کامل در schema به‌صورت فازبندی — هسته billing فعال است.
- Payment webhook IP whitelist در Wave 2.1.
- Finance AR posting فقط از طریق Event Bus (بدون cross-module transaction).

## اجرا

```bash
pnpm install
pnpm db:generate
pnpm test
pnpm test:bundle
pnpm typecheck
pnpm lint
```
