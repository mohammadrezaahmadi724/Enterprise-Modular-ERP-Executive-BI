export async function POST(req: Request) {
  const body = await req.json();
  return Response.json({ ok: true, saved: body, persisted: process.env.ERP_WORKFLOW_PERSISTENCE === '1' });
}
