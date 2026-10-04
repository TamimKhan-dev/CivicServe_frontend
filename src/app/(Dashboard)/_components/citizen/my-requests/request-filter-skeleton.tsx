import { Skeleton } from "@/components/ui/skeleton";

export function RequestFiltersSkeleton() {
  return (
    <div
      className="flex flex-col gap-3 rounded-2xl bg-white p-3 shadow-sm sm:p-4 lg:flex-row lg:items-center"
      aria-hidden
    >
      {/* Search */}
      <Skeleton className="h-11 w-full rounded-md lg:w-72 lg:shrink-0" />

      {/* Selects */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:flex-1">
        <Skeleton className="h-11 w-full rounded-md" />
        <Skeleton className="h-11 w-full rounded-md" />
        <Skeleton className="h-11 w-full rounded-md" />
      </div>
    </div>
  );
}
