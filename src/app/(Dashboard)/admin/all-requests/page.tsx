import { Suspense } from "react";
import AdminAllRequest from "../../_components/admin/all-requests/admin-all-requests";
import AdminStats from "../../_components/admin/overview/admin-stats";

export default function AdminAllRequests() {
  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              All Requests
            </h1>
          </div>
          <p className="mt-1 text-sm text-slate-600 sm:text-base">
            Manage, search, and track the progress of requests municipal service
            requests in real-time.
          </p>
        </div>
      </div>

      {/* Stats */}
      <AdminStats />

      {/* Search, filter, pagegination + Table data */}
      <Suspense fallback={null}>
        <AdminAllRequest />
      </Suspense>
    </div>
  );
}
