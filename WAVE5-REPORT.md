# گزارش Wave 5 — AI, Messengers, VoIP, Migration, Restore, E2E, Load

نسخه: `6.1.0-wave5`

## معیار قبولی

| معیار | وضعیت |
|--------|--------|
| AI + n8n + `usage_records` + idempotency | ✅ |
| Messengers (Telegram/Bale/SMS stub) + Surveys UI | ✅ |
| VoIP + STT stub + دقیقه usage | ✅ |
| Migration Engine + reconciliation dry-run | ✅ |
| Restore Drill + AES backup + Outbox رویداد | ✅ |
| E2E `full-flow.spec.ts` | ✅ |
| k6 thresholds (گزارش `tools/load-test/results/wave5-k6-summary.json`) | ✅ |
| Bundle gate (`pnpm test:bundle`) | ✅ |
| HMAC webhook tests | ✅ |

## API / Webhook

- `POST /api/v1/webhooks/n8n/v1` — `X-N8N-Signature` + `WEBHOOK_IP_WHITELIST`

## Prisma (`erp_operations`)

مدل‌ها: `AiConversation`, `AiMessage`, `UsageRecord` (@@unique tenant+idempotency), messaging, VoIP, surveys.

```bash
pnpm --filter @repo/db-erp-operations db:generate
```

## CLI

```bash
pnpm migrate
pnpm --filter @repo/migration-engine migrate -- --dry-run --source=csv --target=postgres
pnpm --filter @repo/restore-drill drill
```

## تست‌ها

```bash
pnpm test
pnpm test:bundle
```

فایل‌های اجباری:

1. `tools/migration-engine/test/reconciliation.spec.ts`
2. `tools/restore-drill/test/restore-verification.spec.ts`
3. `packages/testing/e2e/full-flow.spec.ts`
4. `apps/api/test/webhook-hmac.spec.ts`
5. `packages/db-erp-operations/test/wave5-usage.spec.ts`

## UI (مسیرها)

- `/ai/conversations`, `/ai/settings`
- `/messaging/inbox`, `/messaging/surveys`, `/messaging/channels`
- `/voip/dialer`, `/voip/calls`

## متغیرهای محیطی

`N8N_WEBHOOK_SECRET`, `WEBHOOK_IP_WHITELIST`, `KMS_MASTER_KEY`, `KMS_KEY_VERSION`, `BACKUP_DIR` — در `.env.example`.

## اسکرین‌شات‌ها

پس از `pnpm --filter @repo/web dev` صفحات فوق را در مرورگر باز کنید (AI Chat، VoIP Dialer، Migration dry-run خروجی CLI).

## k6

```bash
k6 run tools/load-test/k6/wave5-scenario.js
```

Thresholds: p95 &lt; 500ms، error rate &lt; 1%.
