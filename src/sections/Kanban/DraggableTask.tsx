"use client";

import { CSS } from "@dnd-kit/utilities";
import { DraggableTaskProps } from "@/types/kanban";
import { TaskCard } from "./TaskCard";
import { useDraggable } from "@dnd-kit/core";

export function DraggableTask({ task, column }: DraggableTaskProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `task-${task.id}`,
    data: { task, column },
  });

  const style = {
    transform: transform ? CSS.Translate.toString(transform) : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <TaskCard task={task} />
    </div>
  );
}
