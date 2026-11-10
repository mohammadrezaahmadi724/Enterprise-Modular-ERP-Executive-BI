import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../guards/auth.guard';
import { TenantGuard } from '../../guards/tenant.guard';
import {
  Approve,
  Escalate,
  Reject,
  StartWorkflow,
  delegate as Delegate,
} from '@repo/db-erp-finance';

@Controller('api/v1/workflows')
@UseGuards(AuthGuard, TenantGuard)
export class WorkflowController {
  @Post('start')
  start(
    @Body()
    body: {
      tenantId: string;
      definitionCode: string;
      version: number;
      entityType: string;
      entityId: string;
      correlationId?: string;
    },
  ) {
    return StartWorkflow(body);
  }

  @Post(':instanceId/approve')
  approve(
    @Param('instanceId') instanceId: string,
    @Body() body: { userId: string; userRole: string; comment?: string },
  ) {
    return Approve(instanceId, body.userId, body.userRole, body.comment);
  }

  @Post(':instanceId/reject')
  reject(@Param('instanceId') instanceId: string, @Body() body: { userId: string; comment?: string }) {
    return Reject(instanceId, body.userId, body.comment);
  }

  @Post(':instanceId/delegate')
  delegate(
    @Param('instanceId') instanceId: string,
    @Body() body: { userId: string; toUserId: string },
  ) {
    return Delegate(instanceId, body.userId, body.toUserId);
  }

  @Post(':instanceId/escalate')
  escalate(@Param('instanceId') instanceId: string) {
    return Escalate(instanceId);
  }
}
