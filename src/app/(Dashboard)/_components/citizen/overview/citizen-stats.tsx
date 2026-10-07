"use client";

import { CheckCircle2, ClipboardList, Clock, RefreshCw } from "lucide-react";
import { useCitizenStats } from "@/hooks/useRequests";
import type { CitizenStatsData } from "@/types/requests-types";
import type { StatItem } from "../../common/stats/stats-card";
import { StatsGrid } from "../../common/stats/stats-grid";

export default function CitizenStats() {
  const { data, isPending } = useCitizenStats();
  const stats: CitizenStatsData = data?.data;

  const items: StatItem[] = [
    {
      label: "Total Requests",
      value: stats?.totalRequests ?? 0,
      description: "Submitted across all categories",
      icon: ClipboardList,
      iconClass: "bg-indigo-100 text-indigo-600",
    },
    {
      label: "Pending",
      value: stats?.pendingRequests ?? 0,
      description: "Awaiting municipal assignment",
      icon: Clock,
      iconClass: "bg-amber-100 text-amber-600",
    },
    {
      label: "In Progress",
      value: stats?.inProgressRequests ?? 0,
      description: "Crew dispatched & active",
      icon: RefreshCw,
      iconClass: "bg-sky-100 text-sky-600",
    },
    {
      label: "Resolved",
      value: stats?.resolvedRequests ?? 0,
      description: "100% verified closure",
      icon: CheckCircle2,
      iconClass: "bg-emerald-100 text-emerald-600",
    },
  ];

  return (
    <StatsGrid stats={items} isPending={isPending} label="Request statistics" />
  );
}
