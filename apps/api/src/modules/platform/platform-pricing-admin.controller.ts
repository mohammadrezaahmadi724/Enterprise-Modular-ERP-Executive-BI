import { Body, Controller, Get, Param, Patch, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../guards/auth.guard';
import { SuperAdminGuard } from '../../guards/super-admin.guard';
import type { ErpModuleCode, ModuleCatalogEntry } from '@repo/contracts';
import {
  listPlansWithModules,
  loadModuleCatalog,
  saveModuleCatalog,
  updatePlanModules,
} from './pricing-catalog.service';

@Controller('api/v1/platform/pricing')
@UseGuards(AuthGuard, SuperAdminGuard)
export class PlatformPricingAdminController {
  @Get('catalog')
  catalog() {
    return loadModuleCatalog();
  }

  @Put('catalog')
  async putCatalog(@Body() body: { modules: ModuleCatalogEntry[] }) {
    await saveModuleCatalog(body.modules ?? []);
    return loadModuleCatalog();
  }

  @Get('plans')
  plans() {
    return listPlansWithModules();
  }

  @Patch('plans/:planId/modules')
  async patchPlanModules(
    @Param('planId') planId: string,
    @Body()
    body: {
      includedModules: ErpModuleCode[];
      modulePrices: Partial<Record<ErpModuleCode, number>>;
    },
  ) {
    const row = await updatePlanModules(planId, body);
    return { plan: row };
  }
}
