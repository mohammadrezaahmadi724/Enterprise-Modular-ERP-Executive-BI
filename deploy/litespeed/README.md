# LiteSpeed / Passenger — Wave 8

## API (NestJS)

1. `pnpm --filter @repo/api build`
2. Passenger `startup file`: `apps/api/dist/main.js`
3. Env: `DATABASE_URL`, `REDIS_URL`, `JWT_SECRET`, `NODE_ENV=production`

نمونه `passenger_wsgi` برای Node روی cPanel:

```nginx
PassengerAppRoot /home/user/erp/apps/api
PassengerStartupFile dist/main.js
PassengerNodejs /opt/alt/alt-nodejs20/root/bin/node
```

## Next.js (web / admin / marketing)

Standalone output:

```bash
pnpm --filter @repo/web build
# خروجی: apps/web/.next/standalone
```

LiteSpeed reverse proxy به پورت داخلی هر اپ (3001–3003) یا Passenger + `node server.js`.

## Redis (اجباری prod)

Worker و Outbox relay بدون Redis اجرا نمی‌شوند — `REDIS_URL=redis://127.0.0.1:6379`.
