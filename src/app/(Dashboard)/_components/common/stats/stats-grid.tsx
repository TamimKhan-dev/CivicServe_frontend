import { cn } from "@/lib/utils";
import { StatCardSkeleton } from "../../citizen/overview/stat-card-skeleton";
import { StatCard, type StatItem } from "./stats-card";

type StatsGridProps = {
  stats: StatItem[];
  isPending?: boolean;
  label?: string;
  className?: string;
};

export function StatsGrid({
  stats,
  isPending = false,
  label = "Statistics",
  className,
}: StatsGridProps) {
  console.log(stats);

  return (
    <section
      aria-label={label}
      className={cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4",
        className,
      )}
    >
      {isPending
        ? stats.map((stat) => <StatCardSkeleton key={stat.label} />)
        : stats.map((stat) => <StatCard key={stat.label} {...stat} />)}
    </section>
  );
}
