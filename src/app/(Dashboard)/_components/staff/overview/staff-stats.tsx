"use client";

import { CheckCircle2, ClipboardList, Clock, RefreshCw } from "lucide-react";
import { useStaffStats } from "@/hooks/useRequests";
import type { StatItem } from "../../common/stats/stats-card";
import { StatsGrid } from "../../common/stats/stats-grid";

export function StaffStats() {
  const { data, isPending } = useStaffStats();
  const staffStats = data?.data ?? {};

  const items: StatItem[] = [
    {
      label: "Assigned Requests",
      value: staffStats?.totalAssigned,
      description: "Requests assigned to you",
      icon: ClipboardList,
      iconClass: "bg-indigo-100 text-indigo-600",
    },
    {
      label: "Pending Action",
      value: staffStats?.pendingAction,
      description: "Awaiting your action",
      icon: Clock,
      iconClass: "bg-amber-100 text-amber-600",
    },
    {
      label: "In Progress",
      value: staffStats?.inProgress,
      description: "Currently being handled",
      icon: RefreshCw,
      iconClass: "bg-sky-100 text-sky-600",
    },
    {
      label: "Resolved",
      value: staffStats?.resolved,
      description: "Successfully resolved",
      icon: CheckCircle2,
      iconClass: "bg-emerald-100 text-emerald-600",
    },
  ];
  return <StatsGrid stats={items} isPending={isPending} />;
}
