"use client";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Plus, User } from "lucide-react";

// frontend interfaces to replace Prisma types
interface Task {
  id: string;
  text: string;
  label: "RED" | "ORANGE" | "YELLOW" | "GREEN" | "BLUE" | "PURPLE" | "PINK";
  completed: boolean;
  assignees?: string[];
}

interface DateData {
  id: string;
  day: number;
  month: number;
  year: number;
  tasks: Task[];
}

type emptyT = {
  empty: true;
};

type dayT = {
  empty: false;
  day: number;
  data: DateData;
  month: number;
  year: number;
  onAddTask?: (day: number, month: number, year: number) => void;
  onViewAllTasks?: (day: number, month: number, year: number) => void;
};

const labelColors = {
  RED: "absolute left-0 top-0 w-1 h-full bg-red-500",
  ORANGE: "absolute left-0 top-0 w-1 h-full bg-orange-500",
  YELLOW: "absolute left-0 top-0 w-1 h-full bg-yellow-500",
  GREEN: "absolute left-0 top-0 w-1 h-full bg-green-500",
  BLUE: "absolute left-0 top-0 w-1 h-full bg-blue-500",
  PURPLE: "absolute left-0 top-0 w-1 h-full bg-purple-500",
  PINK: "absolute left-0 top-0 w-1 h-full bg-pink-500",
};

export default function DateBox(props: emptyT | dayT) {
  if (props.empty === true) {
    return <div className="w-full h-full bg-background"></div>;
  }

  const { day, data, month, year, onAddTask, onViewAllTasks } = props;
  const tasks = data?.tasks ?? [];

  const handleAddTask = (e: React.MouseEvent) => {
    e.preventDefault();
    onAddTask?.(day, month, year);
  };

  const handleViewAllTasks = (e: React.MouseEvent) => {
    e.preventDefault();
    onViewAllTasks?.(day, month, year);
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="w-full h-full flex flex-col duration-150 group cursor-default justify-between items-start bg-background md:p-2 sm:p-1.5 xs:p-1 p-0.5">
          <div className="text-center font-medium mb-3 duration-150 group-hover:text-neutral-400 text-neutral-600 text-sm">
            {day}
          </div>
          <div className="w-full space-y-0.5 min-h-[40px] whitespace-nowrap overflow-hidden text-ellipsis">
            {tasks.length > 0 ? (
              <>
                {tasks.slice(0, 2).map((task, i) => (
                  <div
                    key={`event-${i}`}
                    className="w-full rounded overflow-hidden relative pr-1 pl-2 py-0.5 bg-muted text-xs group/task"
                  >
                    <div className={labelColors[task.label]} />
                    <div className="flex justify-between items-center">
                      <span className="truncate max-w-[80%]">{task.text}</span>
                      {task.assignees && task.assignees.length > 0 && (
                        <span className="ml-1 flex-shrink-0 flex items-center">
                          <User className="h-2.5 w-2.5 text-muted-foreground inline-block" />
                          {task.assignees.length > 1 && (
                            <span className="text-[9px] text-muted-foreground ml-0.5 leading-none">
                              {task.assignees.length}
                            </span>
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
                {tasks.length > 2 ? (
                  <div className="w-full rounded px-1 py-0.5 text-neutral-400 bg-muted text-xs">
                    + {tasks.length - 2} more
                  </div>
                ) : null}
              </>
            ) : null}
          </div>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={handleAddTask} className="cursor-pointer">
          <Plus className="h-3.5 w-3.5 mr-1.5" />
          Add task
        </ContextMenuItem>
        {tasks.length > 0 && (
          <>
            <ContextMenuSeparator />
            <ContextMenuItem
              onClick={handleViewAllTasks}
              className="cursor-pointer"
            >
              View all tasks
            </ContextMenuItem>
          </>
        )}
      </ContextMenuContent>
    </ContextMenu>
  );
}
