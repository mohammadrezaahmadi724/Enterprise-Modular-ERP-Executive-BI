/** صفحهٔ ارائه و چک‌اوت روی اپ marketing است. */
export function marketingUrl(path: string): string {
  const base = (process.env.NEXT_PUBLIC_MARKETING_URL ?? 'http://127.0.0.1:3003').replace(/\/$/, '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}
