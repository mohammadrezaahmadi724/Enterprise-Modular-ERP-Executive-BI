import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../guards/auth.guard';
import { TenantGuard } from '../../guards/tenant.guard';
import { postTreasuryTransaction } from '@repo/db-erp-finance';

@Controller('api/v1/treasury')
@UseGuards(AuthGuard, TenantGuard)
export class TreasuryController {
  @Post('transactions')
  postTransaction(
    @Body()
    body: Parameters<typeof postTreasuryTransaction>[0],
  ) {
    return postTreasuryTransaction(body);
  }
}
