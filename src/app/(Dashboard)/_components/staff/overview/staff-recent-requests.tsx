"use client";

import { useRecentAssignedTasks } from "@/hooks/useRequests";
import type { Requests } from "@/types/requests-types";
import { RecentRequestsCard } from "../../common/recent-requests";

export function StaffRecentRequests() {
  const { data, isPending } = useRecentAssignedTasks();
  const requests: Requests[] = data?.data?.requests ?? [];

  return (
    <RecentRequestsCard
      description="Latest requests submitted to your department"
      viewAllHref="/staff/assigned-requests"
      requests={requests}
      isPending={isPending}
      getDetailsHref={(r) => `/staff/assigned-requests/${r.id}`}
      showStaffInfo
    />
  );
}
