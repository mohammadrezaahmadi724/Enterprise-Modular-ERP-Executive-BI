import Link from 'next/link';

export default function CheckoutPlansPage() {
  const plans = [
    { code: 'starter', name: 'پایه' },
    { code: 'professional', name: 'حرفه‌ای' },
    { code: 'enterprise', name: 'سازمانی' },
  ];
  return (
    <main className="mx-auto max-w-lg py-12 px-4" dir="rtl">
      <h1 className="text-xl font-bold mb-6">انتخاب پلن</h1>
      <ul className="space-y-3">
        {plans.map((p) => (
          <li key={p.code}>
            <Link href={`/checkout/plan/${p.code}`} className="block border rounded-lg p-4 hover:border-primary">
              {p.name}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
