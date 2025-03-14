"use client";

import { DraggableTaskProps } from "@/types/kanban";
import { TaskCard } from "./TaskCard";
import { useDraggable } from "@dnd-kit/core";

export function DraggableTask({ task, column }: DraggableTaskProps) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: `task-${task.id}`,
    data: { task, column },
  });

  return (
    <div ref={setNodeRef} {...listeners} {...attributes}>
      <TaskCard task={task} />
    </div>
  );
}
