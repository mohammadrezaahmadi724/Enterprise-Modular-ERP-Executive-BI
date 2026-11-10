export const metadata = { title: 'امنیت و انطباق' };

export default function SecurityPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 prose prose-sm" dir="rtl">
      <h1>امنیت در سطح سازمانی</h1>
      <p>ایزولاسیون مستأجر با RLS، رمزنگاری AES-256-GCM، Break-Glass دو نفره، پشتیبان روزانه + Restore Drill، و Audit کامل.</p>
      <ul>
        <li>SPF / DKIM / DMARC برای ایمیل</li>
        <li>Idempotency روی تمام جهش‌دهنده‌ها</li>
        <li>دفتر کل تغییرناپذیر پس از Post</li>
      </ul>
    </main>
  );
}
