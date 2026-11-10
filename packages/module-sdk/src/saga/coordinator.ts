import { TenantContext } from '@repo/domain';

export interface SagaContext {
  tenantId: string;
  correlationId: string;
  causationId: string;
  traceId: string;
  data: Record<string, unknown>;
}

export interface SagaStep {
  name: string;
  execute: (ctx: SagaContext) => Promise<void>;
  compensate: (ctx: SagaContext) => Promise<void>;
}

const SAGA_TIMEOUT_MS = 30_000;
const MAX_RETRIES = 3;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function withRetry(step: SagaStep, ctx: SagaContext): Promise<void> {
  let lastError: unknown;
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      await Promise.race([
        step.execute(ctx),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error(`Saga step timeout: ${step.name}`)), SAGA_TIMEOUT_MS),
        ),
      ]);
      return;
    } catch (err) {
      lastError = err;
      await sleep(2 ** attempt * 100);
    }
  }
  throw lastError;
}

/** هماهنگ‌کننده Saga با جبران معکوس */
export async function runSaga(steps: SagaStep[], data: Record<string, unknown> = {}): Promise<void> {
  const tenantCtx = TenantContext.get();
  const ctx: SagaContext = {
    tenantId: tenantCtx.tenantId,
    correlationId: tenantCtx.correlationId,
    causationId: tenantCtx.correlationId,
    traceId: tenantCtx.traceId,
    data,
  };

  const completed: SagaStep[] = [];
  try {
    for (const step of steps) {
      ctx.causationId = `${ctx.correlationId}:${step.name}`;
      await withRetry(step, ctx);
      completed.push(step);
    }
  } catch (err) {
    for (const step of completed.reverse()) {
      try {
        await step.compensate(ctx);
      } catch {
        // آخرین تلاش جبران — ثبت در لایه observability در Wave بعد
      }
    }
    throw err;
  }
}
