import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { LAYOUT } from "./request-gallery";

const PHOTO_IDS = ["a", "b", "c"];
const INFO_IDS = ["a", "b", "c", "d"];
const ON_PAGE = "bg-slate-200/70";

function HeaderSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className={cn("h-4 w-36", ON_PAGE)} />
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <Skeleton className={cn("h-8 w-72 max-w-full rounded-md", ON_PAGE)} />
          <Skeleton className={cn("h-8 w-24 rounded-full", ON_PAGE)} />
        </div>
        <Skeleton className={cn("h-9 w-3/5", ON_PAGE)} />
        <Skeleton className={cn("h-4 w-80 max-w-full", ON_PAGE)} />
      </div>
    </div>
  );
}

export function GallerySkeleton({ count = 1 }: { count?: 0 | 1 | 2 | 3 }) {
  const photos = PHOTO_IDS.slice(0, count);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <Skeleton className={cn("size-4", ON_PAGE)} />
        <Skeleton className={cn("h-4 w-52", ON_PAGE)} />
      </div>

      {count === 0 ? (
        <Skeleton className={cn("h-44 rounded-2xl", ON_PAGE)} />
      ) : (
        <div className={cn("grid gap-3 md:h-110", LAYOUT[count])}>
          {photos.map((id, i) => (
            <Skeleton
              key={id}
              className={cn(
                "aspect-video rounded-xl md:aspect-auto",
                count === 3 && i === 0 && "md:row-span-2",
                ON_PAGE,
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function OverviewSkeleton() {
  return (
    <Card className="gap-0 rounded-2xl bg-white p-6 shadow-sm">
      <Skeleton className="h-5 w-48" />
      <div className="mt-4 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-11/12" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      <div className="mt-6 grid gap-6 border-t pt-6 sm:grid-cols-2">
        {INFO_IDS.map((id) => (
          <div key={id} className="flex gap-3">
            <Skeleton className="size-4 shrink-0" />
            <div className="space-y-2">
              <Skeleton className="h-3 w-28" />
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function TimelineSkeleton() {
  return (
    <Card className="gap-0 rounded-2xl bg-white p-6 shadow-sm">
      <Skeleton className="h-5 w-40" />
      <div className="mt-6 space-y-8">
        {["a", "b", "c", "d"].map((id) => (
          <div key={id} className="flex gap-4">
            <Skeleton className="size-7 shrink-0 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-44" />
              <Skeleton className="h-3 w-72 max-w-full" />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function SideCardsSkeleton() {
  return (
    <>
      {/* status */}
      <Card className="gap-0 rounded-2xl bg-white p-5 shadow-sm">
        <Skeleton className="mb-4 h-3 w-28" />
        <Skeleton className="h-32 rounded-xl" />
      </Card>

      {/* assignment */}
      <Card className="gap-0 rounded-2xl bg-white p-5 shadow-sm">
        <Skeleton className="mb-4 h-3 w-36" />
        <div className="flex items-center gap-3">
          <Skeleton className="size-12 shrink-0 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-44" />
          </div>
        </div>
      </Card>

      {/* fees */}
      <Card className="gap-0 rounded-2xl bg-white p-5 shadow-sm">
        <Skeleton className="mb-4 h-3 w-40" />
        <Skeleton className="h-28 rounded-xl" />
      </Card>
    </>
  );
}

export function RequestDetailsSkeleton() {
  return (
    <div className="space-y-6" aria-busy="true">
      <HeaderSkeleton />
      <GallerySkeleton />

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          <OverviewSkeleton />
          <TimelineSkeleton />
        </div>
        <aside className="space-y-6">
          <SideCardsSkeleton />
        </aside>
      </div>
    </div>
  );
}
