import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function StatCardSkeleton() {
  return (
    <Card className="gap-0 rounded-2xl bg-white py-0 shadow-sm" aria-hidden>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <Skeleton className="h-3.5 w-24" />
          <Skeleton className="size-9 rounded-lg" />
        </div>
        <Skeleton className="mt-4 h-9 w-16 sm:h-10" />
        <Skeleton className="mt-2 h-4 w-40 max-w-full" />
      </CardContent>
    </Card>
  );
}
