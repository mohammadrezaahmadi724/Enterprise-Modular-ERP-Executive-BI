import { AsyncLocalStorage } from 'node:async_hooks';

/**
 * هر درخواست async یک‌بار از دیتابیس بارگذاری می‌شود.
 * درخواست بعدی store تازه دارد و حافظهٔ پروسه منبع حقیقت نیست.
 */
const loadedKeys = new AsyncLocalStorage<Set<string>>();
const pendingWrites = new AsyncLocalStorage<Promise<unknown>[]>();

function bucket(): Set<string> {
  let set = loadedKeys.getStore();
  if (!set) {
    set = new Set();
    loadedKeys.enterWith(set);
  }
  return set;
}

export function alreadyLoaded(key: string): boolean {
  return loadedKeys.getStore()?.has(key) ?? false;
}

export function rememberLoaded(key: string): void {
  bucket().add(key);
}

/** نوشتن Prisma که باید قبل از پاسخ HTTP تمام شود. */
export function trackDurableWrite(work: Promise<unknown>): void {
  let queue = pendingWrites.getStore();
  if (!queue) {
    queue = [];
    pendingWrites.enterWith(queue);
  }
  queue.push(work);
}

export async function flushDurableWrites(): Promise<void> {
  const queue = pendingWrites.getStore();
  if (!queue?.length) return;
  const batch = queue.splice(0, queue.length);
  await Promise.all(batch);
}
