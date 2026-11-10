import { Controller, Get, UseGuards } from '@nestjs/common';
import { getPlatformOpsSnapshot, getProdRuntimeStatus } from './platform-ops.service';
import { SuperAdminGuard } from '../../guards/super-admin.guard';
import { RequirePermission } from '../../decorators/access.decorator';

@Controller('api/v1/platform/ops')
@UseGuards(SuperAdminGuard)
export class PlatformOpsController {
  @Get('monitor')
  @RequirePermission('platform.ops.read')
  async monitor() {
    return getPlatformOpsSnapshot();
  }

  @Get('runtime')
  @RequirePermission('platform.ops.read')
  runtime() {
    return getProdRuntimeStatus();
  }
}
