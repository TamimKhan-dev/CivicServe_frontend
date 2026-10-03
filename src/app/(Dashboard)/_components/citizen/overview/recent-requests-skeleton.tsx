import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

const ROW_COUNT = 3;

export function RequestRowsSkeleton({ count = ROW_COUNT }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <TableRow key={i} aria-hidden className="hover:bg-transparent">
          <TableCell className="py-4 pl-6">
            <div className="flex items-center gap-3">
              <Skeleton className="size-9 shrink-0 rounded-lg" />
              <Skeleton className="h-4 w-44" />
            </div>
          </TableCell>
          <TableCell className="px-4">
            <Skeleton className="h-3.5 w-40" />
          </TableCell>
          <TableCell className="px-4">
            <Skeleton className="h-4 w-24" />
          </TableCell>
          <TableCell className="px-4">
            <Skeleton className="h-4 w-32" />
          </TableCell>
          <TableCell className="px-4">
            <Skeleton className="h-6 w-20 rounded-full" />
          </TableCell>
          <TableCell className="px-4 pr-6">
            <Skeleton className="ml-auto h-4 w-24" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}

/** Mobile: render inside the <ul> while loading. */
export function RequestListSkeleton({ count = ROW_COUNT }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <li key={i} aria-hidden className="space-y-3 p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <Skeleton className="size-9 shrink-0 rounded-lg" />
              <Skeleton className="h-4 w-40" />
            </div>
            <Skeleton className="h-6 w-20 shrink-0 rounded-full" />
          </div>
          <Skeleton className="h-3.5 w-56 max-w-full" />
          <Skeleton className="h-4 w-24" />
        </li>
      ))}
    </>
  );
}
