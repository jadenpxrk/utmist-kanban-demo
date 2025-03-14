"use client";

import { DraggableTask } from "./DraggableTask";
import { DroppableColumnProps } from "@/types/kanban";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDroppable } from "@dnd-kit/core";

export function DroppableColumn({ id, title, tasks }: DroppableColumnProps) {
  const { setNodeRef } = useDroppable({ id });
  return (
    <div
      ref={setNodeRef}
      className="bg-sidebar rounded-lg p-4 flex flex-col"
      style={{ height: "100%" }}
    >
      <h3 className="font-semibold mb-4">{title}</h3>
      <ScrollArea className="flex-1">
        <div className="space-y-3">
          {tasks.map((task) => (
            <DraggableTask key={`task-${task.id}`} task={task} column={id} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
