import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../guards/auth.guard';
import { TenantGuard } from '../../guards/tenant.guard';
import {
  approveWorkflowCommand,
  delegateWorkflowCommand,
  escalateWorkflowCommand,
  rejectWorkflowCommand,
  startWorkflowCommand,
  workflowInboxQuery,
} from '../../application/workflow/workflow.handlers';

@Controller('api/v1/workflows')
@UseGuards(AuthGuard, TenantGuard)
export class WorkflowController {
  @Get('inbox')
  inbox() {
    return workflowInboxQuery();
  }

  @Post('start')
  start(
    @Body()
    body: {
      tenantId?: string;
      definitionCode: string;
      version: number;
      entityType: string;
      entityId: string;
      correlationId?: string;
    },
  ) {
    return startWorkflowCommand(body);
  }

  @Post(':instanceId/approve')
  approve(
    @Param('instanceId') instanceId: string,
    @Body() body: { userId: string; userRole: string; comment?: string },
  ) {
    return approveWorkflowCommand(instanceId, body);
  }

  @Post(':instanceId/reject')
  reject(@Param('instanceId') instanceId: string, @Body() body: { userId: string; comment?: string }) {
    return rejectWorkflowCommand(instanceId, body);
  }

  @Post(':instanceId/delegate')
  delegate(@Param('instanceId') instanceId: string, @Body() body: { userId: string; toUserId: string }) {
    return delegateWorkflowCommand(instanceId, body);
  }

  @Post(':instanceId/escalate')
  escalate(@Param('instanceId') instanceId: string) {
    return escalateWorkflowCommand(instanceId);
  }
}
