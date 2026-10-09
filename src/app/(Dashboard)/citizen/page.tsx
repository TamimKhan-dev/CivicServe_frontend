import { Plus } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RecentRequests } from "../_components/citizen/overview/citizen-recent-requests";
import CitizenStats from "../_components/citizen/overview/citizen-stats";
import WelcomeHeading from "../_components/citizen/overview/welcome-heading";

export const metadata: Metadata = {
  title: "Overview | CivicServe",
};

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
      <CitizenStats />

      {/* Recent requests */}
      <RecentRequests />
    </div>
  );
}
