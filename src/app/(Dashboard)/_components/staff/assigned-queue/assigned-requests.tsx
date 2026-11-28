"use client";

import { useAllRequests, useCategories } from "@/hooks/requests/useRequests";
import { useUrlFilters } from "@/hooks/shared/useUrlFilters";
import type { Category, RequestFilterValues } from "@/types";
import { REQUEST_URL_DEFAULTS } from "../../citizen/my-requests/my-requests-table";
import { RequestFiltersSkeleton } from "../../citizen/my-requests/request-filter-skeleton";
import { RequestFilters } from "../../citizen/my-requests/requests-filters";
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

export default function AssignedRequest() {
  const { values, setParams, searchText, setSearchText } = useUrlFilters(
    REQUEST_URL_DEFAULTS,
    "searchTerm",
  );

  const page = Math.max(1, Number(values.page) || 1);

  const filters: RequestFilterValues = {
    search: searchText,
    status: values.status || "ALL",
    category: values.categoryId || "ALL",
    sort: values.sortOrder === "asc" ? "oldest" : "newest",
  };

  const { data: categoryRes, isPending: isCategoryPending } = useCategories();
  const categories: Category[] = categoryRes?.data ?? [];
  const categoryOptions = categories
    .filter((c) => c.isActive)
    .map((c) => ({ value: c.id, label: c.name }));

  const { data, isPending } = useAllRequests({
    page,
    limit: PAGE_SIZE,
    searchTerm: values.searchTerm || undefined,
    status: values.status || undefined,
    categoryId: values.categoryId || undefined,
    sortBy: "createdAt",
    sortOrder: values.sortOrder as "asc" | "desc",
  });

  const requests = data?.data?.requests ?? [];
  const totalItems = data?.data?.meta?.total ?? 0;
  const totalPages = data?.data?.meta?.totalPages ?? 1;

  const handleFilterChange = (data: RequestFilterValues) => {
    setSearchText(data.search);

    const filterChanged =
      data.status !== filters.status ||
      data.category !== filters.category ||
      data.sort !== filters.sort;

    if (filterChanged) {
      setParams({
        status: data.status === "ALL" ? "" : data.status,
        categoryId: data.category === "ALL" ? "" : data.category,
        sortOrder: data.sort === "oldest" ? "asc" : "desc",
      });
    }
  };
  return (
    <>
      {/* Request filters bar */}
      {isCategoryPending ? (
        <RequestFiltersSkeleton />
      ) : (
        <RequestFilters
          value={filters}
          onChange={handleFilterChange}
          categories={categoryOptions}
        />
      )}

      <DataTable
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
        pagination={{
          page,
          pageSize: PAGE_SIZE,
          totalPages,
          totalItems,
          onPageChange: (p) => setParams({ page: String(p) }),
        }}
      />
    </>
  );
}
