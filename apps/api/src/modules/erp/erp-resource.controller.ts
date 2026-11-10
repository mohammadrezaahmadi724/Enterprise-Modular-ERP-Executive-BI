import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { RequirePermission } from '../../decorators/access.decorator';
import { TenantGuard } from '../../guards/tenant.guard';
import { TenantContext } from '@repo/domain';
import {
  createErpRecord,
  deleteErpRecord,
  listErpRecords,
  seedErpRecordsIfEmpty,
  updateErpRecord,
} from './erp-resource.service';

@Controller('api/v1/erp/screens')
@UseGuards(TenantGuard)
export class ErpResourceController {
  @Get('records')
  @RequirePermission('erp.read')
  async list(@Query('href') href: string, @Query('q') q?: string) {
    const tenantId = TenantContext.requireTenantId();
    const screenHref = href.startsWith('/') ? href : `/${href}`;
    const defaults = [
      { code: 'INIT-001', status: 'در جریان', title: 'رکورد نمونه ۱' },
      { code: 'INIT-002', status: 'تأییدشده', title: 'رکورد نمونه ۲' },
    ];
    await seedErpRecordsIfEmpty(tenantId, screenHref, defaults);
    const rows = await listErpRecords(tenantId, screenHref, q);
    return { rows, href: screenHref };
  }

  @Post('records')
  @RequirePermission('erp.write')
  async create(@Query('href') href: string, @Body() body: Record<string, unknown>) {
    const tenantId = TenantContext.requireTenantId();
    const screenHref = href.startsWith('/') ? href : `/${href}`;
    const row = await createErpRecord(tenantId, screenHref, body);
    return { row };
  }

  @Patch('records/:id')
  @RequirePermission('erp.write')
  async update(@Param('id') id: string, @Query('href') href: string, @Body() body: Record<string, unknown>) {
    const tenantId = TenantContext.requireTenantId();
    const row = await updateErpRecord(tenantId, id, body);
    return { row, href };
  }

  @Delete('records/:id')
  @RequirePermission('erp.write')
  async remove(@Param('id') id: string) {
    const tenantId = TenantContext.requireTenantId();
    return deleteErpRecord(tenantId, id);
  }
}
