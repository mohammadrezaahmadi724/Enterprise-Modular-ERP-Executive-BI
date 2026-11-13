import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ModuleEntitlementGuard, RequireModule } from '@repo/module-sdk';
import { RequirePermission } from '../../decorators/access.decorator';
import { TenantGuard } from '../../guards/tenant.guard';
import type {
  CreateInvoiceBody,
  CreateOrderBody,
  CreateQuoteBody,
  CreateReturnBody,
  FulfillSalesOrderBody,
  PostReturnBody,
} from './sales.dto';
import { getOrderFulfillment } from '../../bridges/sales-fulfillment.bridge';
import {
  confirmOrderSupplyCommand,
  createInvoiceCommand,
  createOrderCommand,
  createQuoteCommand,
  createReturnCommand,
  createReturnFromInvoiceCommand,
  fulfillSalesOrderCommand,
  postInvoiceCommand,
  postReturnCommand,
} from '../../application/sales/sales.commands';
import {
  getSalesInvoiceQuery as getInvoice,
  getSalesOrderQuery as getOrder,
  getSalesQuoteQuery as getQuote,
  getSalesReturnQuery as getReturn,
  listSalesInvoicesQuery as listInvoices,
  listSalesOrdersQuery as listOrders,
  listSalesQuotesQuery as listQuotes,
  listSalesReturnsQuery as listReturns,
  salesDocumentSourceQuery as salesDocSource,
  salesFulfillmentOverviewQuery as getSalesFulfillmentOverview,
} from '../../application/sales/sales.queries';

type ReqUser = { headers: Record<string, string | string[] | undefined> };

function approverUserId(req: ReqUser): string {
  const raw = req.headers['x-user-id'];
  if (typeof raw === 'string' && raw.length > 0) return raw;
  return '00000000-0000-4000-8000-000000000001';
}

@Controller('api/v1/sales')
@UseGuards(TenantGuard, ModuleEntitlementGuard)
export class SalesController {
  @Get('quotes')
  @RequireModule('operations-base')
  @RequirePermission('operations.read')
  async quotes() {
    return { quotes: await listQuotes(), source: salesDocSource() };
  }

  @Get('quotes/:number')
  @RequireModule('operations-base')
  @RequirePermission('operations.read')
  async quote(@Param('number') number: string) {
    const quote = await getQuote(decodeURIComponent(number));
    return { quote, source: salesDocSource() };
  }

  @Post('quotes')
  @RequireModule('operations-base')
  @RequirePermission('operations.write')
  async createQuoteHandler(@Body() body: CreateQuoteBody) {
    return createQuoteCommand(body);
  }

  @Get('orders')
  @RequireModule('operations-base')
  @RequirePermission('operations.read')
  async orders() {
    return { orders: await listOrders(), source: salesDocSource() };
  }

  @Get('orders/:number')
  @RequireModule('operations-base')
  @RequirePermission('operations.read')
  async order(@Param('number') number: string) {
    const order = await getOrder(decodeURIComponent(number));
    return { order, source: salesDocSource() };
  }

  @Post('orders')
  @RequireModule('operations-base')
  @RequirePermission('operations.write')
  async createOrderHandler(@Body() body: CreateOrderBody) {
    return createOrderCommand(body);
  }

  @Post('orders/:number/confirm')
  @RequireModule('operations-base')
  @RequirePermission('operations.write')
  async confirmOrderHandler(@Param('number') number: string) {
    return confirmOrderSupplyCommand(decodeURIComponent(number));
  }

  @Get('orders/:number/fulfillment')
  @RequireModule('operations-base')
  @RequirePermission('operations.read')
  async orderFulfillment(@Param('number') number: string) {
    const fulfillment = await getOrderFulfillment(decodeURIComponent(number));
    return { fulfillment, source: salesDocSource() };
  }

  @Get('overview/fulfillment-kpis')
  @RequireModule('operations-base')
  @RequirePermission('operations.read')
  async fulfillmentKpis() {
    const kpis = await getSalesFulfillmentOverview();
    return {
      kpis,
      source: kpis.sources.join(', '),
    };
  }

  @Post('orders/:number/fulfill')
  @RequireModule('operations-base')
  @RequirePermission('operations.write')
  async fulfillOrderHandler(
    @Param('number') number: string,
    @Body() body: FulfillSalesOrderBody,
    @Req() req: ReqUser,
  ) {
    return fulfillSalesOrderCommand(decodeURIComponent(number), body, approverUserId(req));
  }

  @Get('invoices')
  @RequireModule('operations-base')
  @RequirePermission('operations.read')
  async invoices() {
    return { invoices: await listInvoices(), source: salesDocSource() };
  }

  @Get('invoices/:number')
  @RequireModule('operations-base')
  @RequirePermission('operations.read')
  async invoice(@Param('number') number: string) {
    const invoice = await getInvoice(decodeURIComponent(number));
    return { invoice, source: salesDocSource() };
  }

  @Post('invoices')
  @RequireModule('operations-base')
  @RequirePermission('operations.write')
  async createInvoiceHandler(@Body() body: CreateInvoiceBody) {
    return createInvoiceCommand(body);
  }

  @Post('invoices/:number/post')
  @RequireModule('operations-base')
  @RequirePermission('finance.write')
  async postInvoiceHandler(@Param('number') number: string, @Req() req: ReqUser) {
    return postInvoiceCommand(decodeURIComponent(number), approverUserId(req));
  }

  @Post('invoices/:number/return-draft')
  @RequireModule('operations-base')
  @RequirePermission('operations.write')
  async returnDraftFromInvoice(@Param('number') number: string, @Body() body: { reason?: string }) {
    return createReturnFromInvoiceCommand(decodeURIComponent(number), body.reason);
  }

  @Get('returns')
  @RequireModule('operations-base')
  @RequirePermission('operations.read')
  async returns() {
    return { returns: await listReturns(), source: salesDocSource() };
  }

  @Get('returns/:id')
  @RequireModule('operations-base')
  @RequirePermission('operations.read')
  async returnOne(@Param('id') id: string) {
    const memo = await getReturn(decodeURIComponent(id));
    return { return: memo, source: salesDocSource() };
  }

  @Post('returns')
  @RequireModule('operations-base')
  @RequirePermission('operations.write')
  async createReturnHandler(@Body() body: CreateReturnBody) {
    return createReturnCommand(body);
  }

  @Post('returns/:id/post')
  @RequireModule('operations-base')
  @RequirePermission('finance.write')
  async postReturnHandler(
    @Param('id') id: string,
    @Body() body: PostReturnBody,
    @Req() req: ReqUser,
  ) {
    return postReturnCommand(decodeURIComponent(id), body, approverUserId(req));
  }
}
