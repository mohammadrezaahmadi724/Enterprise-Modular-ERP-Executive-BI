import { Controller, Get, UseGuards } from '@nestjs/common';
import { SuperAdminGuard } from '../../guards/super-admin.guard';
import { RequirePermission } from '../../decorators/access.decorator';
import { platformOpsMonitorQuery, platformRuntimeQuery } from '../../application/platform/platform-ops.handlers';

@Controller('api/v1/platform/ops')
@UseGuards(SuperAdminGuard)
export class PlatformOpsController {
  @Get('monitor')
  @RequirePermission('platform.ops.read')
  monitor() {
    return platformOpsMonitorQuery();
  }

  @Get('runtime')
  @RequirePermission('platform.ops.read')
  runtime() {
    return platformRuntimeQuery();
  }
}
