# Enterprise Modular ERP & Executive BI (v6.1)

پلتفرم ابری **Multi-Tenant Modular ERP** با جداسازی **Platform Plane** (SaaS) و **Tenant ERP Plane** (عملیاتی).

## پیش‌نیازها

- Node.js ≥ 20
- pnpm 9
- PostgreSQL 16 (اختیاری برای dev بدون DB — تست pool-leak از شبیه‌ساز یا Testcontainers)
- Redis خارجی برای Production (Upstash یا سرور مجزا)

## اجرای سریع

```bash
pnpm install
pnpm db:generate   # Prisma client پلتفرم
pnpm dev           # API (3000) + سایر اپ‌ها طبق turbo
pnpm test
pnpm typecheck
pnpm lint
```

کپی `.env.example` به `.env` و تنظیم `DATABASE_URL` و در صورت نیاز `REDIS_URL`.

## نقشه راه Waveها

| Wave | محتوا |
|------|--------|
| **0** | Foundation: TenantContext, RLS, Outbox, Module SDK, Observability |
| 1 | Auth, Subscription, Platform Admin |
| 2 | Finance / GL |
| 3 | Operations (Sales, Inventory, …) |
| 4 | HR & Payroll |
| 5 | BI, Risk, Projections |
| 6 | Alerts, Marketing polish |

## ساختار Monorepo

طبق `.cursorrules` بخش ۲.۲ — `apps/*`, `packages/*`, `tools/*`.

مستندات معماری: [`docs/architecture/`](docs/architecture/).
