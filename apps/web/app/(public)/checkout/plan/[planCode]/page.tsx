import { CheckoutStepper } from '../../../../../components/checkout/checkout-stepper';

export function generateStaticParams() {
  return [{ planCode: 'starter' }, { planCode: 'professional' }, { planCode: 'enterprise' }];
}

export default async function CheckoutPlanPage(props: { params: Promise<{ planCode: string }> }) {
  const { planCode } = await props.params;
  return <CheckoutStepper planCode={planCode} />;
}
