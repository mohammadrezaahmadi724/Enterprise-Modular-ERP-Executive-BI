import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../guards/auth.guard';
import { SuperAdminGuard } from '../../guards/super-admin.guard';
import {
  type AdminResource,
  createAdminResourceCommand,
  deleteAdminResourceCommand,
  listAdminResourceQuery,
  updateAdminResourceCommand,
} from '../../application/platform/platform-admin.handlers';

@Controller('api/v1/platform/admin')
@UseGuards(AuthGuard, SuperAdminGuard)
export class PlatformAdminController {
  @Get(':resource')
  list(@Param('resource') resource: AdminResource, @Query('q') q?: string) {
    return listAdminResourceQuery(resource, q);
  }

  @Post(':resource')
  create(@Param('resource') resource: AdminResource, @Body() body: Record<string, unknown>) {
    return createAdminResourceCommand(resource, body);
  }

  @Patch(':resource/:id')
  update(
    @Param('resource') resource: AdminResource,
    @Param('id') id: string,
    @Body() body: Record<string, unknown>,
  ) {
    return updateAdminResourceCommand(resource, id, body);
  }

  @Delete(':resource/:id')
  remove(@Param('resource') resource: AdminResource, @Param('id') id: string) {
    return deleteAdminResourceCommand(resource, id);
  }
}
