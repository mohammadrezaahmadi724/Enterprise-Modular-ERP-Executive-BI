import { CloudGate } from '../login/cloud-gate';
import '../login/cloud-gate.css';

export const metadata = { title: 'ساخت فضای کاری' };

export default function RegisterPage() {
  return <CloudGate mode="register" />;
}
