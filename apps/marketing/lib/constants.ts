export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.example.ir';
export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://127.0.0.1:3000';
export const WEB_URL = process.env.NEXT_PUBLIC_WEB_URL ?? 'http://127.0.0.1:3001';
export const REGISTER_PATH = `${WEB_URL}/register`;
export const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ?? '';

export const MOTION_FAST = { duration: 0.25, ease: 'easeOut' as const };
