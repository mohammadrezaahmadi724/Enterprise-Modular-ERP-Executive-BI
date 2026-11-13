import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ModuleEntitlementGuard, RequireModule } from '@repo/module-sdk';
import { RequirePermission } from '../../decorators/access.decorator';
import { TenantGuard } from '../../guards/tenant.guard';
import {
  completeProductionCommand,
  confirmDeliveryCommand,
  confirmSaleCommand,
  operationsStatusQuery,
  reserveStockCommand,
  seedInventoryCommand,
} from '../../application/operations/operations.handlers';

@Controller('api/v1/operations')
@UseGuards(TenantGuard, ModuleEntitlementGuard)
export class OperationsController {
  @Get('status')
  @RequireModule('operations-base')
  @RequirePermission('operations.read')
  status() {
    return operationsStatusQuery();
  }

  @Post('sales/confirm')
  @RequireModule('operations-base')
  confirmSale(
    @Body() body: { orderId: string; lines: { productId: string; warehouseId: string; qty: string }[] },
  ) {
    return confirmSaleCommand(body);
  }

  @Post('inventory/seed')
  @RequireModule('operations-base')
  seedStock(@Body() body: { productId: string; warehouseId: string; qty: string }) {
    return seedInventoryCommand(body);
  }

  @Post('inventory/reserve')
  @RequireModule('operations-base')
  reserve(@Body() body: { productId: string; warehouseId: string; qty: string }) {
    return reserveStockCommand(body);
  }

  @Post('distribution/confirm-delivery')
  @RequireModule('operations-base')
  deliver() {
    return confirmDeliveryCommand();
  }

  @Post('manufacturing/complete')
  @RequireModule('operations-base')
  manufacture() {
    return completeProductionCommand();
  }
}
