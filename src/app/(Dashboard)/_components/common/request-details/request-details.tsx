"use client";

import { useGetMe } from "@/hooks/useAuth";
import type { UserRole } from "@/types";
import { DUMMY_REQUEST } from "./dummy-requests";
import { RequestStatusCard } from "./request-details-card";
import { RequestHeader } from "./request-details-header";
import { RequestGallery } from "./request-gallery";
import { RequestOverviewCard } from "./request-overview-card";
import { RequestTimeline } from "./request-timeline";

function Slot({ name }: { name: string }) {
  return (
    <div className="rounded-2xl border border-dashed bg-white p-6 text-sm text-slate-500">
      {name}
    </div>
  );
}

export function RequestDetailsPage({ id }: { id: string }) {
  const { data: me } = useGetMe();
  const userRole: UserRole | undefined = me?.data?.role;
  const request = { ...DUMMY_REQUEST, id };
  console.log(request.title);

  return (
    <div className="space-y-6">
      <RequestHeader
        request={request}
        backHref={"/admin/all-requests"}
        userRole={userRole}
      />
      <RequestGallery images={request.images} />

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          <RequestOverviewCard request={request} />
          <RequestTimeline request={request} />
        </div>
        <aside className="space-y-6">
          <RequestStatusCard request={request} userRole={userRole} />
          <Slot name="Assignment" />
          <Slot name="Fees" />
        </aside>
      </div>
    </div>
  );
}
