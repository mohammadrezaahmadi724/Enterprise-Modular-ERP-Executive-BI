import type { TaskApi } from './projects-api';

export function procurementLinkForTask(task: TaskApi): { href: string; label: string } | null {
  if (!task.linkRef || !task.linkType || task.linkType === 'none') return null;
  const ref = encodeURIComponent(task.linkRef);
  if (task.linkType === 'purchase_request') {
    const q = task.projectCode ? `&project=${encodeURIComponent(task.projectCode)}` : '';
    return { href: `/procurement/purchase-requests?pr=${ref}${q}`, label: task.linkRef };
  }
  if (task.linkType === 'purchase_order') {
    const q = task.projectCode ? `&project=${encodeURIComponent(task.projectCode)}` : '';
    return { href: `/procurement/purchase-orders?pr=${ref}${q}`, label: task.linkRef };
  }
  if (task.linkType === 'document') {
    return { href: `/finance/journal-entries?search=${ref}`, label: task.linkRef };
  }
  if (task.linkType === 'customer') {
    return { href: `/sales/orders?search=${ref}`, label: task.linkRef };
  }
  return null;
}
