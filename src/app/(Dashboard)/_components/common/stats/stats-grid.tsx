import { cn } from "@/lib/utils";
import type { StatItem } from "@/types";
import { StatCardSkeleton } from "../../citizen/overview/stat-card-skeleton";
import { StatCard } from "./stats-card";

type StatsGridProps = {
  stats: StatItem[];
  isPending?: boolean;
  label?: string;
  className?: string;
  gridCount?: number;
};

const gridColumns: Record<number, string> = {
  2: "xl:grid-cols-2",
  3: "xl:grid-cols-3",
  4: "xl:grid-cols-4",
};

export function StatsGrid({
  gridCount,
  stats,
  isPending = false,
  label = "Statistics",
  className,
}: StatsGridProps) {
  return (
    <section
      aria-label={label}
      className={cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-2",
        gridColumns[gridCount ?? 4],
        className,
      )}
    >
      {isPending
        ? stats.map((stat) => <StatCardSkeleton key={stat.label} />)
        : stats.map((stat) => <StatCard key={stat.label} {...stat} />)}
    </section>
  );
}
