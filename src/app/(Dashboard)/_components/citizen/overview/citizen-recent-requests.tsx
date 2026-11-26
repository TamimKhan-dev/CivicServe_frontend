"use client";

import { useCitizenRecentRequests } from "@/hooks/dashboard/citizen/useCitizenHooks";
import type { RequestDetails } from "@/types";
import DataTable from "../../common/data-table/data-table";
import { RequestRowActions } from "../../common/data-table/request-row-actions";
import { EmptyState } from "../../common/data-table/table-empty-state";
import { renderMobileRequest, requestColumns } from "../request-columns";
import {
  RequestListSkeleton,
  RequestRowsSkeleton,
} from "./recent-requests-skeleton";

const PAGE_SIZE = 5;

export function CitizenRecentRequests() {
  const { data, isPending } = useCitizenRecentRequests();
  const requests: RequestDetails[] = data?.data?.requests ?? [];

  return (
    <DataTable
      header={{
        title: "My Requests",
        description: "Manage and track all your submitted requests.",
        action: { label: "Go to My Requests", href: "/citizen/my-requests" },
      }}
      columns={requestColumns}
      renderMobileRow={renderMobileRequest}
      data={requests}
      getRowId={(r) => r.id}
      isLoading={isPending}
      loadingState={{
        desktop: <RequestRowsSkeleton count={PAGE_SIZE} />,
        mobile: <RequestListSkeleton count={PAGE_SIZE} />,
      }}
      emptyState={<EmptyState />}
      renderActions={(r) => (
        <RequestRowActions
          request={r}
          userRole="CITIZEN"
          detailsHref={`/citizen/my-requests/${r.id}`}
        />
      )}
    />
  );
}
