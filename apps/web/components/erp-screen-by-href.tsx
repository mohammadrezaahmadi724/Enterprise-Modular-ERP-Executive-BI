'use client';

import { getModuleScreen } from '../lib/erp-module-screens';
import { ModuleWorkbench } from './module-workbench';

export function ErpScreenByHref({ href }: { href: string }) {
  const screen = getModuleScreen(href);
  return <ModuleWorkbench screen={screen} />;
}
