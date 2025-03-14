import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function GanttSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <header>
        <div className="flex items-center gap-4 mb-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-6 w-24 rounded-md" />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Skeleton className="h-10 w-40" />
            <Skeleton className="h-10 w-40" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </header>

      {/* Gantt Chart Skeleton */}
      <Card className="p-4 mt-4">
        {/* Timeline header */}
        <div className="flex border-b pb-4 mb-4">
          <Skeleton className="h-6 w-48 mr-4" />
          <div className="flex-1 flex justify-between">
            {Array.from({ length: 7 }).map((_, i) => (
              <Skeleton key={i} className="h-6 w-16" />
            ))}
          </div>
        </div>

        {/* Tasks with timeline bars */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center py-4 border-b last:border-b-0"
          >
            <div className="w-48 pr-4">
              <Skeleton className="h-5 w-36 mb-1" />
              <Skeleton className="h-3 w-24" />
            </div>
            <div className="flex-1 relative h-8">
              <Skeleton
                className="absolute h-6 rounded-full"
                style={{
                  left: `${Math.floor(Math.random() * 30)}%`,
                  width: `${Math.floor(Math.random() * 50) + 20}%`,
                }}
              />
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}
