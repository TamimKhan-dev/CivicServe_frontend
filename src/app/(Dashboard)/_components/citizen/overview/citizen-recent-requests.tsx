"use client";

import { useCitizenRecentRequests } from "@/hooks/dashboard/citizen/useCitizenHooks";
import type { RequestDetails } from "@/types";
import { RecentRequestsCard } from "../../common/recent-requests";

export function CitizenRecentRequests() {
  const { data, isPending } = useCitizenRecentRequests();
  const requests: RequestDetails[] = data?.data?.requests ?? [];

  return (
    <RecentRequestsCard
      description="Your most recently submitted civic service requests"
      viewAllHref="/citizen/my-requests"
      requests={requests}
      isPending={isPending}
      getDetailsHref={(r) => `/citizen/my-requests/${r.id}`}
    />
  );
}
