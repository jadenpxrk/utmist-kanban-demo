import { Skeleton } from "@/components/ui/skeleton";

export function DashboardSkeleton() {
  return (
    <div className="w-full">
      <Skeleton className="h-8 w-3/4 max-w-md mb-6" />
      <div className="space-y-8">
        <Skeleton className="h-[200px] w-full" />
        <Skeleton className="h-[300px] w-full" />
        <Skeleton className="h-[150px] w-full" />
      </div>
    </div>
  );
}
