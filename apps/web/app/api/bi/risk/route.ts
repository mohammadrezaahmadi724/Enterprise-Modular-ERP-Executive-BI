import { evaluateRisks, listFindings } from '@repo/db-erp-bi-risk';

const DEMO_TENANT = '11111111-1111-4111-8111-111111111111';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const tenantId = url.searchParams.get('tenantId') ?? DEMO_TENANT;
  evaluateRisks(tenantId, [
    { ruleCode: 'cash_pressure', value: 0.22 },
    { ruleCode: 'sales_concentration_hhi', shares: [0.7, 0.2, 0.1] },
  ]);
  return Response.json({ findings: listFindings(tenantId) });
}
