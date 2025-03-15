import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// calendar utility functions
export function daysInMonth(month: number, year: number): number {
  return new Date(year, month, 0).getDate();
}

export function emptyStartDays(month: number, year: number): number {
  return new Date(year, month - 1, 1).getDay();
}

export function emptyEndDays(
  daysInMonth: number,
  emptyStartDays: number
): number {
  // Default: grid of 5 rows
  const totalCells = 35; // 7 columns x 5 rows

  // Calculate the end days
  const endDays = totalCells - daysInMonth - emptyStartDays;

  // Return non-negative number
  return Math.max(0, endDays);
}

export const ganttChartDataGenerator = (n: number, durationInDays: number) => {
  interface Task {
    id: number;
    item: string;
    start_date: string;
    end_date: string;
    track?: number;
  }

  const data: Task[] = [];
  const startDate = new Date();
  const endDate = new Date(
    startDate.getTime() + durationInDays * 24 * 60 * 60 * 1000
  );

  const getRandomDate = (start: Date, end: Date) => {
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
  };

  const getRandomDuration = (minDays: number, maxDays: number) => {
    return Math.floor(Math.random() * (maxDays - minDays + 1) + minDays);
  };

  const taskTypes = [
    "Research",
    "Design",
    "Development",
    "Testing",
    "Documentation",
    "Review",
    "Deployment",
    "Marketing",
  ];

  const taskSubjects = [
    "Frontend",
    "Backend",
    "Database",
    "API",
    "UI/UX",
    "Security",
    "Performance",
    "Analytics",
  ];

  const getTaskName = () => {
    const type = taskTypes[Math.floor(Math.random() * taskTypes.length)];
    const subject =
      taskSubjects[Math.floor(Math.random() * taskSubjects.length)];
    return `${type} - ${subject}`;
  };

  // Generate tasks without y-position first
  const unsortedTasks: Task[] = [];
  for (let i = 0; i < n; i++) {
    const taskDuration = getRandomDuration(
      5,
      Math.max(14, Math.floor(durationInDays / 8))
    );
    const start = getRandomDate(
      startDate,
      new Date(endDate.getTime() - taskDuration * 24 * 60 * 60 * 1000)
    );
    const end = new Date(start.getTime() + taskDuration * 24 * 60 * 60 * 1000);

    unsortedTasks.push({
      id: i + 1,
      item: getTaskName(),
      start_date: start.toISOString(),
      end_date: end.toISOString(),
    });
  }

  // sort by start date
  const sortedTasks = [...unsortedTasks].sort(
    (a, b) =>
      new Date(a.start_date).valueOf() - new Date(b.start_date).valueOf()
  );

  // allocate tracks to prevent overlapping
  const tracks: { end: number }[] = [];

  sortedTasks.forEach((task) => {
    const taskStart = new Date(task.start_date).valueOf();

    // find first available track
    let trackIndex = 0;
    while (trackIndex < tracks.length) {
      if (tracks[trackIndex].end <= taskStart) {
        break;
      }
      trackIndex++;
    }

    // create new track if needed
    if (trackIndex === tracks.length) {
      tracks.push({ end: 0 });
    }

    // update track end time and add task with track number
    tracks[trackIndex].end = new Date(task.end_date).valueOf();
    data.push({
      ...task,
      track: trackIndex,
    });
  });

  return data;
};
