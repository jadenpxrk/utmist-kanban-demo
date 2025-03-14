import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function KanbanSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <header>
        <div className="flex items-center gap-4 mb-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-6 w-24 rounded-md" />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-10 w-32" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </header>

      {/* Kanban Board Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {Array.from({ length: 3 }).map((_, colIndex) => (
          <div key={colIndex} className="flex flex-col gap-2">
            <div className="flex items-center justify-between mb-2">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-8 rounded-full" />
            </div>

            {Array.from({
              length: colIndex === 1 ? 3 : colIndex === 0 ? 4 : 2,
            }).map((_, i) => (
              <Card key={i} className="p-4 mb-3">
                <div className="space-y-3">
                  <Skeleton className="h-5 w-4/5" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-3/4" />
                  <div className="flex justify-between items-center pt-2">
                    <div className="flex gap-2">
                      <Skeleton className="h-6 w-6 rounded-full" />
                      <Skeleton className="h-6 w-16" />
                    </div>
                    <Skeleton className="h-5 w-16" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
