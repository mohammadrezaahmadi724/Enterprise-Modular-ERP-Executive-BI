import { listCalls, resetVoipStore, completeCall } from '@repo/db-erp-operations';

const DEMO_TENANT = '11111111-1111-4111-8111-111111111111';

export async function GET(req: Request) {
  const tenantId = new URL(req.url).searchParams.get('tenantId') ?? DEMO_TENANT;
  let calls = listCalls(tenantId);
  if (calls.length === 0) {
    completeCall({
      tenantId,
      direction: 'Outbound',
      fromNumber: '02191000000',
      toNumber: '+989121234567',
      durationSec: 65,
      idempotencyKey: 'seed-call-1',
      transcript: 'سلام وقت بخیر',
    });
    calls = listCalls(tenantId);
  }
  return Response.json({ calls });
}

export async function POST() {
  resetVoipStore();
  return Response.json({ ok: true });
}
