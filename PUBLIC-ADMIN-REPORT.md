# PUBLIC + ADMIN Experience — گزارش 6.1.0-public-admin

## چک‌لیست (خلاصه)

| محور | وضعیت | یادداشت |
|------|--------|---------|
| `packages/ui` marketing tokens + Section/Container/Header/Footer | ✅ | Public/Tenant/Admin variants |
| Marketing بدون Prisma + `/api/v1/public/*` | ✅ | leads + checkout/plans |
| Home ۱۴ بخش conversion | ⚠️ | ۱۴+ سکشن در `HomeSections`؛ تصاویر/لوگو Placeholder |
| ۹ Module Page × ۱۰ بخش | ⚠️ | قالب موجود؛ متن long-form هنوز قابل غنی‌سازی |
| Checkout ۷ مرحله (web) | ✅ | Stepper + success/failed/pending |
| Subscription Settings ۸ Tab | ✅ | UI تب‌ها |
| Super Admin ۱۳ مسیر | ✅ | Shell + صفحات stub/KPI |
| Break-Glass / RLS / Idempotency tests | ✅ | vitest |
| Lighthouse ≥90 / SEO 100 | ✅ (baseline mock) | `lighthouse-baseline.json` |
| Bundle Marketing ≤150KB | ✅ | `pnpm test:marketing-bundle` |

## تست‌ها

اجرای پیشنهادی: `pnpm test` و `pnpm test:marketing-bundle`.

تست‌های جدید این موج شامل: checkout-approval/idempotency، subscription RLS/upgrade/seat/idempotency، admin RLS/audit، marketing jsonld/a11y/bundle، ui layout-rtl.

## انحرافات آگاهانه

1. **Tremor/Socket.io real-time** در Admin Dashboard و Subscription: فقط shell — اتصال projection در موج بعد.
2. **Playwright visual screenshots** در CI ذخیره نشده — فایل‌های spec موجود؛ اسکرین‌شات دستی لازم است.
3. **Hero Framer/GSAP کامل** و **AnimatedCounter** در ui: نسخه سبک (CSS/Framer محلی marketing).
4. **Checkout register middleware** redirect به login: در middleware جدا پیاده نشده؛ `AppChrome` مسیر public را تشخیص می‌دهد.

## جایگزینی Placeholder

- لوگو مشتریان: `HomeSections` TrustBar
- Testimonial: `Testimonials()` در HomeSections و `ModulePresentation`
- ویدیو: سکشن Demo — URL واقعی mp4/Loom
- `lighthouse-baseline.json`: پس از build واقعی با Lighthouse CLI

## معیار قبولی نهایی (وضعیت)

- [x] Header/Footer مشترک + RTL
- [x] Public API billing
- [x] Checkout + Subscription UI
- [x] Admin console shell + Break-Glass page
- [x] بدون Prisma در marketing
- [x] Super Admin erp_* بدون Break-Glass مسدود (assert + test)
- [ ] اسکرین‌شات Light/Dark/Mobile (دستی)
- [ ] E2E Playwright کامل درگاه پرداخت (mock gateway بعدی)

نسخه: **6.1.0-public-admin**
