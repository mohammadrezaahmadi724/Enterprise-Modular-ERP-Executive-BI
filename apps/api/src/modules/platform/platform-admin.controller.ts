import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../guards/auth.guard';
import { SuperAdminGuard } from '../../guards/super-admin.guard';
import {
  AdminResource,
  createAdminResource,
  deleteAdminResource,
  listAdminResource,
  updateAdminResource,
} from './platform-admin.service';

@Controller('api/v1/platform/admin')
@UseGuards(AuthGuard, SuperAdminGuard)
export class PlatformAdminController {
  @Get(':resource')
  async list(@Param('resource') resource: AdminResource, @Query('q') q?: string) {
    const rows = await listAdminResource(resource, q);
    return { rows };
  }

  @Post(':resource')
  async create(@Param('resource') resource: AdminResource, @Body() body: Record<string, unknown>) {
    const row = await createAdminResource(resource, body);
    return { row };
  }

  @Patch(':resource/:id')
  async update(
    @Param('resource') resource: AdminResource,
    @Param('id') id: string,
    @Body() body: Record<string, unknown>,
  ) {
    const row = await updateAdminResource(resource, id, body);
    return { row };
  }

  @Delete(':resource/:id')
  async remove(@Param('resource') resource: AdminResource, @Param('id') id: string) {
    return deleteAdminResource(resource, id);
  }
}
