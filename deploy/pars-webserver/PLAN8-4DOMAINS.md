# استقرار ERP v6.1 روی Pars Web Server — پلن هشتم (۴ دامنهٔ اضافه)

این سند نگاشت **یک سیستم یکپارچه** به **۴ اپ Node/دامنه** روی هاست اشتراکی Node.js (LiteSpeed/cPanel + SSH + PostgreSQL/Redis) است.

## ۱. نگاشت پیشنهادی ۴ دامنه

| دامنه | اپ در monorepo | نقش | پورت داخلی (dev) |
|--------|----------------|-----|-------------------|
| `api.yourdomain.ir` | `apps/api` | NestJS + Passenger | 3000 |
| `app.yourdomain.ir` | `apps/web` | پنل مستاجر (Next standalone) | 3001 |
| `admin.yourdomain.ir` | `apps/admin` | Super Admin | 3002 |
| `www.yourdomain.ir` | `apps/marketing` | لندینگ / چک‌اوت مارکتینگ | 3003 |

- **PostgreSQL** روی همان هاست (پلن هشتم) — یک دیتابیس مثلاً `erp_platform`، schemaهای `platform`, `erp_operations`, …
- **Redis** اگر روی هاست فعال است همان `127.0.0.1:6379`؛ وگرنه Upstash یا Redis خارجی در `.env` production
- **Worker** (`apps/worker`): روی هاست اشتراکی معمولاً **Cron** هر ۱–۵ دقیقه یا یک Node app پنجم روی همان سرور (اگر cPanel اجازه دهد) — Outbox/BullMQ بدون Redis در prod پشتیبانی نمی‌شود

دامنهٔ «اصلی» cPanel می‌تواند یکی از همین چهار تا باشد؛ «۴ دامنه اضافه» یعنی **۵ hostname** در مجموع (۱ اصلی + ۴ addon).

## ۲. یک `.env` production (روی سرور)

فقط **یک فایل** در ریشهٔ deploy (مثلاً `/home/user/erp/.env`) که همهٔ اپ‌ها از آن کپی/لینک می‌خوانند:

```env
NODE_ENV=production
DATABASE_URL=postgresql://USER:PASS@localhost:5432/erp_platform?schema=platform
REDIS_URL=redis://127.0.0.1:6379
JWT_SECRET=<random-long>
PG_POOL_MAX=8

PORT=3000
WEB_APP_URL=https://app.yourdomain.ir
NEXT_PUBLIC_API_URL=https://api.yourdomain.ir
NEXT_PUBLIC_MARKETING_URL=https://www.yourdomain.ir

PROJECTS_PERSISTENCE=true
AUTH_DB_ENABLED=true
AUTH_PERMISSIONS_DB=true
RLS_ENABLED=true

# آپلود برندینگ — local روی NVMe 30GB یا S3/MinIO خارجی
OBJECT_STORAGE_ROOT=/home/user/erp/.data/tenant-objects
# یا OBJECT_STORAGE_ENDPOINT=...
```

هر اپ Next در build باید `NEXT_PUBLIC_API_URL` را **همان زمان build** داشته باشد (rebuild بعد از تغییر دامنه).

## ۳. مراحل deploy (SSH)

```bash
cd /home/user
git clone <repo> erp   # یا rsync از ویندوز
cd erp
pnpm install --frozen-lockfile

# Prisma روی لینوکس سرور (نه ویندوز dev)
pnpm db:generate:all
pnpm db:push:all
pnpm db:seed
pnpm db:seed:erp
pnpm db:seed:hr

pnpm --filter @repo/api build
pnpm --filter @repo/web build
pnpm --filter @repo/admin build
pnpm --filter @repo/marketing build
```

جزئیات Passenger برای API: [`deploy/litespeed/README.md`](../litespeed/README.md).

## ۴. cPanel — چهار «Node.js Application»

برای **هر دامنه** یک Application جدا:

| Application root | Startup file |
|----------------|--------------|
| `.../erp/apps/api` | `dist/main.js` (بعد از build) |
| `.../erp/apps/web/.next/standalone` | `server.js` |
| `.../erp/apps/admin/.next/standalone` | `server.js` |
| `.../erp/apps/marketing/.next/standalone` | `server.js` |

متغیر محیطی: از cPanel برای هر اپ `NODE_ENV=production` و در صورت نیاز `PORT`؛ ترجیحاً **همان DATABASE_URL** برای API و Worker.

برای Next standalone بعد از build:

```bash
# داخل apps/web — کپی static و public طبق مستند Next
cp -r .next/static .next/standalone/apps/web/.next/static
cp -r public .next/standalone/apps/web/public
```

(مسیر دقیق به ساختار `outputFileTracing` بستگی دارد — بعد از اولین build روی سرور چک کنید.)

## ۵. منابع پلن هشتم (۶GB RAM / 12GHz / 30GB)

توزیع تقریبی حافظه:

- **API**: 1.5–2.5 GB (Nest + Prisma pool کوچک)
- **Web**: 1.5–2 GB (Next SSR)
- **Admin + Marketing**: ~۰.۵ GB هر کدام
- **PostgreSQL + Redis**: سهم سیستم هاست
- **Worker/Cron**: اگر با pm2/cron اجرا می‌کنید ~۰.۳–۰.۵ GB

اگر فشار RAM دیدید: Marketing را روی **آنلاین استاتیک** (ISR + کمتر SSR) یا فقط build استاتیک خارج از هاست ببرید و یک دامنه را آزاد کنید.

## ۶. Worker بدون دامنهٔ جدا

```cron
*/2 * * * * cd /home/user/erp && /opt/alt/alt-nodejs20/root/bin/node apps/worker/dist/main.js >> /home/user/erp/logs/worker.log 2>&1
```

یا endpoint داخلی Cron با `CRON_SECRET_TOKEN` (اگر در API تعریف شده باشد).

## ۷. چه چیزهایی روی ۴ دامنه جا **نمی‌شوند**

- **Multi-tenant با دامنهٔ اختصاصی هر مشتری** (مثلاً ده SaaS customer هر کدام subdomain جدا): با ۴ اسلات هاست فقط **۴ hostname ثابت** برای **یک** tenant production یا staging/dev/demo دارید؛ مشتریان SaaS روی **همان** `app.yourdomain.ir` با `tenant_id`/login هستند، نه دامنهٔ جدا per customer (مگر CDN/Enterprise جدا).
- **MinIO داخلی** معمولاً روی shared host نیست — `OBJECT_STORAGE_ROOT` یا S3 خارجی.

## ۸. چک‌لیست بعد از بالا آمدن

1. `https://api.../health` → 200
2. Login DB کاربر seed (`cfo@demo.ir` فقط در staging حذف کنید)
3. `GET /api/v1/projects/master-data/overview` با هدر tenant
4. Redis متصل — worker لاگ خطای BullMQ ندهد
5. SSL رایگان پلن روی هر ۴ دامنه

## ۹. توسعهٔ بعدی در repo

- اسکریپت `tools/deploy/pack-standalone.sh` برای کپی static خودکار
- `binaryTargets` در Prisma برای build ویندوز → deploy لینوکس

نسخه: **6.1.0** — مرجع پلن: [Pars Node.js Hosting](https://parswebserver.com/web-hosting/nodejs/)
