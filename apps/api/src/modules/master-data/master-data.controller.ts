import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Request } from 'express';
import type { BrandingSlot } from '../../storage/tenant-object-storage.service';
import { ModuleEntitlementGuard, RequireModule } from '@repo/module-sdk';
import { RequirePermission } from '../../decorators/access.decorator';
import { TenantGuard } from '../../guards/tenant.guard';
import type { MasterDataSectionId } from '../../bridges/master-data-entitlements.bridge';
import {
  getMasterDataBranding,
  getMasterDataCostCenters,
  getMasterDataItems,
  getMasterDataLocations,
  getMasterDataOverview,
  getMasterDataParties,
  getMasterDataPriceLists,
  getMasterDataTaxes,
  getMasterDataUnits,
  getMasterDataWarehouses,
  patchBrandingCommand,
  uploadBrandingCommand,
  archiveMasterRecordCommand,
} from '../../application/master-data/master-data.handlers';

const BRANDING_SLOTS = new Set<BrandingSlot>(['logo', 'stamp', 'signature']);

const ARCHIVE_SECTIONS = new Set<MasterDataSectionId>([
  'units',
  'taxes',
  'locations',
  'priceLists',
  'items',
]);

@Controller('api/v1/projects/master-data')
@UseGuards(TenantGuard, ModuleEntitlementGuard)
export class MasterDataController {
  @Get('overview')
  @RequireModule('projects-base')
  @RequirePermission('operations.read')
  async overview() {
    return { data: await getMasterDataOverview() };
  }

  @Get('parties')
  @RequireModule('projects-base')
  @RequirePermission('operations.read')
  async parties() {
    return await getMasterDataParties();
  }

  @Get('items')
  @RequireModule('projects-base')
  @RequirePermission('operations.read')
  async items() {
    return await getMasterDataItems();
  }

  @Get('units')
  @RequireModule('projects-base')
  @RequirePermission('operations.read')
  async units() {
    return await getMasterDataUnits();
  }

  @Get('taxes')
  @RequireModule('projects-base')
  @RequirePermission('operations.read')
  async taxes() {
    return await getMasterDataTaxes();
  }

  @Get('warehouses')
  @RequireModule('projects-base')
  @RequirePermission('operations.read')
  async warehouses() {
    return await getMasterDataWarehouses();
  }

  @Get('locations')
  @RequireModule('projects-base')
  @RequirePermission('operations.read')
  async locations() {
    return await getMasterDataLocations();
  }

  @Get('cost-centers')
  @RequireModule('projects-base')
  @RequirePermission('operations.read')
  async costCenters() {
    return await getMasterDataCostCenters();
  }

  @Get('price-lists')
  @RequireModule('projects-base')
  @RequirePermission('operations.read')
  async priceLists() {
    return await getMasterDataPriceLists();
  }

  @Get('branding')
  @RequireModule('projects-base')
  @RequirePermission('operations.read')
  async branding() {
    return await getMasterDataBranding();
  }

  @Patch('branding')
  @RequireModule('projects-base')
  @RequirePermission('operations.write')
  async updateBranding(
    @Body() body: { logoUrl?: string; stampUrl?: string; signatureUrl?: string },
  ) {
    return patchBrandingCommand(body);
  }

  @Post('branding/:slot/upload')
  @RequireModule('projects-base')
  @RequirePermission('operations.write')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: Number(process.env.BRANDING_UPLOAD_MAX_BYTES ?? 2 * 1024 * 1024) },
    }),
  )
  async uploadBranding(
    @Param('slot') slot: string,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    const normalized = slot as BrandingSlot;
    if (!BRANDING_SLOTS.has(normalized)) {
      return { ok: false, reason: 'invalid_slot' };
    }
    return uploadBrandingCommand(normalized, file, req.ip);
  }

  @Post(':section/:code/archive')
  @RequireModule('projects-base')
  @RequirePermission('operations.write')
  async archiveRecord(@Param('section') section: string, @Param('code') code: string) {
    const sid = section === 'price-lists' ? 'priceLists' : (section as MasterDataSectionId);
    if (!ARCHIVE_SECTIONS.has(sid)) {
      return { ok: false, reason: 'invalid_section' };
    }
    return archiveMasterRecordCommand(sid, decodeURIComponent(code));
  }
}
