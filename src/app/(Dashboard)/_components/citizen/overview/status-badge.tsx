import { cn } from "@/lib/utils";
import type { RequestStatus } from "@/types/requests-types";

const STATUS_STYLES: Record<
  RequestStatus,
  { label: string; badge: string; dot: string }
> = {
  SUBMITTED: {
    label: "Pending",
    badge: "bg-amber-100 text-amber-800",
    dot: "bg-amber-500",
  },
  IN_PROGRESS: {
    label: "In Progress",
    badge: "bg-sky-100 text-sky-800",
    dot: "bg-sky-500",
  },
  RESOLVED: {
    label: "Resolved",
    badge: "bg-emerald-100 text-emerald-800",
    dot: "bg-emerald-500",
  },
  ASSIGNED: {
    label: "Assigned",
    badge: "bg-indigo-100 text-indigo-800",
    dot: "bg-indigo-500",
  },
  REJECTED: {
    label: "Rejected",
    badge: "bg-red-100 text-red-800",
    dot: "bg-red-500",
  },
};

export function StatusBadge({
  status,
  className,
}: {
  status: RequestStatus;
  className?: string;
}) {
  const s = STATUS_STYLES[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold",
        s.badge,
        className,
      )}
    >
      <span className={cn("size-1.5 rounded-full", s.dot)} aria-hidden />
      {s.label}
    </span>
  );
}
