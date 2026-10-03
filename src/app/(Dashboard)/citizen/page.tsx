import {
  CheckCircle2,
  ClipboardList,
  Clock,
  Lightbulb,
  Plus,
  RefreshCw,
  Split,
  Trash2,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  type RecentRequest,
  RecentRequests,
} from "../_components/citizen/overview/recent-requests";
import {
  StatCard,
  type StatCardProps,
} from "../_components/citizen/overview/stat-cards";
import WelcomeHeading from "../_components/citizen/overview/welcome-heading";

export const metadata: Metadata = {
  title: "Overview | CivicServe",
};

// Demo data
const STATS: StatCardProps[] = [
  {
    label: "Total Requests",
    value: 16,
    description: "Submitted across all categories",
    icon: ClipboardList,
    iconClass: "bg-indigo-100 text-indigo-600",
  },
  {
    label: "Pending",
    value: 2,
    description: "Awaiting municipal assignment",
    icon: Clock,
    iconClass: "bg-amber-100 text-amber-600",
  },
  {
    label: "In Progress",
    value: 3,
    description: "Crew dispatched & active",
    icon: RefreshCw,
    iconClass: "bg-sky-100 text-sky-600",
  },
  {
    label: "Resolved",
    value: 11,
    description: "100% verified closure",
    icon: CheckCircle2,
    iconClass: "bg-emerald-100 text-emerald-600",
  },
];

const RECENT_REQUESTS: RecentRequest[] = [
  {
    id: "#CV-84912",
    title: "Pothole Remediation on Elm St & 5th Ave",
    category: "Road Maintenance",
    submittedAt: "Oct 24, 2025",
    status: "IN_PROGRESS",
    icon: Split,
  },
  {
    id: "#CV-84880",
    title: "Streetlight Fixture Failure & Flickering",
    category: "Traffic & Lighting",
    submittedAt: "Oct 22, 2025",
    status: "PENDING",
    icon: Lightbulb,
  },
  {
    id: "#CV-84701",
    title: "Missed Residential Bulk Waste Collection",
    category: "Waste & Sanitation",
    submittedAt: "Oct 19, 2025",
    status: "RESOLVED",
    icon: Trash2,
  },
];

export default function CitizenOverviewPage() {
  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <WelcomeHeading />
            <Badge
              variant="secondary"
              className="gap-1.5 rounded-full bg-indigo-50 text-[11px] font-semibold text-indigo-700"
            >
              <span
                className="size-1.5 rounded-full bg-indigo-500"
                aria-hidden
              />
              Sector 04 Central
            </Badge>
          </div>
          <p className="mt-1 text-sm text-slate-600 sm:text-base">
            Track your service requests and stay updated on your community.
          </p>
        </div>

        <Button
          asChild
          size="lg"
          className="w-full bg-blue-600 font-semibold hover:bg-blue-700 sm:w-auto"
        >
          <Link href="/citizen/create-request">
            <Plus className="size-4" aria-hidden />
            Create New Request
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <section
        aria-label="Request statistics"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        {STATS.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </section>

      {/* Recent requests */}
      <RecentRequests requests={RECENT_REQUESTS} />
    </div>
  );
}
