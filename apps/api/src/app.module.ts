import { MiddlewareConsumer, Module, NestModule, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { CompositeAuthGuard } from './guards/composite-auth.guard';
import { CompositeTenantGuard } from './guards/composite-tenant.guard';
import { RbacGuard } from './guards/rbac.guard';
import { HealthController } from './health.controller';
import { RootController } from './root.controller';
import { AuthController } from './modules/auth/auth.controller';
import { PlatformController } from './modules/platform/platform.controller';
import { WorkflowController } from './modules/workflow/workflow.controller';
import { TreasuryController } from './modules/treasury/treasury.controller';
import { BiController } from './modules/bi/bi.controller';
import { N8nWebhookController } from './modules/webhooks/n8n.controller';
import { PublicLeadsController } from './modules/public/public-leads.controller';
import { PublicBillingController } from './modules/public/public-billing.controller';
import { PublicPricingController } from './modules/public/public-pricing.controller';
import { PlatformPricingAdminController } from './modules/platform/platform-pricing-admin.controller';
import { PlatformOpsController } from './modules/platform/platform-ops.controller';
import { GlobalExceptionFilter } from './filters/http-exception.filter';
import { IdempotencyInterceptor } from './interceptors/idempotency.interceptor';
import { AuditInterceptor } from './interceptors/audit.interceptor';
import { PlatformAdminController } from './modules/platform/platform-admin.controller';
import { ErpResourceController } from './modules/erp/erp-resource.controller';
import { FinanceController } from './modules/finance/finance.controller';
import { CrmController } from './modules/crm/crm.controller';
import { OperationsController } from './modules/operations/operations.controller';
import { HrController } from './modules/hr/hr.controller';
import { ModuleEntitlementGuard } from '@repo/module-sdk';
import { SuperAdminGuard } from './guards/super-admin.guard';
import { TenantContextMiddleware } from './middleware/tenant-context.middleware';
import { CorrelationIdMiddleware } from './middleware/correlation-id.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '../../.env'],
    }),
  ],
  controllers: [
    RootController,
    HealthController,
    AuthController,
    PlatformController,
    WorkflowController,
    TreasuryController,
    BiController,
    N8nWebhookController,
    PublicLeadsController,
    PublicBillingController,
    PublicPricingController,
    PlatformOpsController,
    PlatformAdminController,
    PlatformPricingAdminController,
    ErpResourceController,
    FinanceController,
    CrmController,
    OperationsController,
    HrController,
  ],
  providers: [
    ModuleEntitlementGuard,
    SuperAdminGuard,
    RbacGuard,
    { provide: APP_GUARD, useClass: CompositeAuthGuard },
    { provide: APP_GUARD, useClass: CompositeTenantGuard },
    { provide: APP_GUARD, useClass: RbacGuard },
    { provide: APP_PIPE, useValue: new ValidationPipe({ whitelist: true, transform: true }) },
    { provide: APP_FILTER, useClass: GlobalExceptionFilter },
    { provide: APP_INTERCEPTOR, useClass: IdempotencyInterceptor },
    { provide: APP_INTERCEPTOR, useClass: AuditInterceptor },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(CorrelationIdMiddleware, TenantContextMiddleware).forRoutes('*');
  }
}
