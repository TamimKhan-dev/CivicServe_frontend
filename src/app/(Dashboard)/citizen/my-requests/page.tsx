import { Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import RequestData from "../../_components/citizen/my-requests/request-data";
import CitizenStats from "../../_components/citizen/overview/citizen-stats";

export default function MyRequests() {
  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              My Requests
            </h1>
          </div>
          <p className="mt-1 text-sm text-slate-600 sm:text-base">
            Manage, search, and track the progress of your submitted municipal
            service requests in real-time.
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
        <CitizenStats />
      </section>

      {/* Search, filter, pagegination + Table data */}
      <Suspense fallback={null}>
        <RequestData />
      </Suspense>
    </div>
  );
}
