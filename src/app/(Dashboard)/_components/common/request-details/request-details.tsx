"use client";

import { useGetMe } from "@/hooks/useAuth";
import { useSingleRequest } from "@/hooks/useRequests";
import type { UserRole } from "@/types";
import { RequestAssignmentCard } from "./request-assigned-card";
import { RequestStatusCard } from "./request-details-card";
import { RequestHeader } from "./request-details-header";
import { RequestDetailsSkeleton } from "./request-details-skeleton";
import { RequestFeeCard } from "./request-fee-card";
import { RequestGallery } from "./request-gallery";
import { RequestOverviewCard } from "./request-overview-card";
import { RequestTimeline } from "./request-timeline";

export function RequestDetailsPage({ id }: { id: string }) {
  const { data: me } = useGetMe();
  const userRole: UserRole | undefined = me?.data?.role;
  const { data, isPending } = useSingleRequest(id);
  const request = data?.data ?? {};
  const images = request.imageUrl ? [request.imageUrl] : [];

  const dashboardRoute: Record<UserRole, string> = {
    ADMIN: "/admin/all-requests",
    CITIZEN: "/citizen/my-requests",
    STAFF: "/staff/assigned-requests",
  };

  if (isPending) return <RequestDetailsSkeleton />;

  return (
    <div className="space-y-6">
      <RequestHeader
        request={request}
        backHref={userRole ? dashboardRoute[userRole] : "#"}
        userRole={userRole}
      />
      <RequestGallery images={images} />

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          <RequestOverviewCard request={request} />
          <RequestTimeline request={request} />
        </div>
        <aside className="space-y-6">
          <RequestStatusCard request={request} userRole={userRole} />
          <RequestAssignmentCard request={request} />
          <RequestFeeCard request={request} userRole={userRole} />
        </aside>
      </div>
    </div>
  );
}
