# گزارش Wave 6 — بخش C (Marketing & Presentation)

نسخه: `6.1.0-wave6-c`

## معیار قبولی

| معیار | وضعیت |
|--------|--------|
| Home ۱۱ بخش | ✅ `HomeSections` |
| ۹ Module Page (۱۰ بخش) | ✅ `ModulePresentation` + `generateStaticParams` |
| SSG + ISR بلاگ | ✅ `revalidate=3600` |
| SEO + JSON-LD + sitemap + robots | ✅ |
| Lighthouse (baseline CI) | ✅ `test/lighthouse-baseline.json` |
| Bundle ≤ 150KB (home+layout source gzip) | ✅ `pnpm test:marketing-bundle` |
| RTL + Dark/Light + Framer ≤300ms | ✅ |
| بدون Prisma | ✅ فقط `fetch` به API |

## اجرا

```bash
pnpm install
pnpm --filter @repo/marketing dev    # :3003
pnpm test
pnpm test:marketing-bundle
```

## API عمومی

`POST /api/v1/public/leads` — `Idempotency-Key` + هشدار Sales (Alert Hub)

## Analytics

Plausible via `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` (Umami-compatible pattern — no GA)

## اسکرین‌شات

Hero تیره پیش‌فرض، `/modules/finance`, `/pricing` — Light/Dark از Nav
