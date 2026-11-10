# Event Replay (آماده Wave 3+)

- `schemaVersion` روی هر رویداد
- Upcasterها در consumer
- Replay API فقط روی projection (نه OLTP)

Wave 0 جدول `domain_events_outbox` و قرارداد `DomainEvent` را آماده می‌کند.
