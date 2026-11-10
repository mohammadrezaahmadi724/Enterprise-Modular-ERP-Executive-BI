/** در مرورگر از rewrite داخلی Next استفاده می‌شود تا CORS خطا ندهد. */
export function apiBase(): string {
  if (typeof window !== 'undefined') return '/api-proxy';
  return process.env.NEXT_PUBLIC_API_URL ?? 'http://127.0.0.1:3000';
}
