# Production — Backup, SMTP, KMS (Wave 9)

## Backup

- اسکریپت: `tools/backup/pg-backup.ps1`
- زمان‌بندی: cron یا Windows Task Scheduler روزانه
- env: `BACKUP_LAST_RUN` پس از هر اجرای موفق
- تست بازیابی: `pnpm --filter @repo/restore-drill drill`

## SMTP

```env
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
SMTP_FROM=noreply@yourdomain.ir
SMTP_SECURE=false
```

API: `sendTransactionalEmail` در `apps/api/src/modules/platform/mail.service.ts`

وضعیت: `GET /api/v1/platform/ops/runtime` (Super Admin)

## KMS

```env
KMS_KEY_VERSION=v1
KMS_MASTER_KEY=<32+ byte secret for prod>
```

رمزنگاری عملیات: `@repo/db-erp-operations` — `kms-crypto.ts`

## Persistence ERP

```env
FINANCE_PERSISTENCE=true
CRM_PERSISTENCE=true
```

پس از `db:push:all`:

```powershell
pnpm db:seed
pnpm db:seed:erp
```
