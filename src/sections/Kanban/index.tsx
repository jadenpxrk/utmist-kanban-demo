"use client";

import * as React from "react";

import { Check, Filter, Search } from "lucide-react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ClientOnly } from "@/components/common/client-only";
import { CreateIssueDialog } from "@/sections/Kanban/CreateIssueDialog";
// Custom components
import { DroppableColumn } from "@/sections/Kanban/DroppableColumn";
import { Input } from "@/components/ui/input";
import { ShareProjectDialog } from "@/sections/Kanban/ShareProjectDialog";
import { TaskCard } from "@/sections/Kanban/TaskCard";
// Custom hooks
import { useKanban } from "@/hooks/use-kanban";

export default function Kanban() {
  const {
    columns,
    activeTask,
    handleDragStart,
    handleDragEnd,
    handleDragCancel,
  } = useKanban();

  const sensors = useSensors(useSensor(PointerSensor));

  return (
    <div className="flex flex-col gap-6">
      <header>
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Kanban Board</h1>
          <div className="flex items-center gap-2 bg-utmist-accent px-3 py-1 rounded-md">
            <Check className="h-4 w-4 text-utmist" />
            <span className="text-sm text-utmist">Saved</span>
          </div>
        </div>
      </header>

      <div className="flex justify-between items-center gap-4">
        <div className="relative min-w-[300px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input className="pl-9" placeholder="Search issues..." />
        </div>
        <div className="flex items-center gap-2">
          <CreateIssueDialog />
          <Select>
            <SelectTrigger className="w-[140px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
          <ShareProjectDialog />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6 h-[calc(100vh-220px)] w-full">
        <ClientOnly>
          <DndContext
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
          >
            <DroppableColumn id="todo" title="TO-DO" tasks={columns.todo} />
            <DroppableColumn
              id="inProgress"
              title="IN PROGRESS"
              tasks={columns.inProgress}
            />
            <DroppableColumn
              id="complete"
              title="COMPLETE"
              tasks={columns.complete}
            />
            <DragOverlay>
              {activeTask ? <TaskCard task={activeTask} /> : null}
            </DragOverlay>
          </DndContext>
        </ClientOnly>
      </div>
    </div>
  );
}
