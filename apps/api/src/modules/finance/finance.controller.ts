import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ModuleEntitlementGuard, RequireModule } from '@repo/module-sdk';
import { RequirePermission } from '../../decorators/access.decorator';
import { TenantGuard } from '../../guards/tenant.guard';
import { buildFinanceHubResponse } from './finance-hub.service';
import { receivablesOpenItemsQuery } from '../../application/finance/receivables.handlers';
import {
  createJournalDraftCommand,
  journalWorkflowStatusQuery,
  listJournalEntriesQuery,
  postJournalCommand,
} from '../../application/finance/journal.handlers';
import type { JournalEntryDraft } from '@repo/db-erp-finance';

@Controller('api/v1/finance')
@UseGuards(TenantGuard, ModuleEntitlementGuard)
export class FinanceController {
  @Get('hub')
  @RequireModule('finance-base')
  @RequirePermission('finance.read')
  async hub() {
    return buildFinanceHubResponse();
  }

  @Get('receivables/open-items')
  @RequireModule('finance-base')
  @RequirePermission('finance.read')
  receivablesOpenItems() {
    return receivablesOpenItemsQuery();
  }

  @Get('journal/entries')
  @RequireModule('finance-base')
  @RequirePermission('finance.read')
  listEntries() {
    return listJournalEntriesQuery();
  }

  @Post('journal/draft')
  @RequireModule('finance-base')
  @RequirePermission('finance.write')
  createDraft(
    @Body()
    body: {
      lines: { accountId: string; debit: string; credit: string; description?: string }[];
    },
  ) {
    return createJournalDraftCommand(body);
  }

  @Post('journal/post')
  @RequireModule('finance-base')
  @RequirePermission('finance.write')
  postJournal(
    @Body()
    body: {
      draft: JournalEntryDraft & {
        lines: { accountId: string; debit: string | bigint; credit: string | bigint; description?: string }[];
        entryDate?: string;
      };
      workflowInstanceId?: string;
      approverUserId?: string;
      approverRole?: string;
    },
  ) {
    return postJournalCommand(body);
  }

  @Get('journal/:id/workflow')
  @RequireModule('finance-base')
  @RequirePermission('finance.read')
  workflowStatus(@Param('id') id: string) {
    return journalWorkflowStatusQuery(id);
  }
}
