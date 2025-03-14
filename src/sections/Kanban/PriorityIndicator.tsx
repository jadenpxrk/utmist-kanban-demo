"use client";

import { PriorityIndicatorProps } from "@/types/kanban";

export function PriorityIndicator({ priority }: PriorityIndicatorProps) {
  const bars = {
    low: ["bg-accent-foreground", "bg-muted-foreground", "bg-muted-foreground"],
    medium: [
      "bg-accent-foreground",
      "bg-accent-foreground",
      "bg-muted-foreground",
    ],
    high: [
      "bg-accent-foreground",
      "bg-accent-foreground",
      "bg-accent-foreground",
    ],
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
