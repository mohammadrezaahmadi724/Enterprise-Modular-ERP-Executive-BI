import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { Public } from '../../decorators/access.decorator';
import { processCheckout, recordPayment, resetBillingStore } from '@repo/db-platform';

const PUBLIC_PLANS = [
  { code: 'starter', nameFa: 'پایه', basePrice: 490_000, modules: 3, seats: 5 },
  { code: 'professional', nameFa: 'حرفه‌ای', basePrice: 1_290_000, modules: 9, seats: 25 },
  { code: 'enterprise', nameFa: 'سازمانی', basePrice: 0, modules: 9, seats: 999, custom: true },
] as const;

@Public()
@Controller('api/v1/public')
export class PublicBillingController {
  @Get('plans')
  listPlans() {
    return { plans: PUBLIC_PLANS };
  }

  @Post('checkout')
  checkout(
    @Headers('idempotency-key') headerKey: string | undefined,
    @Body()
    body: {
      tenantId: string;
      planCode: string;
      seats?: number;
      discountPercent?: number;
      periodClosed?: boolean;
      idempotencyKey?: string;
    },
  ) {
    const plan = PUBLIC_PLANS.find((p) => p.code === body.planCode) ?? PUBLIC_PLANS[0];
    if ('custom' in plan && plan.custom) {
      return { status: 'ContactSales', planCode: body.planCode };
    }
    return processCheckout({
      tenantId: body.tenantId,
      idempotencyKey: headerKey ?? body.idempotencyKey ?? 'missing-key',
      planCode: body.planCode,
      seats: body.seats ?? plan.seats,
      basePrice: plan.basePrice,
      discountPercent: body.discountPercent ?? 0,
      periodClosed: body.periodClosed,
    });
  }

  @Post('checkout/pay')
  pay(
    @Headers('idempotency-key') headerKey: string | undefined,
    @Body() body: { tenantId: string; amount: number; idempotencyKey?: string },
  ) {
    return recordPayment({
      tenantId: body.tenantId,
      idempotencyKey: headerKey ?? body.idempotencyKey ?? 'pay-missing',
      amount: body.amount,
      currency: 'IRR',
      exchangeRateSnapshot: { base: 'IRR', rate: 1 },
    });
  }
}

export function _resetPublicBillingForTests() {
  resetBillingStore();
}
