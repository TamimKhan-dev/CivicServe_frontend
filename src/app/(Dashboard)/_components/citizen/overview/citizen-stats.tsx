"use client";

import { cn } from "cn";
import { CheckCircle2, ClipboardList, Clock, RefreshCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useCitizenStats } from "@/hooks/useRequests";
import type {
  CitizenStatCards,
  CitizenStatsData,
} from "@/types/requests-types";
import { StatCardSkeleton } from "./stat-card-skeleton";

export default function CitizenStats() {
  const { data, isPending } = useCitizenStats();
  const stats: CitizenStatsData = data?.data;

  const STATS: CitizenStatCards[] = [
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
    <>
      {isPending
        ? Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)
        : STATS.map((stat) => (
            <Card
              key={stat.label}
              className="gap-0 rounded-2xl bg-white py-0 shadow-sm"
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-xs font-semibold text-slate-600">
                    {stat.label}
                  </p>
                  <span
                    className={cn(
                      "flex size-9 shrink-0 items-center justify-center rounded-lg",
                      stat.iconClass,
                    )}
                  >
                    <stat.icon className="size-4" aria-hidden />
                  </span>
                </div>
                <p className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
    </>
  );
}
