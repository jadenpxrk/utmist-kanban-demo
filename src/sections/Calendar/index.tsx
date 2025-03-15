"use client";

import { daysInMonth, emptyStartDays } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

import DateBox from "./DateBox";
import DateSelect from "./DateSelect";
import { TaskDialog } from "./TaskDialog";
import { TaskListModal } from "./TaskListModal";

// frontend interfaces instead of Prisma types
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

interface MonthViewData {
  id: string;
  month: number;
  year: number;
  dates: DateData[];
}

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// generate sample task data for demo purposes
const generateMockTasks = (day: number): Task[] => {
  // generate 0-3 tasks randomly
  const numTasks = Math.floor(Math.random() * 4);
  const taskLabels = [
    "RED",
    "ORANGE",
    "YELLOW",
    "GREEN",
    "BLUE",
    "PURPLE",
    "PINK",
  ] as const;

  // random assignee IDs
  const assigneeIds = ["1", "2", "3", "4"];

  return Array.from({ length: numTasks }, (_, i) => ({
    id: `task-${day}-${i}`,
    text: `Task ${i + 1}`,
    label: taskLabels[Math.floor(Math.random() * taskLabels.length)],
    completed: Math.random() > 0.5,
    // random assign to 0-2 people
    assignees:
      Math.random() > 0.3
        ? Array.from(
            { length: Math.floor(Math.random() * 3) + 1 },
            () => assigneeIds[Math.floor(Math.random() * assigneeIds.length)]
          ).filter((v, i, a) => a.indexOf(v) === i) // Remove duplicates
        : undefined,
  }));
};

// generate mock calendar data
const generateMonthData = (month: number, year: number): MonthViewData => {
  const daysCount = daysInMonth(month, year);

  return {
    id: `month-${month}-${year}`,
    month,
    year,
    dates: Array.from({ length: daysCount }, (_, i) => ({
      id: `date-${month}-${year}-${i + 1}`,
      day: i + 1,
      month,
      year,
      tasks: generateMockTasks(i + 1),
    })),
  };
};

export default function Calendar() {
  // initialize with current month and year
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [year, setYear] = useState(today.getFullYear());

  // generate mock view data whenever month or year changes
  const [view, setView] = useState<MonthViewData>(
    generateMonthData(month, year)
  );

  // task dialog state
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<{
    day: number;
    month: number;
    year: number;
  } | null>(null);

  // task list modal state
  const [isTaskListModalOpen, setIsTaskListModalOpen] = useState(false);
  const [selectedTasksDate, setSelectedTasksDate] = useState<{
    day: number;
    month: number;
    year: number;
  } | null>(null);
  const [tasksForDay, setTasksForDay] = useState<Task[]>([]);

  useEffect(() => {
    setView(generateMonthData(month, year));
  }, [month, year]);

  const start = emptyStartDays(month, year);
  const mid = daysInMonth(month, year);

  // calculate if we need 5 or 6 rows
  const totalDaysDisplayed = start + mid;
  const needsSixRows = totalDaysDisplayed > 35;

  // calculate end cells based on whether we need 5 or 6 rows
  const totalCells = needsSixRows ? 42 : 35; // Either 7x6 or 7x5
  const end = totalCells - totalDaysDisplayed;

  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const eventHandler = (e: MouseEvent) => {
      const bounds = calendarRef.current?.getBoundingClientRect();
      if (bounds) {
        const x = e.clientX - bounds.left;
        const y = e.clientY - bounds.top;

        calendarRef.current?.style.setProperty("--mouse-x", x + "px");
        calendarRef.current?.style.setProperty("--mouse-y", y + "px");
      }
    };
    window.addEventListener("mousemove", eventHandler);

    return () => {
      window.removeEventListener("mousemove", eventHandler);
    };
  }, []);

  const handleDateChange = (newMonth: number, newYear: number) => {
    setMonth(newMonth);
    setYear(newYear);
  };

  const handleAddTask = (day: number, month: number, year: number) => {
    setSelectedDate({ day, month, year });
    setIsDialogOpen(true);
  };

  const handleViewAllTasks = (day: number, month: number, year: number) => {
    const dateData = view.dates.find((d) => d.day === day);
    setSelectedTasksDate({ day, month, year });
    setTasksForDay(dateData?.tasks || []);
    setIsTaskListModalOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedDate(null);
  };

  const handleCloseTaskListModal = () => {
    setIsTaskListModalOpen(false);
    setSelectedTasksDate(null);
  };

  const handleCreateTask = (task: Omit<Task, "id" | "completed">) => {
    if (!selectedDate) return;

    // new task with a unique ID
    const newTask: Task = {
      id: `task-${selectedDate.day}-${Date.now()}`,
      text: task.text,
      label: task.label,
      completed: false,
      assignees: task.assignees,
    };

    // update view with the new task
    setView((prevView) => {
      // clone current view
      const newView = { ...prevView };

      // find date to update
      const dateIndex = newView.dates.findIndex(
        (d) => d.day === selectedDate.day
      );

      if (dateIndex !== -1) {
        // new array of dates
        newView.dates = [...newView.dates];

        // new date object with the updated tasks
        newView.dates[dateIndex] = {
          ...newView.dates[dateIndex],
          tasks: [...newView.dates[dateIndex].tasks, newTask],
        };
      }

      return newView;
    });
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <DateSelect month={month} year={year} onDateChange={handleDateChange} />
      </div>
      <div
        ref={calendarRef}
        className="mt-2 z-10 w-full calendar flex-grow relative overflow-hidden flex flex-col gap-[1px] bg-accent p-[1px]"
      >
        <div className="w-full gap-[1px] grid grid-cols-7 overflow-hidden">
          {weekDays.map((day) => (
            <div
              key={day}
              className="py-3 font-medium bg-background text-neutral-600 w-full text-center"
            >
              {day}
            </div>
          ))}
        </div>
        <div
          className={`w-full gap-[1px] flex-grow grid grid-cols-7 ${
            needsSixRows ? "grid-rows-6" : "grid-rows-5"
          } overflow-hidden`}
        >
          {start > 0 && (
            <>
              {[...Array(start).keys()].map((_, i) => (
                <DateBox empty={true} key={`start-${i}`} />
              ))}
            </>
          )}
          {mid > 0 && (
            <>
              {[...Array(mid).keys()].map((_, i) => (
                <DateBox
                  key={`mid-${i}`}
                  empty={false}
                  data={
                    view.dates.find((d) => d.day === i + 1) || {
                      id: `date-${month}-${year}-${i + 1}`,
                      day: i + 1,
                      month,
                      year,
                      tasks: [],
                    }
                  }
                  day={i + 1}
                  month={month}
                  year={year}
                  onAddTask={handleAddTask}
                  onViewAllTasks={handleViewAllTasks}
                />
              ))}
            </>
          )}
          {end > 0 && (
            <>
              {[...Array(end).keys()].map((_, i) => (
                <DateBox empty={true} key={`end-${i}`} />
              ))}
            </>
          )}
        </div>
      </div>

      <TaskDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onAddTask={handleCreateTask}
        selectedDate={selectedDate}
      />

      <TaskListModal
        isOpen={isTaskListModalOpen}
        onClose={handleCloseTaskListModal}
        date={selectedTasksDate}
        tasks={tasksForDay}
      />
    </div>
  );
}
