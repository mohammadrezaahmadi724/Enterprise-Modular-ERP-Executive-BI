export default function MessagingChannelsPage() {
  return (
    <main className="p-6 space-y-4 max-w-xl" dir="rtl">
      <h1 className="text-2xl font-bold">کانال‌های پیام</h1>
      <p className="text-xs text-muted-foreground">تنظیمات رمزنگاری‌شده Telegram / Bale / Kavenegar</p>
      <ul className="text-sm list-disc pr-5 space-y-1">
        <li>Telegram Bot Token — AES-256-GCM</li>
        <li>Bale Bot Token — AES-256-GCM</li>
        <li>Kavenegar API Key — AES-256-GCM</li>
      </ul>
    </main>
  );
}
