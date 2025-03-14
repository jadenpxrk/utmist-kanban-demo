import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { Task, Tasks } from "@/types/kanban";

import { initialTasks } from "@/lib/data/kanban-mock";
import { useState } from "react";

export function useKanban() {
  const [columns, setColumns] = useState<Tasks>(initialTasks);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  function handleDragStart(event: DragStartEvent): void {
    const { active } = event;
    if (active.data.current) {
      setActiveTask(active.data.current.task);
    }
  }

  function handleDragEnd(event: DragEndEvent): void {
    const { active, over } = event;
    const activeData = active.data.current;
    if (activeData && over && activeData.column !== over.id) {
      setColumns((prev) => {
        const sourceCol = activeData.column as keyof Tasks;
        const task = activeData.task as Task;
        const newSource = prev[sourceCol].filter(
          (t: Task) => `task-${t.id}` !== active.id
        );
        const targetCol = over.id as keyof Tasks;
        return {
          ...prev,
          [sourceCol]: newSource,
          [targetCol]: [...prev[targetCol], task],
        };
      });
    }
    setActiveTask(null);
  }

  function handleDragCancel(): void {
    setActiveTask(null);
  }

  return {
    columns,
    activeTask,
    handleDragStart,
    handleDragEnd,
    handleDragCancel,
  };
}
