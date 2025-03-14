import * as React from "react";

import { DraggableTaskProps, DroppableColumnProps } from "./types";

import { CSS } from "@dnd-kit/utilities";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TaskCard } from "./TaskCard";
import { useDraggable } from "@dnd-kit/core";
import { useDroppable } from "@dnd-kit/core";

function DraggableTask({ task, column }: DraggableTaskProps) {
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

export function KanbanColumn({ id, title, tasks }: DroppableColumnProps) {
  const { setNodeRef } = useDroppable({ id });
  return (
    <div ref={setNodeRef} className="bg-sidebar rounded-lg p-4">
      <h3 className="font-semibold mb-4">{title}</h3>
      <ScrollArea className="h-full">
        {tasks.map((task) => (
          <DraggableTask key={`task-${task.id}`} task={task} column={id} />
        ))}
      </ScrollArea>
    </div>
  );
}
