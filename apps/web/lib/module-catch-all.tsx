import { findMenuItemByHref, TENANT_MODULES } from '@repo/ui';
import { notFound } from 'next/navigation';
import { ModuleHub } from '../components/module-placeholder';
import { ErpScreenByHref } from '../components/erp-screen-by-href';

export function resolveCatchAll(moduleId: string, basePath: string, slug?: string[]) {
  const mod = TENANT_MODULES.find((m) => m.id === moduleId);
  if (!mod) notFound();

  if (!slug?.length) {
    return <ModuleHub module={mod} />;
  }

  const href = `${basePath}/${slug.join('/')}`;
  const found = findMenuItemByHref(href);
  return <ErpScreenByHref href={href} />;
}
