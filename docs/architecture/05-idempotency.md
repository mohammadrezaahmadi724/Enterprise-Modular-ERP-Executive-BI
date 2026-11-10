# Idempotency

`IdempotencyInterceptor` برای POST/PUT/PATCH/DELETE:

- هدر `Idempotency-Key` اجباری
- آپلود: hash روی filename, size, mimetype
- پاسخ &lt; 64KB در DB؛ بزرگ‌تر `responseReferenceId`
- TTL 24 ساعت
