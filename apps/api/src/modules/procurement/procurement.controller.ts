import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ModuleEntitlementGuard, RequireModule } from '@repo/module-sdk';
import { RequirePermission } from '../../decorators/access.decorator';
import { TenantGuard } from '../../guards/tenant.guard';
import type {
  AddRfqQuoteBody,
  AwardRfqBody,
  CreatePurchaseOrderBody,
  CreatePurchaseRequestBody,
  CreateRfqBody,
  CreateSupplierBody,
} from './procurement.dto';
import type { ReceivePurchaseOrderBody } from '../../bridges/procurement-wms.bridge';
import {
  addRfqQuoteCommand,
  approvePurchaseOrderCommand,
  approvePurchaseRequestCommand,
  awardRfqCommand,
  createPurchaseOrderCommand,
  createPurchaseRequestCommand,
  createRfqCommand,
  createSupplierCommand,
  getProcurementOverview,
  getProcurementReports,
  getProcurementThresholds,
  listApprovedPurchaseRequests,
  listPurchaseOrders,
  listPurchaseRequests,
  listRfqs,
  listSuppliers,
  listSupplierInvoices,
  procurementSource,
  receivePurchaseOrderCommand,
} from '../../application/procurement/procurement.handlers';

type ReqUser = { headers: Record<string, string | string[] | undefined> };

function approverUserId(req: ReqUser): string {
  const raw = req.headers['x-user-id'];
  if (typeof raw === 'string' && raw.length > 0) return raw;
  return '00000000-0000-4000-8000-000000000001';
}

@Controller('api/v1/procurement')
@UseGuards(TenantGuard, ModuleEntitlementGuard)
export class ProcurementController {
  @Get('thresholds')
  @RequireModule('operations-base')
  @RequirePermission('operations.read')
  thresholds() {
    return { thresholds: getProcurementThresholds(), source: procurementSource() };
  }

  @Get('overview')
  @RequireModule('operations-base')
  @RequirePermission('operations.read')
  async overview() {
    const data = await getProcurementOverview();
    return { ...data, source: procurementSource() };
  }

  @Get('purchase-requests')
  @RequireModule('operations-base')
  @RequirePermission('operations.read')
  async purchaseRequests() {
    return { requests: await listPurchaseRequests(), source: procurementSource() };
  }

  @Get('purchase-requests/approved')
  @RequireModule('operations-base')
  @RequirePermission('operations.read')
  async approvedPurchaseRequests() {
    return { requests: await listApprovedPurchaseRequests(), source: procurementSource() };
  }

  @Post('purchase-requests')
  @RequireModule('operations-base')
  @RequirePermission('operations.write')
  async createPr(@Body() body: CreatePurchaseRequestBody) {
    return createPurchaseRequestCommand(body);
  }

  @Post('purchase-requests/:number/approve')
  @RequireModule('operations-base')
  @RequirePermission('operations.write')
  async approvePr(@Req() req: ReqUser, @Param('number') number: string) {
    return approvePurchaseRequestCommand(decodeURIComponent(number), approverUserId(req));
  }

  @Get('purchase-orders')
  @RequireModule('operations-base')
  @RequirePermission('operations.read')
  async purchaseOrders() {
    return { orders: await listPurchaseOrders(), source: procurementSource() };
  }

  @Post('purchase-orders')
  @RequireModule('operations-base')
  @RequirePermission('operations.write')
  async createPo(@Body() body: CreatePurchaseOrderBody) {
    return createPurchaseOrderCommand(body);
  }

  @Post('purchase-orders/:number/approve')
  @RequireModule('operations-base')
  @RequirePermission('operations.write')
  async approvePo(@Req() req: ReqUser, @Param('number') number: string) {
    return approvePurchaseOrderCommand(decodeURIComponent(number), approverUserId(req));
  }

  @Post('purchase-orders/:number/receive')
  @RequireModule('operations-base')
  @RequirePermission('operations.write')
  async receivePo(@Param('number') number: string, @Body() body: ReceivePurchaseOrderBody) {
    return receivePurchaseOrderCommand(decodeURIComponent(number), body);
  }

  @Get('suppliers')
  @RequireModule('operations-base')
  @RequirePermission('operations.read')
  async suppliers() {
    return { suppliers: await listSuppliers(), source: procurementSource() };
  }

  @Post('suppliers')
  @RequireModule('operations-base')
  @RequirePermission('operations.write')
  async createSupplierHandler(@Body() body: CreateSupplierBody) {
    return createSupplierCommand(body);
  }

  @Get('rfqs')
  @RequireModule('operations-base')
  @RequirePermission('operations.read')
  async rfqs() {
    return { rfqs: await listRfqs(), source: procurementSource() };
  }

  @Post('rfqs')
  @RequireModule('operations-base')
  @RequirePermission('operations.write')
  async createRfqHandler(@Body() body: CreateRfqBody) {
    return createRfqCommand(body);
  }

  @Post('rfqs/:number/quotes')
  @RequireModule('operations-base')
  @RequirePermission('operations.write')
  async addQuote(@Param('number') number: string, @Body() body: AddRfqQuoteBody) {
    return addRfqQuoteCommand(decodeURIComponent(number), body);
  }

  @Post('rfqs/:number/award')
  @RequireModule('operations-base')
  @RequirePermission('operations.write')
  async award(@Param('number') number: string, @Body() body: AwardRfqBody) {
    return awardRfqCommand(decodeURIComponent(number), body);
  }

  @Get('supplier-invoices')
  @RequireModule('operations-base')
  @RequirePermission('operations.read')
  async supplierInvoices() {
    return { invoices: await listSupplierInvoices(), source: procurementSource() };
  }

  @Get('reports')
  @RequireModule('operations-base')
  @RequirePermission('operations.read')
  async reports() {
    const data = await getProcurementReports();
    return { ...data, source: procurementSource() };
  }
}
