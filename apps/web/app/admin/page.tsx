import { redirect } from 'next/navigation';

/** هم‌نام با cloud.sakhtar.net/t/demo/admin */
export default function TenantAdminHomePage() {
  redirect('/dashboard');
}
