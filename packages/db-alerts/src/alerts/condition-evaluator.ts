/** ارزیابی condition امن — فقط مسیرهای ساده روی payload رویداد */
export function evaluateCondition(condition: Record<string, unknown>, payload: Record<string, unknown>): boolean {
  if (Object.keys(condition).length === 0) return true;
  for (const [path, expected] of Object.entries(condition)) {
    const actual = path.split('.').reduce<unknown>((acc, key) => {
      if (acc && typeof acc === 'object' && key in (acc as object)) {
        return (acc as Record<string, unknown>)[key];
      }
      return undefined;
    }, payload);
    if (actual !== expected) return false;
  }
  return true;
}
