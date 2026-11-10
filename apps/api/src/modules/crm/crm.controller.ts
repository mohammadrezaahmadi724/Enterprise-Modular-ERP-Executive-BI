import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ModuleEntitlementGuard, RequireModule } from '@repo/module-sdk';
import { RequirePermission } from '../../decorators/access.decorator';
import { TenantGuard } from '../../guards/tenant.guard';
import { createContact, listContacts } from './crm.service';

@Controller('api/v1/crm')
@UseGuards(TenantGuard, ModuleEntitlementGuard)
export class CrmController {
  @Get('contacts')
  @RequireModule('crm-base')
  @RequirePermission('crm.read')
  async list() {
    return { contacts: await listContacts() };
  }

  @Post('contacts')
  @RequireModule('crm-base')
  @RequirePermission('crm.write')
  async create(@Body() body: { fullName: string; email?: string }) {
    return { contact: await createContact(body) };
  }
}
