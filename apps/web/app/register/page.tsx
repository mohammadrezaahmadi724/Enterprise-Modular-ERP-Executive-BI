import Link from 'next/link';

export const metadata = { title: 'ثبت‌نام رایگان' };

export default function RegisterPage() {
  return (
    <main className="mx-auto max-w-md px-4 py-16" dir="rtl">
      <h1 className="text-2xl font-bold">شروع رایگان ۱۴ روزه</h1>
      <p className="text-sm text-muted-foreground mt-2">بدون نیاز به کارت بانکی — راه‌اندازی در کمتر از ۵ دقیقه.</p>
      <form className="mt-8 space-y-3">
        <label className="block text-sm">
          نام
          <input className="mt-1 w-full border rounded px-3 py-2" name="name" required />
        </label>
        <label className="block text-sm">
          ایمیل
          <input className="mt-1 w-full border rounded px-3 py-2" type="email" name="email" required />
        </label>
        <label className="block text-sm">
          نام شرکت
          <input className="mt-1 w-full border rounded px-3 py-2" name="company" />
        </label>
        <button type="submit" className="w-full rounded-md bg-primary text-primary-foreground py-2 font-medium">
          ایجاد حساب Trial
        </button>
      </form>
      <p className="text-xs text-center mt-4">
        قبلاً ثبت‌نام کرده‌اید؟ <Link href="/login">ورود</Link>
      </p>
      <p className="text-xs text-center mt-2">
        <Link href="/checkout/plan/professional">خرید مستقیم اشتراک</Link>
      </p>
    </main>
  );
}
