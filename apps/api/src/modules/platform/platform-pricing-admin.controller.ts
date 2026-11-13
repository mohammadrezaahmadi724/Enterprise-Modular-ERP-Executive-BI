import { Body, Controller, Delete, Get, Param, Patch, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../guards/auth.guard';
import { SuperAdminGuard } from '../../guards/super-admin.guard';
import type { ErpModuleCode, MarketingSiteContent, ModuleCatalogEntry } from '@repo/contracts';
import type { CloudSubscriptionPatch } from './cloud-subscription.service';
import {
  clearCloudSubscriptionCommand,
  cloudSubscriptionQuery,
  marketingSiteQuery,
  moduleCatalogQuery,
  plansWithModulesQuery,
  saveMarketingSiteCommand,
  saveCloudSubscriptionCommand,
  saveModuleCatalogCommand,
  updatePlanModulesCommand,
} from '../../application/platform/pricing.handlers';

@Controller('api/v1/platform/pricing')
@UseGuards(AuthGuard, SuperAdminGuard)
export class PlatformPricingAdminController {
  @Get('site')
  site() {
    return marketingSiteQuery();
  }

  @Put('site')
  putSite(@Body() body: Partial<MarketingSiteContent>) {
    return saveMarketingSiteCommand(body);
  }

  @Get('catalog')
  catalog() {
    return moduleCatalogQuery();
  }

  @Put('catalog')
  putCatalog(@Body() body: { modules: ModuleCatalogEntry[] }) {
    return saveModuleCatalogCommand(body.modules ?? []);
  }

  @Get('plans')
  plans() {
    return plansWithModulesQuery();
  }

  @Get('cloud-subscription')
  cloudSubscription() {
    return cloudSubscriptionQuery();
  }

  @Put('cloud-subscription')
  putCloudSubscription(@Body() body: CloudSubscriptionPatch) {
    return saveCloudSubscriptionCommand(body);
  }

  @Delete('cloud-subscription')
  deleteCloudSubscription() {
    return clearCloudSubscriptionCommand();
  }

  @Patch('plans/:planId/modules')
  patchPlanModules(
    @Param('planId') planId: string,
    @Body()
    body: {
      includedModules: ErpModuleCode[];
      modulePrices: Partial<Record<ErpModuleCode, number>>;
    },
  ) {
    return updatePlanModulesCommand(planId, body);
  }
}
