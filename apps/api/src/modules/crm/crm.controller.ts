import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ModuleEntitlementGuard, RequireModule } from '@repo/module-sdk';
import { RequirePermission } from '../../decorators/access.decorator';
import { TenantGuard } from '../../guards/tenant.guard';
import {
  createContactCommand,
  getContactQuery,
  getCustomerQuery,
  listContactsQuery,
  listCustomersQuery,
} from '../../application/crm/crm.handlers';

@Controller('api/v1/crm')
@UseGuards(TenantGuard, ModuleEntitlementGuard)
export class CrmController {
  @Get('contacts')
  @RequireModule('crm-base')
  @RequirePermission('crm.read')
  list() {
    return listContactsQuery();
  }

  @Get('contacts/:id')
  @RequireModule('crm-base')
  @RequirePermission('crm.read')
  getOne(@Param('id') id: string) {
    return getContactQuery(id);
  }

  @Get('customers')
  @RequireModule('crm-base')
  @RequirePermission('crm.read')
  listCustomers() {
    return listCustomersQuery();
  }

  @Get('customers/:code')
  @RequireModule('crm-base')
  @RequirePermission('crm.read')
  getCustomer(@Param('code') code: string) {
    return getCustomerQuery(decodeURIComponent(code));
  }

  @Post('contacts')
  @RequireModule('crm-base')
  @RequirePermission('crm.write')
  create(@Body() body: { fullName: string; email?: string }) {
    return createContactCommand(body);
  }
}
