"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PlusCircle, User } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "@/components/ui/multi-select";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface Assignee {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
}

interface Task {
  id: string;
  text: string;
  label: "RED" | "ORANGE" | "YELLOW" | "GREEN" | "BLUE" | "PURPLE" | "PINK";
  completed: boolean;
  assignees?: string[]; // Updated to support multiple assignees
}

interface TaskDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (task: Omit<Task, "id" | "completed">) => void;
  selectedDate: {
    day: number;
    month: number;
    year: number;
  } | null;
}

const labelColors = {
  RED: "bg-red-500",
  ORANGE: "bg-orange-500",
  YELLOW: "bg-yellow-500",
  GREEN: "bg-green-500",
  BLUE: "bg-blue-500",
  PURPLE: "bg-purple-500",
  PINK: "bg-pink-500",
};

const labelNames = {
  RED: "Red",
  ORANGE: "Orange",
  YELLOW: "Yellow",
  GREEN: "Green",
  BLUE: "Blue",
  PURPLE: "Purple",
  PINK: "Pink",
};

// Sample assignees - db this in actual
const sampleAssignees: Assignee[] = [
  { id: "1", name: "John Doe", email: "john@example.com" },
  { id: "2", name: "Jane Smith", email: "jane@example.com" },
  { id: "3", name: "Bob Johnson", email: "bob@example.com" },
  { id: "4", name: "Alice Williams", email: "alice@example.com" },
];

// formatting
const assigneeOptions = sampleAssignees.map((assignee) => ({
  label: assignee.name,
  value: assignee.id,
  icon: User,
}));

export function TaskDialog({
  isOpen,
  onClose,
  onAddTask,
  selectedDate,
}: TaskDialogProps) {
  const [taskText, setTaskText] = useState("");
  const [taskLabel, setTaskLabel] = useState<Task["label"]>("BLUE");
  const [assigneeIds, setAssigneeIds] = useState<string[]>([]);

  if (!selectedDate) return null;

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (taskText.trim()) {
      onAddTask({
        text: taskText,
        label: taskLabel,
        assignees: assigneeIds.length > 0 ? assigneeIds : undefined,
      });

      // clean up
      setTaskText("");
      setTaskLabel("BLUE");
      setAssigneeIds([]);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Task</DialogTitle>
            <DialogDescription>
              Create a new task for{" "}
              {formatDate(
                selectedDate.day,
                selectedDate.month,
                selectedDate.year
              )}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="task">Task</Label>
              <Input
                id="task"
                placeholder="Enter task description"
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
                className="col-span-3"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="label">Label</Label>
              <Select
                value={taskLabel}
                onValueChange={(value) => setTaskLabel(value as Task["label"])}
              >
                <SelectTrigger id="label" className="w-full">
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "h-3 w-3 rounded-full",
                        labelColors[taskLabel]
                      )}
                    />
                    <span>{labelNames[taskLabel]}</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="RED">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-red-500" />
                      <span>Red</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="ORANGE">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-orange-500" />
                      <span>Orange</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="YELLOW">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-yellow-500" />
                      <span>Yellow</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="GREEN">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-green-500" />
                      <span>Green</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="BLUE">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-blue-500" />
                      <span>Blue</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="PURPLE">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-purple-500" />
                      <span>Purple</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="PINK">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-pink-500" />
                      <span>Pink</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="assignees">Assignees</Label>
              <MultiSelect
                options={assigneeOptions}
                onValueChange={setAssigneeIds}
                placeholder="Select assignees..."
                defaultValue={[]}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="submit">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Task
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
