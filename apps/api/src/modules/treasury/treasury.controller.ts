import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../guards/auth.guard';
import { TenantGuard } from '../../guards/tenant.guard';
import { postTreasuryTransactionCommand } from '../../application/treasury/treasury.handlers';

@Controller('api/v1/treasury')
@UseGuards(AuthGuard, TenantGuard)
export class TreasuryController {
  @Post('transactions')
  postTransaction(@Body() body: Parameters<typeof postTreasuryTransactionCommand>[0]) {
    return postTreasuryTransactionCommand(body);
  }
}
