import { Suspense } from 'react';
import { CheckoutStepper } from '@/components/checkout/checkout-stepper';

export function generateStaticParams() {
  return [{ planCode: 'starter' }, { planCode: 'professional' }, { planCode: 'enterprise' }];
}

export default async function CheckoutPlanPage(props: { params: Promise<{ planCode: string }> }) {
  const { planCode } = await props.params;
  return (
    <Suspense fallback={<main className="p-10 text-center text-sm text-muted-foreground">در حال بارگذاری چک‌اوت…</main>}>
      <CheckoutStepper planCode={planCode} />
    </Suspense>
  );
}
