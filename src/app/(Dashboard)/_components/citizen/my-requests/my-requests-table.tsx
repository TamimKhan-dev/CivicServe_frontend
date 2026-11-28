"use client";

import { useCitizenRequests } from "@/hooks/dashboard/citizen/useCitizenHooks";
import { useCategories } from "@/hooks/requests/useRequests";
import { useUrlFilters } from "@/hooks/shared/useUrlFilters";
import type { Category, RequestFilterValues } from "@/types";
import DataTable from "../../common/data-table/data-table";
import { RequestRowActions } from "../../common/data-table/request-row-actions";
import { EmptyState } from "../../common/data-table/table-empty-state";
import {
  RequestListSkeleton,
  RequestRowsSkeleton,
} from "../overview/recent-requests-skeleton";
import { renderMobileRequest, requestColumns } from "../request-columns";
import { RequestFiltersSkeleton } from "./request-filter-skeleton";
import { RequestFilters } from "./requests-filters";

const PAGE_SIZE = 5;

export const REQUEST_URL_DEFAULTS = {
  searchTerm: "",
  status: "",
  categoryId: "",
  sortOrder: "desc",
  page: "1",
};

export default function CitizenMyRequestsTable() {
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

  const { data, isPending: isRequestPending } = useCitizenRequests({
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

      {/* All requests */}
      <DataTable
        columns={requestColumns}
        data={requests}
        getRowId={(r) => r.id}
        isLoading={isRequestPending}
        loadingState={{
          desktop: <RequestRowsSkeleton count={PAGE_SIZE} />,
          mobile: <RequestListSkeleton count={PAGE_SIZE} />,
        }}
        emptyState={<EmptyState />}
        renderMobileRow={renderMobileRequest}
        renderActions={(r) => (
          <RequestRowActions
            request={r}
            userRole="CITIZEN"
            detailsHref={`/citizen/my-requests/${r.id}`}
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
