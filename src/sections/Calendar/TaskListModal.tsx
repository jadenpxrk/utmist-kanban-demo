"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { ScrollArea } from "@/components/ui/scroll-area";
import { User } from "lucide-react";

// types
interface Task {
  id: string;
  text: string;
  label: "RED" | "ORANGE" | "YELLOW" | "GREEN" | "BLUE" | "PURPLE" | "PINK";
  completed: boolean;
  assignees?: string[];
}

interface Assignee {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
}

interface TaskListModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: {
    day: number;
    month: number;
    year: number;
  } | null;
  tasks: Task[];
}

// Sample assignees - db this in actual
const sampleAssignees: Assignee[] = [
  { id: "1", name: "John Doe", email: "john@example.com" },
  { id: "2", name: "Jane Smith", email: "jane@example.com" },
  { id: "3", name: "Bob Johnson", email: "bob@example.com" },
  { id: "4", name: "Alice Williams", email: "alice@example.com" },
];

const labelColors = {
  RED: "bg-red-500",
  ORANGE: "bg-orange-500",
  YELLOW: "bg-yellow-500",
  GREEN: "bg-green-500",
  BLUE: "bg-blue-500",
  PURPLE: "bg-purple-500",
  PINK: "bg-pink-500",
};

export function TaskListModal({
  isOpen,
  onClose,
  date,
  tasks,
}: TaskListModalProps) {
  if (!date) return null;

  const formatDate = (day: number, month: number, year: number) => {
    const monthName = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ][month - 1];

    return `${monthName} ${day}, ${year}`;
  };

  // from id
  const getAssigneeNames = (assigneeIds?: string[]) => {
    if (!assigneeIds || assigneeIds.length === 0) return "Unassigned";

    return assigneeIds
      .map((id) => sampleAssignees.find((a) => a.id === id)?.name || id)
      .join(", ");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>
            Tasks for {formatDate(date.day, date.month, date.year)}
          </DialogTitle>
          <DialogDescription>
            {tasks.length === 0
              ? "No tasks scheduled for this day."
              : `${tasks.length} task${
                  tasks.length !== 1 ? "s" : ""
                } scheduled.`}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="mt-4 max-h-[350px]">
          <div className="space-y-3 px-1">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-start p-3 rounded-md border border-border bg-card w-full mx-auto"
              >
                <div
                  className={`w-2 h-full min-h-[2.5rem] rounded-full mr-3 ${
                    labelColors[task.label]
                  }`}
                ></div>
                <div className="flex-1">
                  <div className="font-medium">{task.text}</div>
                  <div className="flex items-center mt-2 text-sm text-muted-foreground">
                    <User className="h-3.5 w-3.5 mr-1.5" />
                    <span>{getAssigneeNames(task.assignees)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
