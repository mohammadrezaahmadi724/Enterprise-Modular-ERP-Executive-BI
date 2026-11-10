import { Controller, Post, Req, UnauthorizedException } from '@nestjs/common';
import type { Request } from 'express';
import { verifyN8nSignature, isIpWhitelisted } from '../../security/webhook-hmac';
import { handleN8nExecution } from '@repo/db-erp-operations';

@Controller('api/v1/webhooks/n8n/v1')
export class N8nWebhookController {
  @Post()
  handle(@Req() req: Request) {
    const secret = process.env.N8N_WEBHOOK_SECRET ?? 'dev-n8n-secret';
    const whitelist = (process.env.WEBHOOK_IP_WHITELIST ?? '127.0.0.1,::1').split(',').map((s) => s.trim());
    const ip = req.ip ?? req.socket.remoteAddress ?? '';
    if (!isIpWhitelisted(ip, whitelist) && !whitelist.includes('*')) {
      throw new UnauthorizedException('IP not allowed');
    }
    const raw = typeof req.body === 'string' ? req.body : JSON.stringify(req.body ?? {});
    const sig = req.headers['x-n8n-signature'] as string | undefined;
    if (!verifyN8nSignature(raw, sig, secret)) {
      throw new UnauthorizedException('Invalid HMAC signature');
    }
    const body = JSON.parse(raw) as {
      tenantId: string;
      workflowCode: string;
      executionId: string;
      payload?: unknown;
    };
    handleN8nExecution({
      tenantId: body.tenantId,
      workflowCode: body.workflowCode,
      executionId: body.executionId,
      payload: body.payload ?? {},
    });
    return { accepted: true };
  }
}
