"use client";

import { GanttChart } from "@/sections/Gantt";

export default function GanttPage() {
  return (
    <main className="h-full w-full p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Gantt Chart</h1>
        <p className="text-muted-foreground">
          View and manage project timeline
        </p>
      </div>

      <GanttChart />
    </main>
  );
}
