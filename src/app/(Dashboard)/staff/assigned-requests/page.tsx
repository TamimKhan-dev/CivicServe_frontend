import { Suspense } from "react";
import AssignedRequest from "../../_components/staff/assigned-queue/assigned-requests";
import { StaffStats } from "../../_components/staff/overview/staff-stats";

export default function StaffAssignedRequests() {
  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Assigned Requests
            </h1>
          </div>
          <p className="mt-1 text-sm text-slate-600 sm:text-base">
            Manage, search, and track the progress of assigned municipal service
            requests in real-time.
          </p>
        </div>
      </div>

      {/* Stats */}
      <StaffStats />

      {/* Search, filter, pagegination + Table data */}
      <Suspense fallback={null}>
        <AssignedRequest />
      </Suspense>
    </div>
  );
}
