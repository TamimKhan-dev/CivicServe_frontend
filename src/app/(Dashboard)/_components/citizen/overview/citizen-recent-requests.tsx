"use client";

import { useMyRecentRequests } from "@/hooks/useRequests";
import type { Requests } from "@/types/requests-types";
import { RecentRequestsCard } from "../../common/recent-requests";

export function CitizenRecentRequests() {
  const { data, isPending } = useMyRecentRequests();
  const requests: Requests[] = data?.data?.requests ?? [];

  return (
    <RecentRequestsCard
      description="Your most recently submitted civic service requests"
      viewAllHref="/citizen/my-requests"
      requests={requests}
      isPending={isPending}
      getDetailsHref={(r) => `/citizen/${r.id}`}
    />
  );
}
