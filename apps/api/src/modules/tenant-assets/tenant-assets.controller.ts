import { Controller, Get, Param, Res, UseGuards } from '@nestjs/common';
import type { Response } from 'express';
import { TenantContext } from '@repo/domain';
import { RequirePermission } from '../../decorators/access.decorator';
import { TenantGuard } from '../../guards/tenant.guard';
import { readTenantBrandingObject, type BrandingSlot } from '../../storage/tenant-object-storage.service';

@Controller('api/v1/tenant-assets')
@UseGuards(TenantGuard)
export class TenantAssetsController {
  @Get('branding/:slot/:filename')
  @RequirePermission('operations.read')
  async brandingAsset(
    @Param('slot') slot: BrandingSlot,
    @Param('filename') filename: string,
    @Res() res: Response,
  ) {
    const tenantId = TenantContext.requireTenantId();
    const { buffer, contentType } = await readTenantBrandingObject(tenantId, slot, filename);
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'private, max-age=3600');
    res.send(buffer);
  }
}
