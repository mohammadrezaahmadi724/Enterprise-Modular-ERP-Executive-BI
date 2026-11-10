# Outbox و Saga

## Transactional Outbox

`writeOutboxEvent(tx, event)` در همان تراکنش دامنه insert می‌کند.

## Relay

Worker `outbox-relay` رویدادهای `Pending` را به صف BullMQ منتشر می‌کند.

## Saga

`runSaga(steps)` با timeout 30s، retry نمایی، و compensate معکوس در شکست.
