'use client';

import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type Step = { id: string; nameFa: string };

function SortableStep({ step, index }: { step: Step; index: number }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: step.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="rounded-md border bg-card p-3 cursor-grab active:cursor-grabbing touch-none"
    >
      {index + 1}. {step.nameFa}
    </li>
  );
}

export function WorkflowDesigner({ initial }: { initial?: string[] }) {
  const [steps, setSteps] = useState<Step[]>(
    (initial ?? ['ثبت', 'بررسی مالی', 'تایید نهایی']).map((nameFa, i) => ({ id: `s-${i}`, nameFa })),
  );
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setSteps((items) => {
      const oldIndex = items.findIndex((s) => s.id === active.id);
      const newIndex = items.findIndex((s) => s.id === over.id);
      return arrayMove(items, oldIndex, newIndex);
    });
  }

  async function saveDefinition() {
    await fetch('/api/workflows/definitions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ steps: steps.map((s, i) => ({ stepOrder: i + 1, nameFa: s.nameFa })) }),
    });
  }

  return (
    <div className="space-y-3">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext items={steps.map((s) => s.id)} strategy={verticalListSortingStrategy}>
          <ul className="space-y-2">
            {steps.map((step, index) => (
              <SortableStep key={step.id} step={step} index={index} />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
      <button type="button" className="text-sm border rounded px-3 py-2" onClick={() => void saveDefinition()}>
        ذخیره تعریف گردش کار
      </button>
    </div>
  );
}
