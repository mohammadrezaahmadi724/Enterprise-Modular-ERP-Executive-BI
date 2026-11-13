/** در مرورگر از پروکسی Same-Origin استفاده می‌کند؛ در SSR مستقیم به API. */
export function apiBase() {
  if (typeof window !== 'undefined') return '/api-proxy';
  return process.env.NEXT_PUBLIC_API_URL ?? 'http://127.0.0.1:3000';
}
