import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { TenantContext } from '@repo/domain';
import { ModuleEntitlementGuard, RequireModule } from '@repo/module-sdk';
import {
  confirmSalesOrder,
  getSalesOutbox,
  reserveStockWithLock,
  seedInventory,
} from '@repo/db-erp-operations';
import { confirmDelivery, getDistributionStock } from '@repo/db-erp-operations';
import { completeProduction, getFgStock } from '@repo/db-erp-operations';
import { RequirePermission } from '../../decorators/access.decorator';
import { TenantGuard } from '../../guards/tenant.guard';

@Controller('api/v1/operations')
@UseGuards(TenantGuard, ModuleEntitlementGuard)
export class OperationsController {
  @Get('status')
  @RequireModule('operations-base')
  @RequirePermission('operations.read')
  status() {
    return {
      distributionStock: String(getDistributionStock()),
      fgStock: String(getFgStock()),
      salesOutbox: getSalesOutbox(),
    };
  }

  @Post('sales/confirm')
  @RequireModule('operations-base')
  async confirmSale(
    @Body() body: { orderId: string; lines: { productId: string; warehouseId: string; qty: string }[] },
  ) {
    await confirmSalesOrder({
      orderId: body.orderId,
      lines: body.lines.map((l) => ({
        productId: l.productId,
        warehouseId: l.warehouseId,
        qty: BigInt(l.qty),
      })),
    });
    return { ok: true, outbox: getSalesOutbox() };
  }

  @Post('inventory/seed')
  @RequireModule('operations-base')
  seedStock(@Body() body: { productId: string; warehouseId: string; qty: string }) {
    const key = `${body.productId}:${body.warehouseId}`;
    seedInventory(key, BigInt(body.qty));
    return { ok: true };
  }

  @Post('inventory/reserve')
  @RequireModule('operations-base')
  reserve(
    @Body() body: { productId: string; warehouseId: string; qty: string },
  ) {
    const ok = reserveStockWithLock(body.productId, body.warehouseId, BigInt(body.qty));
    return { reserved: ok };
  }

  @Post('distribution/confirm-delivery')
  @RequireModule('operations-base')
  async deliver() {
    const tenantId = TenantContext.requireTenantId();
    await confirmDelivery(tenantId);
    return { ok: true, stock: String(getDistributionStock()) };
  }

  @Post('manufacturing/complete')
  @RequireModule('operations-base')
  async manufacture() {
    const tenantId = TenantContext.requireTenantId();
    await completeProduction(tenantId);
    return { ok: true, fgStock: String(getFgStock()) };
  }
}
