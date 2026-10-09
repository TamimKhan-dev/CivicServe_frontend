"use client";

import { useAdminRecentRequests } from "@/hooks/useRequests";
import type { Requests } from "@/types/requests-types";
import { RecentRequestsCard } from "../../common/recent-requests";

export function AdminRecentRequests() {
  const { data, isPending } = useAdminRecentRequests();
  const requests: Requests[] = data?.data?.requests ?? [];

  return (
    <RecentRequestsCard
      description="Latest requests submitted to your department"
      viewAllHref="/admin/all-requests"
      requests={requests}
      isPending={isPending}
      getDetailsHref={(r) => `/admin/all-requests/${r.id}`}
      showStaffInfo
    />
  );
}
