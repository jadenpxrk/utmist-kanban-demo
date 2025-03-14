export interface Task {
  id: number;
  title: string;
  type: string;
  priority: "low" | "medium" | "high";
  assignee: {
    image: string;
    name: string;
  }[];
  start: Date;
  end: Date;
}

export interface GanttChartProps {
  tasks: Task[];
}
