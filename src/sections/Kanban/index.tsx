"use client";

import * as React from "react";
import { useState } from "react";
import {
  DndContext,
  DragOverlay,
  useSensors,
  useSensor,
  PointerSensor,
  type DragStartEvent,
  type DragEndEvent,
} from "@dnd-kit/core";
import { Input } from "@/components/ui/input";
import { Filter, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { KanbanColumn } from "./KanbanColumn";
import { TaskCard } from "./TaskCard";
import { CreateIssueDialog } from "./CreateIssueDialog";
import { ShareProjectDialog } from "./ShareProjectDialog";
import { KanbanHeader } from "./KanbanHeader";

import { Task, Tasks } from "./types";

// Dummy data for tasks
const initialTasks: Tasks = {
  todo: [
    {
      id: 1,
      title: "Implement authentication",
      type: "Feature",
      priority: "high",
      assignee: {
        image: "/avatars/01.png",
        name: "JD",
      },
    },
    {
      id: 4,
      title: "Research API integrations",
      type: "Research",
      priority: "medium",
      assignee: {
        image: "/avatars/05.png",
        name: "TZ",
      },
    },
  ],
  inProgress: [
    {
      id: 2,
      title: "Design system updates",
      type: "Design",
      priority: "medium",
      assignee: {
        image: "/avatars/02.png",
        name: "AS",
      },
    },
    {
      id: 5,
      title: "Mobile responsiveness",
      type: "Feature",
      priority: "high",
      assignee: {
        image: "/avatars/04.png",
        name: "JP",
      },
    },
  ],
  complete: [
    {
      id: 3,
      title: "Bug fixes in login",
      type: "Bug",
      priority: "low",
      assignee: {
        image: "/avatars/03.png",
        name: "RK",
      },
    },
    {
      id: 6,
      title: "Documentation update",
      type: "Documentation",
      priority: "low",
      assignee: {
        image: "/avatars/01.png",
        name: "JD",
      },
    },
  ],
};

export function KanbanBoard() {
  const [columns, setColumns] = useState<Tasks>(initialTasks);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");

  const sensors = useSensors(useSensor(PointerSensor));

  // Filter tasks based on search query and priority
  const filteredTasks = React.useMemo(() => {
    return Object.entries(columns).reduce<Tasks>(
      (filtered, [key, tasks]) => {
        const filteredColumnTasks = tasks.filter((task: Task) => {
          const matchesSearch =
            searchQuery === "" ||
            task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.type.toLowerCase().includes(searchQuery.toLowerCase());

          const matchesPriority =
            priorityFilter === "all" || task.priority === priorityFilter;

          return matchesSearch && matchesPriority;
        });

        return {
          ...filtered,
          [key]: filteredColumnTasks,
        };
      },
      { todo: [], inProgress: [], complete: [] }
    );
  }, [columns, searchQuery, priorityFilter]);

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
      setColumns((prev: Tasks) => {
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

  return (
    <div className="h-full w-full">
      <KanbanHeader />

      {/* Controls */}
      <div className="mb-6 flex items-center gap-4">
        <div className="relative w-[300px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Search issues..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <CreateIssueDialog />
        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
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

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        {/* Kanban Columns */}
        <div className="grid grid-cols-3 gap-6 h-[calc(100vh-220px)]">
          <KanbanColumn id="todo" title="TO-DO" tasks={filteredTasks.todo} />
          <KanbanColumn
            id="inProgress"
            title="IN PROGRESS"
            tasks={filteredTasks.inProgress}
          />
          <KanbanColumn
            id="complete"
            title="COMPLETE"
            tasks={filteredTasks.complete}
          />
        </div>

        <DragOverlay>
          {activeTask ? <TaskCard task={activeTask} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
