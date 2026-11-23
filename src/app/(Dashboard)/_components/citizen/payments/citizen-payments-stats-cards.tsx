import { ClipboardList, Clock, RefreshCw } from "lucide-react";
import type { StatItem } from "@/types";
import { StatsGrid } from "../../common/stats/stats-grid";

export default function CitizenPaymentStats() {
  const items: StatItem[] = [
    {
      label: "Total Requests",
      value: 0,
      description: "Submitted across all categories",
      icon: ClipboardList,
      iconClass: "bg-indigo-100 text-indigo-600",
    },
    {
      label: "Pending",
      value: 0,
      description: "Awaiting municipal assignment",
      icon: Clock,
      iconClass: "bg-amber-100 text-amber-600",
    },
    {
      label: "In Progress",
      value: 0,
      description: "Crew dispatched & active",
      icon: RefreshCw,
      iconClass: "bg-sky-100 text-sky-600",
    },
  ];

  return (
    <StatsGrid
      stats={items}
      isPending={false}
      label="Request statistics"
      gridCount={3}
    />
  );
}
