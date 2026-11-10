# گزارش Wave 6 — بخش A+B (Alert Hub + Email Orchestration)

نسخه: `6.1.0-wave6-ab`

## معیار قبولی

| معیار | وضعیت |
|--------|--------|
| Alert Hub + Dedup + Real-time hub + Acknowledgment | ✅ |
| NotificationOrchestrator + Channel Selection + Idempotency + Rate limit | ✅ |
| ۳۰ قالب فارسی RTL (Vazirmatn) | ✅ |
| NotificationLog + correlation_id | ✅ |
| Workers: alert-evaluator + notification-orchestrator | ✅ |
| تست‌های اجباری + RTL static regression | ✅ |

## Schema (`alerts`)

`Alert`, `AlertRule`, `UserNotificationPreference`, `NotificationTemplate`, `NotificationLog`

```bash
pnpm --filter @repo/db-alerts db:generate
```

## Workers

```bash
pnpm --filter @repo/worker dev
```

صف‌ها: `alert-evaluator`, `notification-orchestrator` (BullMQ backoff 3x)

## UI

**Tenant (`apps/web`):** Bell + polling ۳۰s، `/alerts`، `/settings/notifications`  
**Super Admin (`apps/admin`):** `/notifications`، `/notification-templates` (Preview RTL)

## تست

```bash
pnpm test
```

- `packages/db-alerts/test/alert-dedup.spec.ts`
- `packages/db-alerts/test/notification-idempotency.spec.ts`
- `packages/db-alerts/test/realtime-alert.spec.ts`
- `apps/worker/test/email-render.spec.ts`
- `apps/web/test/alert-center-rtl.spec.ts`

## اسکرین‌شات

- `pnpm --filter @repo/web dev` → `/alerts`
- `pnpm --filter @repo/admin dev` → `/notification-templates`
