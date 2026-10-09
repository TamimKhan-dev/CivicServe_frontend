"use client";

import { ClipboardList, Clock, RefreshCw, Users } from "lucide-react";
import { useAdminStats } from "@/hooks/useRequests";
import type { StatItem } from "../../common/stats/stats-card";
import { StatsGrid } from "../../common/stats/stats-grid";

export default function AdminStats() {
  const { data, isPending } = useAdminStats();
  const adminStats = data?.data;

  const items: StatItem[] = [
    {
      label: "Total Requests",
      value: adminStats?.totalRequests ?? 0,
      description: "Submitted across the platform",
      icon: ClipboardList,
      iconClass: "bg-indigo-100 text-indigo-600",
    },
    {
      label: "Pending Requests",
      value: adminStats?.pendingRequests ?? 0,
      description: "Awaiting assignment or action",
      icon: Clock,
      iconClass: "bg-amber-100 text-amber-600",
    },
    {
      label: "In Progress",
      value: adminStats?.inProgress ?? 0,
      description: "Currently being handled by staff",
      icon: RefreshCw,
      iconClass: "bg-sky-100 text-sky-600",
    },
    {
      label: "Total Users",
      value: adminStats?.totalUsers ?? 0,
      description: "Registered users across the platform",
      icon: Users,
      iconClass: "bg-emerald-100 text-emerald-600",
    },
  ];

  return (
    <StatsGrid stats={items} isPending={isPending} label="Request statistics" />
  );
}
