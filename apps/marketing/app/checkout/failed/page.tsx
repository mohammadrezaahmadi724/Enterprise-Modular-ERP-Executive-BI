import Link from 'next/link';

export default function CheckoutFailedPage() {
  return (
    <main className="text-center py-20 px-4" dir="rtl">
      <h1 className="text-2xl font-bold text-destructive">پرداخت ناموفق</h1>
      <Link href="/checkout/plans" className="inline-block mt-6 text-primary underline">
        تلاش مجدد
      </Link>
    </main>
  );
}
