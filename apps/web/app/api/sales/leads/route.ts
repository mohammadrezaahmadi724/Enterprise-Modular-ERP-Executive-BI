import fs from 'node:fs';
import path from 'node:path';
import { SALES_LEADS, type SalesLead } from '../../../../lib/sales-leads-demo';

const STORE = path.join(process.cwd(), '.data', 'sales-leads.json');

function loadLeads(): SalesLead[] {
  try {
    if (fs.existsSync(STORE)) {
      const raw = JSON.parse(fs.readFileSync(STORE, 'utf8')) as SalesLead[];
      if (Array.isArray(raw) && raw.length) return raw;
    }
  } catch {
    /* fall through */
  }
  fs.mkdirSync(path.dirname(STORE), { recursive: true });
  fs.writeFileSync(STORE, JSON.stringify(SALES_LEADS, null, 0), 'utf8');
  return [...SALES_LEADS];
}

function saveLeads(leads: SalesLead[]): void {
  fs.mkdirSync(path.dirname(STORE), { recursive: true });
  fs.writeFileSync(STORE, JSON.stringify(leads, null, 0), 'utf8');
}

export async function GET() {
  const leads = loadLeads();
  const openCount = leads.filter((l) => l.outcome === 'open').length;
  return Response.json({ leads, openCount, source: 'file' });
}

export async function PUT(req: Request) {
  const body = (await req.json()) as { leads?: SalesLead[] };
  if (!Array.isArray(body.leads)) {
    return Response.json({ error: 'leads[] required' }, { status: 400 });
  }
  saveLeads(body.leads);
  return Response.json({ ok: true, openCount: body.leads.filter((l) => l.outcome === 'open').length });
}

export async function POST(req: Request) {
  const body = (await req.json()) as { lead?: Partial<SalesLead> };
  const leads = loadLeads();
  const lead = body.lead;
  if (!lead?.name?.trim()) {
    return Response.json({ error: 'name required' }, { status: 400 });
  }
  const row: SalesLead = {
    id: lead.id ?? `QA-${Date.now()}`,
    name: lead.name.trim(),
    subject: lead.subject?.trim() || 'سرنخ جدید',
    amountToman: lead.amountToman ?? 0,
    stage: lead.stage ?? 'qualify',
    priority: lead.priority ?? 'normal',
    nextAction: lead.nextAction ?? 'تماس اول',
    outcome: lead.outcome ?? 'open',
    mine: lead.mine ?? true,
    owner: lead.owner ?? 'من',
    company: lead.company ?? '—',
    lastTouch: lead.lastTouch ?? 'امروز',
    createdAt: lead.createdAt ?? new Date().toISOString().slice(0, 10),
  };
  leads.unshift(row);
  saveLeads(leads);
  return Response.json({
    lead: row,
    leads,
    openCount: leads.filter((l) => l.outcome === 'open').length,
  });
}
