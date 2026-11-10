import { redirect } from 'next/navigation';

/** مسیر legacy /pricing → پلن‌های داخل پنل مستأجر */
export default function PricingRedirectPage() {
  redirect('/billing/plans');
}
