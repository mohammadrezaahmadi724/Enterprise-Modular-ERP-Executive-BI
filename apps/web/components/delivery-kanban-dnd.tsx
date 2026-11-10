'use client';

import { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
  useDroppable,
} from '@dnd-kit/core';
import { useDraggable } from '@dnd-kit/core';

type Col = 'Pending' | 'InTransit' | 'Delivered';
type Card = { id: string; title: string; col: Col };

const columns: { id: Col; title: string }[] = [
  { id: 'Pending', title: 'در انتظار' },
  { id: 'InTransit', title: 'در مسیر' },
  { id: 'Delivered', title: 'تحویل‌شده' },
];

function DraggableCard({ card }: { card: Card }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: card.id });
  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;
  return (
    <li
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`rounded border bg-background p-2 text-sm shadow-sm touch-none ${isDragging ? 'opacity-50' : ''}`}
    >
      {card.title}
    </li>
  );
}

function DroppableColumn({ col, cards }: { col: Col; cards: Card[] }) {
  const { setNodeRef, isOver } = useDroppable({ id: col });
  return (
    <section
      ref={setNodeRef}
      className={`rounded-lg border bg-muted/30 p-3 min-h-[200px] ${isOver ? 'ring-2 ring-primary' : ''}`}
    >
      <h2 className="text-sm font-semibold mb-3">{columns.find((c) => c.id === col)?.title}</h2>
      <ul className="space-y-2">
        {cards.map((c) => (
          <DraggableCard key={c.id} card={c} />
        ))}
      </ul>
    </section>
  );
}

export function DeliveryKanbanDnd() {
  const [cards, setCards] = useState<Card[]>([
    { id: 'd1', title: 'سفارش ۱۰۲۴', col: 'Pending' },
    { id: 'd2', title: 'سفارش ۱۰۲۵', col: 'InTransit' },
  ]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

  function onDragStart(e: DragStartEvent) {
    setActiveId(String(e.active.id));
  }

  function onDragEnd(e: DragEndEvent) {
    setActiveId(null);
    const over = e.over?.id as Col | undefined;
    if (!over || !columns.some((c) => c.id === over)) return;
    setCards((prev) => prev.map((c) => (c.id === e.active.id ? { ...c, col: over } : c)));
  }

  const active = cards.find((c) => c.id === activeId);

  return (
    <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <div className="grid gap-4 md:grid-cols-3">
        {columns.map((col) => (
          <DroppableColumn key={col.id} col={col.id} cards={cards.filter((c) => c.col === col.id)} />
        ))}
      </div>
      <DragOverlay>{active ? <div className="rounded border bg-background p-2 text-sm shadow">{active.title}</div> : null}</DragOverlay>
    </DndContext>
  );
}
