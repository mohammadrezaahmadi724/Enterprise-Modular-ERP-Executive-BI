# DESIGN-SYNC-REPORT — Unified Design System (Prompt 10)

## ۱.۱ عیب‌یابی اولیه

| # | مورد | web (3001) | admin (3002) | marketing (3003) |
|---|------|------------|--------------|------------------|
| 1 | `@repo/ui` در package.json | ✅ | ✅ | ✅ |
| 2 | tailwind preset مشترک | ❌→✅ | ❌→✅ | ❌→✅ |
| 3 | globals فقط import UI | ❌→✅ | ❌→✅ | ❌→✅ |
| 4 | layout: rtl + Vazirmatn + themes | ❌→✅ | ❌→✅ | ❌→✅ |
| 5 | `components/ui/*` محلی | ✅ ندارد | ✅ ندارد | ✅ ندارد |
| 6 | AppShell/Sidebar مشترک | ❌→✅ | ❌→✅ | N/A (Public) |
| 7 | بازنویسی همه صفحات Wave 1-6 | ⚠️ جزئی | ⚠️ جزئی | ✅ قبلاً |

## تغییرات اصلی

- `packages/ui`: `tailwind.config.ts`, globals با `@tailwind` + tokens، primitives (Card, Table, Input, Badge, ThemeToggle, Toaster)، layout (AppShell, Tenant/Admin sidebar+header)، `KPICard`, `PageHeader`, `EmptyState`.
- `apps/web`: `TenantShell`, layout با Google Font Vazirmatn، داشبورد نمونه با KPI.
- `apps/admin`: layout با AppShell، tailwind/postcss، داشبورد نمونه.
- `apps/marketing`: preset + globals هم‌راستا، فونت مشترک.

## انحراف آگاهانه

- **بازنویسی کامل ۴۰+ صفحه ERP** در یک موج انجام نشد — الگوی `PageHeader` + `Card` + `KPICard` روی dashboardها اعمال شد؛ سایر صفحات در موج بعدی.
- **DataTable TanStack کامل** و **Calix DatePicker** در ui اسکلت نشده — در spec بعدی.
- **Visual Regression Playwright** — تست `consistency.spec.ts` به‌جای اسکرین‌شات.

## تست

```bash
pnpm test   # شامل packages/ui/test/consistency.spec.ts
```

## معیار قبولی

- [x] preset + globals مشترک سه اپ
- [x] Shell سایدبار/هدر web + admin
- [x] Marketing هم‌سطح توکن/فونت
- [ ] همه صفحات Wave 1-6 بازنویسی (در صف)
- [ ] Visual + Lighthouse دستی

نسخه: **6.1.0-design-sync**
