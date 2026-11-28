"use client";

import { useRecentAssignedTasks } from "@/hooks/dashboard/staff/useStaffHooks";
import type { RequestDetails } from "@/types";
import {
  RequestListSkeleton,
  RequestRowsSkeleton,
} from "../../citizen/overview/recent-requests-skeleton";
import DataTable from "../../common/data-table/data-table";
import { RequestRowActions } from "../../common/data-table/request-row-actions";
import { EmptyState } from "../../common/data-table/table-empty-state";
import {
  staffTableColumns,
  staffTableMobileRow,
} from "../staff-request-columns";

const PAGE_SIZE = 5;

export function StaffRecentRequests() {
  const { data, isPending } = useRecentAssignedTasks();
  const requests: RequestDetails[] = data?.data?.requests ?? [];

  return (
    <DataTable
      header={{
        title: "Recently assigned Tasks",
        description: "Latest requests submitted to your department",
        action: {
          label: "Go to assigned requests",
          href: "/staff/assigned-requests",
        },
      }}
      columns={staffTableColumns}
      renderMobileRow={staffTableMobileRow}
      data={requests}
      getRowId={(r) => r.id}
      isLoading={isPending}
      emptyState={<EmptyState />}
      loadingState={{
        desktop: <RequestRowsSkeleton count={PAGE_SIZE} />,
        mobile: <RequestListSkeleton count={PAGE_SIZE} />,
      }}
      renderActions={(r) => (
        <RequestRowActions
          request={r}
          userRole="STAFF"
          detailsHref={`/staff/assigned-requests/${r.id}`}
        />
      )}
    />
  );
}
