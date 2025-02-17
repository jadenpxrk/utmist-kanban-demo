"use client";

import * as React from "react";
import { useState } from "react";
import {
  DndContext,
  DragOverlay,
  useSensors,
  useSensor,
  PointerSensor,
  useDraggable,
  useDroppable,
  type DragStartEvent,
  type DragEndEvent,
  type DragCancelEvent,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check, Filter, Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AppSidebar } from "@/components/base/app-sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarInset } from "@/components/ui/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-dropdown-menu";

// Types
interface Task {
  id: number;
  title: string;
  type: string;
  priority: "low" | "medium" | "high";
  assignee: {
    image: string;
    name: string;
  };
}

interface Tasks {
  todo: Task[];
  inProgress: Task[];
  complete: Task[];
}

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
  ],
};

export default function KanbanBoard() {
  const [columns, setColumns] = useState<Tasks>(initialTasks);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [selectedAssignees, setSelectedAssignees] = useState<
    Array<{ id: number; name: string; image: string }>
  >([]);
  const placeholderAssignees = [
    { id: 1, name: "John Doe", image: "/avatars/01.png" },
    { id: 2, name: "Alice Smith", image: "/avatars/02.png" },
    { id: 3, name: "Robert King", image: "/avatars/03.png" },
    { id: 4, name: "Jaden Park", image: "/avatars/04.png" },
    { id: 5, name: "Tom Zhang", image: "/avatars/05.png" },
  ];
  const dummyPeople = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Alice Smith", email: "alice@example.com" },
    { id: 3, name: "Robert King", email: "robert@example.com" },
    { id: 4, name: "Mary Johnson", email: "mary@example.com" },
    { id: 5, name: "James Brown", email: "james@example.com" },
  ];
  const [assigneeSearch, setAssigneeSearch] = useState("");
  const filteredAssignees = placeholderAssignees.filter((assignee) =>
    assignee.name.toLowerCase().includes(assigneeSearch.toLowerCase())
  );

  // NEW: Add peopleSearch state and filteredPeople filter
  const [peopleSearch, setPeopleSearch] = useState("");
  const filteredPeople = dummyPeople.filter(
    (person) =>
      person.name.toLowerCase().includes(peopleSearch.toLowerCase()) ||
      person.email.toLowerCase().includes(peopleSearch.toLowerCase())
  );

  const sensors = useSensors(useSensor(PointerSensor));

  function handleDragStart(event: DragStartEvent): void {
    const { active } = event;
    setActiveTask(active.data.current.task);
  }

  function handleDragEnd(event: DragEndEvent): void {
    const { active, over } = event;
    if (over && active.data.current.column !== over.id) {
      setColumns((prev) => {
        const sourceCol = active.data.current.column;
        const task = active.data.current.task as Task;
        const newSource = prev[sourceCol].filter(
          (t) => `task-${t.id}` !== active.id
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

  function handleDragCancel(event: DragCancelEvent): void {
    setActiveTask(null);
  }

  return (
    <div className="h-screen grid lg:grid-cols-[280px_1fr]">
      {/* Sidebar */}
      <SidebarProvider>
        <AppSidebar />
      </SidebarProvider>

      <SidebarInset>
        {/* Main Content */}
        <main className="h-full p-6">
          {/* Header */}
          <header className="mb-6">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold">Kanban Board</h1>
              <div className="flex items-center gap-2 bg-blue-100 px-3 py-1 rounded-md">
                <Check className="h-4 w-4 text-[#0133a0]" />
                <span className="text-sm text-[#0133a0]">Saved</span>
              </div>
            </div>
          </header>

          {/* Controls */}
          <div className="mb-6 flex items-center gap-4">
            <div className="relative w-[300px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input className="pl-9" placeholder="Search issues..." />
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-[#0133a0] hover:bg-[#0133a0]/90">
                  Create Issue
                </Button>
              </DialogTrigger>
              <DialogContent className="w-full max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Issue</DialogTitle>
                </DialogHeader>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Left Column: Title and Description */}
                    <div className="flex flex-col h-full gap-4">
                      <div>
                        <Label
                          id="issueTitle"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Issue Title
                        </Label>
                        <Input
                          id="issueTitle"
                          placeholder="Enter issue title"
                          className="mt-1"
                        />
                      </div>
                      <div className="flex-1 flex flex-col">
                        <Label
                          id="issueDescription"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Description
                        </Label>
                        <Textarea
                          id="issueDescription"
                          placeholder="Enter issue description"
                          className="mt-1 flex-1 w-full p-2 border rounded"
                        />
                      </div>
                    </div>
                    {/* Right Column: Priority, Assignees, and Date */}
                    <div className="space-y-4">
                      <div>
                        <Label
                          id="issuePriority"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Priority
                        </Label>
                        <Select>
                          <SelectTrigger id="issuePriority" className="mt-1">
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="block text-sm font-medium text-gray-700">
                          Assignees
                        </Label>
                        <div className="relative w-full mt-1">
                          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                          <Input
                            value={assigneeSearch}
                            onChange={(e) => setAssigneeSearch(e.target.value)}
                            placeholder="Search assignees..."
                            className="pl-9"
                          />
                        </div>
                        <div className="flex flex-col gap-2 mt-2 h-40 overflow-y-auto">
                          {filteredAssignees.map((assignee) => (
                            <div
                              key={assignee.id}
                              onClick={() => {
                                if (
                                  selectedAssignees.some(
                                    (a) => a.id === assignee.id
                                  )
                                ) {
                                  setSelectedAssignees(
                                    selectedAssignees.filter(
                                      (a) => a.id !== assignee.id
                                    )
                                  );
                                } else {
                                  setSelectedAssignees([
                                    ...selectedAssignees,
                                    assignee,
                                  ]);
                                }
                              }}
                              className={`cursor-pointer p-2 rounded border ${
                                selectedAssignees.some(
                                  (a) => a.id === assignee.id
                                )
                                  ? "border-blue-500 bg-blue-100 text-[#0133a0]"
                                  : "border-gray-300"
                              }`}
                            >
                              {assignee.name}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <hr className="my-2" />
                        <time
                          dateTime={new Date().toISOString()}
                          className="text-sm text-gray-500"
                        >
                          {`Created ${new Date().toLocaleDateString("en-US", {
                            month: "short",
                            day: "2-digit",
                            year: "numeric",
                          })}`}
                        </time>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      className="bg-[#0133a0] hover:bg-[#0133a0]/90"
                    >
                      Submit
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
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
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="hover:bg-gray-100">
                  Share Project
                </Button>
              </DialogTrigger>
              <DialogContent className="w-full max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Share Project</DialogTitle>
                </DialogHeader>
                <form className="space-y-4">
                  <div className="w-full flex flex-col justify-center items-start gap-2">
                    <Label className="block text-sm font-medium text-gray-700">
                      Invite by Email
                    </Label>
                    <div className="w-full flex flex-row justify-center items-center gap-2">
                      <Input placeholder="Enter email address" />
                      <Button
                        type="submit"
                        className="bg-[#0133a0] hover:bg-[#0133a0]/90"
                      >
                        Send
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label className="block text-sm font-medium text-gray-700">
                      People with Access
                    </Label>
                    <div className="relative w-full mt-1">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                      <Input
                        placeholder="Search people..."
                        value={peopleSearch}
                        onChange={(e) => setPeopleSearch(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                    <ScrollArea className="h-40 mt-2">
                      <div className="flex flex-col gap-2">
                        {filteredPeople.map((person) => (
                          <div key={person.id} className="p-2 border rounded">
                            <div className="font-medium">{person.name}</div>
                            <div className="text-xs text-gray-500">
                              {person.email}
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <DndContext
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
          >
            {/* Kanban Columns */}
            <div className="grid grid-cols-3 gap-6 h-[calc(100vh-220px)]">
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
            </div>

            <DragOverlay>
              {activeTask ? <TaskCard task={activeTask} /> : null}
            </DragOverlay>
          </DndContext>
        </main>
      </SidebarInset>
    </div>
  );
}

interface DroppableColumnProps {
  id: keyof Tasks;
  title: string;
  tasks: Task[];
}

function DroppableColumn({ id, title, tasks }: DroppableColumnProps) {
  const { setNodeRef } = useDroppable({ id });
  return (
    <div ref={setNodeRef} className="bg-gray-50 rounded-lg p-4">
      <h3 className="font-semibold mb-4">{title}</h3>
      <ScrollArea className="h-full">
        {tasks.map((task) => (
          <DraggableTask key={`task-${task.id}`} task={task} column={id} />
        ))}
      </ScrollArea>
    </div>
  );
}

interface DraggableTaskProps {
  task: Task;
  column: keyof Tasks;
}

function DraggableTask({ task, column }: DraggableTaskProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useDraggable({
      id: `task-${task.id}`,
      data: { task, column },
    });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <TaskCard task={task} />
    </div>
  );
}

interface TaskCardProps {
  task: Task;
}

function TaskCard({ task }: TaskCardProps) {
  return (
    <div className="bg-white p-3 rounded-lg shadow-sm mb-3">
      <h4 className="font-medium mb-2">{task.title}</h4>
      <div className="flex justify-between items-end">
        <div className="flex items-center gap-2">
          <span className="text-xs px-2 py-1 bg-gray-100 rounded">
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

interface PriorityIndicatorProps {
  priority: "low" | "medium" | "high";
}

function PriorityIndicator({ priority }: PriorityIndicatorProps) {
  const bars = {
    low: ["bg-gray-600", "bg-gray-300", "bg-gray-300"],
    medium: ["bg-gray-600", "bg-gray-600", "bg-gray-300"],
    high: ["bg-gray-600", "bg-gray-600", "bg-gray-600"],
  };

  return (
    <div className="flex gap-0.5 items-end h-4">
      {bars[priority].map((bg, i) => (
        <div
          key={i}
          className={`w-1 ${bg} rounded-sm`}
          style={{ height: `${(i + 1) * 4}px` }}
        />
      ))}
    </div>
  );
}
