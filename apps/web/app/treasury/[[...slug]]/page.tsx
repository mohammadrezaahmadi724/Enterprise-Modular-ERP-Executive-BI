import { findMenuItemByHref, TENANT_MODULES } from '@repo/ui';
import { notFound } from 'next/navigation';
import { ErpScreenByHref } from '../../../components/erp-screen-by-href';
import { ModuleHub } from '../../../components/module-placeholder';

export default function TreasuryCatchAll({ params }: { params: { slug?: string[] } }) {
  const mod = TENANT_MODULES.find((m) => m.id === 'finance');
  if (!mod) notFound();
  if (!params.slug?.length) {
    return <ModuleHub module={mod} />;
  }
  const href = `/treasury/${params.slug.join('/')}`;
  if (!findMenuItemByHref(href)) notFound();
  return <ErpScreenByHref href={href} />;
}
