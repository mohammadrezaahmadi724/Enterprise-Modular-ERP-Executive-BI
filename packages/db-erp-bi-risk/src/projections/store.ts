export type ProjectionRow = {
  tenantId: string;
  key: string;
  lastProcessedEventId: string;
  lastProcessedVersion: number;
  value: Record<string, number>;
};

const store = new Map<string, ProjectionRow>();

function keyOf(tenantId: string, projection: string, partKey: string) {
  return `${tenantId}:${projection}:${partKey}`;
}

export function resetProjections(): void {
  store.clear();
}

export function applyProjectionEvent(input: {
  tenantId: string;
  projection: string;
  partKey: string;
  eventId: string;
  aggregateVersion: number;
  delta: Record<string, number>;
}): 'applied' | 'duplicate' | 'out_of_order' {
  const k = keyOf(input.tenantId, input.projection, input.partKey);
  const row = store.get(k);
  if (row) {
    if (row.lastProcessedEventId === input.eventId) return 'duplicate';
    if (input.aggregateVersion !== row.lastProcessedVersion + 1) return 'out_of_order';
  } else if (input.aggregateVersion !== 1) {
    return 'out_of_order';
  }
  const nextValue = { ...(row?.value ?? {}) };
  for (const [field, add] of Object.entries(input.delta)) {
    nextValue[field] = (nextValue[field] ?? 0) + add;
  }
  store.set(k, {
    tenantId: input.tenantId,
    key: input.partKey,
    lastProcessedEventId: input.eventId,
    lastProcessedVersion: input.aggregateVersion,
    value: nextValue,
  });
  return 'applied';
}

export function getProjection(tenantId: string, projection: string, partKey: string) {
  return store.get(keyOf(tenantId, projection, partKey));
}

export function rebuildProjection(
  tenantId: string,
  projection: string,
  partKey: string,
  events: Array<{ eventId: string; aggregateVersion: number; delta: Record<string, number> }>,
): ProjectionRow | null {
  const k = keyOf(tenantId, projection, partKey);
  store.delete(k);
  for (const e of events.sort((a, b) => a.aggregateVersion - b.aggregateVersion)) {
    applyProjectionEvent({
      tenantId,
      projection,
      partKey,
      eventId: e.eventId,
      aggregateVersion: e.aggregateVersion,
      delta: e.delta,
    });
  }
  return store.get(k) ?? null;
}
