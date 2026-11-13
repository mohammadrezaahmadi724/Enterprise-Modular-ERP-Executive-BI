const WEB = process.env.NEXT_PUBLIC_WEB_URL ?? 'http://127.0.0.1:3001';

export default function CheckoutSuccessPage() {
  return (
    <main className="text-center py-20 px-4" dir="rtl">
      <h1 className="text-2xl font-bold text-green-600">پرداخت موفق</h1>
      <p className="text-sm text-muted-foreground mt-2">اشتراک شما فعال شد و ماژول‌ها در حال نصب هستند.</p>
      <a href={`${WEB}/dashboard`} className="inline-block mt-6 text-primary underline">
        ورود به پنل
      </a>
    </main>
  );
}
