import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function TicketTimelineSkeleton() {
  return (
    <Card className="gap-0 rounded-2xl bg-white py-0 shadow-xl">
      <CardContent className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4 border-b pb-5">
          <div className="w-full space-y-3">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-7 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
          <Skeleton className="size-11 rounded-xl" />
        </div>
        <Skeleton className="mt-5 h-10 w-full rounded-lg" />
        <div className="mt-6 space-y-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton className="size-8 shrink-0 rounded-full" />
              <Skeleton className="h-16 w-full rounded-xl" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
