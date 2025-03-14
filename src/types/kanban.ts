export interface Task {
  id: number;
  title: string;
  type: string;
  priority: "low" | "medium" | "high";
  assignee: {
    image: string;
    name: string;
  };
}

export interface Tasks {
  todo: Task[];
  inProgress: Task[];
  complete: Task[];
}

export interface DroppableColumnProps {
  id: keyof Tasks;
  title: string;
  tasks: Task[];
}

export interface DraggableTaskProps {
  task: Task;
  column: keyof Tasks;
}

export interface TaskCardProps {
  task: Task;
}

export interface PriorityIndicatorProps {
  priority: "low" | "medium" | "high";
}

export interface Assignee {
  id: number;
  name: string;
  image: string;
}

export interface Person {
  id: number;
  name: string;
  email: string;
}
