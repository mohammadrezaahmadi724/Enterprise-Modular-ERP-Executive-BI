import { Body, Controller, Headers, Post } from '@nestjs/common';
import { Public } from '../../decorators/access.decorator';
import { randomUUID } from 'node:crypto';
import { PLATFORM_EVENTS } from '@repo/contracts';
import { evaluateDomainEvent, registerAlertRule, resetAlertRules } from '@repo/db-alerts';

type LeadBody = {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  message?: string;
  source?: 'demo' | 'contact' | 'home-cta';
};

const leads: LeadBody[] = [];
let rulesReady = false;

function ensureSalesRule(): void {
  if (rulesReady) return;
  resetAlertRules();
  registerAlertRule({
    id: 'lead-demo',
    tenantId: 'platform',
    moduleCode: 'marketing',
    eventType: PLATFORM_EVENTS.TENANT_REGISTERED,
    condition: {},
    severity: 'info',
    templateKey: 'new_ticket_created',
    recipients: [{ role: 'sales' }],
    deduplicationWindowSec: 60,
    channels: ['Email'],
    isActive: true,
  });
  rulesReady = true;
}

@Public()
@Controller('api/v1/public/leads')
export class PublicLeadsController {
  @Post()
  create(@Body() body: LeadBody, @Headers('idempotency-key') idempotencyKey?: string) {
    const correlationId = idempotencyKey ?? randomUUID();
    leads.push({ ...body, source: body.source ?? 'demo' });
    ensureSalesRule();
    evaluateDomainEvent({
      tenantId: 'platform',
      eventType: PLATFORM_EVENTS.TENANT_REGISTERED,
      payload: { email: body.email, entityId: correlationId, lead: true },
      correlationId,
    });
    return { accepted: true, correlationId };
  }
}
