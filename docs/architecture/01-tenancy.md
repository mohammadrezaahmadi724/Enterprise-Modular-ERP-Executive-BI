# ایزولاسیون مستأجر

## TenantContext

```typescript
import { TenantContext } from '@repo/domain';

TenantContext.run(
  { tenantId, userId, correlationId, traceId, isSuperAdmin: false },
  () => handler(),
);
```

## RLS

در هر `$transaction`، `setTenantSession` متغیرهای `app.current_tenant_id` را با `SET LOCAL` تنظیم می‌کند.

## Pool Leak

تست `packages/testing/integration/pool-leak.spec.ts` پس از ۱۰۰۰ تراکنش، `current_setting` روی اتصال جدید را بررسی می‌کند.
