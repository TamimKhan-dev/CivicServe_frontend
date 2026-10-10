import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ServiceCardSkeleton() {
  return (
    <Card className="h-full gap-0 rounded-2xl bg-white py-0 shadow-sm">
      <CardContent className="flex h-full flex-col p-5 sm:p-6">
        {/* Icon + department badge */}
        <div className="flex items-start justify-between gap-3">
          <Skeleton className="size-10 rounded-xl" />
          <Skeleton className="h-5 w-28 rounded-full" />
        </div>

        {/* Title */}
        <Skeleton className="mt-5 h-5 w-3/4" />

        {/* Description */}
        <div className="mt-3 mb-5 space-y-2">
          <Skeleton className="h-3.5 w-full" />
          <Skeleton className="h-3.5 w-full" />
          <Skeleton className="h-3.5 w-2/3" />
        </div>

        {/* Footer: note + link */}
        <div className="mt-auto flex items-center justify-between gap-3 border-t pt-4">
          <Skeleton className="h-3.5 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
      </CardContent>
    </Card>
  );
}
