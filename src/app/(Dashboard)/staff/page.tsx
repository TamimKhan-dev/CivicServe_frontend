import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import WelcomeHeading from "../_components/citizen/overview/welcome-heading";
import { StaffRecentRequests } from "../_components/staff/overview/staff-recent-assigned";
import { StaffStats } from "../_components/staff/overview/staff-stats";

export const metadata: Metadata = {
  title: "Staff Overview | CivicServe",
};

export default function StaffDashboard() {
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
            Go to Assigned Queue
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <StaffStats />

      {/* Recent requests */}
      <StaffRecentRequests />
    </div>
  );
}
