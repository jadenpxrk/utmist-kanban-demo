"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { PriorityIndicator } from "./PriorityIndicator";
import { TaskCardProps } from "@/types/kanban";

export function TaskCard({ task }: TaskCardProps) {
  return (
    <div className="bg-accent-foreground/5 p-3 rounded-lg shadow-sm mb-3">
      <h4 className="font-medium mb-2">{task.title}</h4>
      <div className="flex justify-between items-end">
        <div className="flex items-center gap-2">
          <span className="text-xs px-2 py-1 bg-muted rounded">
            {task.type}
          </span>
          <PriorityIndicator priority={task.priority} />
        </div>
        <Avatar className="h-8 w-8">
          <AvatarImage src={task.assignee.image} />
          <AvatarFallback>{task.assignee.name}</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
