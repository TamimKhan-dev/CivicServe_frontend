"use client";

import { useAllRequests, useCategories } from "@/hooks/useRequests";
import { useUrlFilters } from "@/hooks/useUrlFilters";
import type { Category } from "@/types/requests-types";
import { REQUEST_URL_DEFAULTS } from "../../citizen/my-requests/request-data";
import { RequestFiltersSkeleton } from "../../citizen/my-requests/request-filter-skeleton";
import {
  RequestFilters,
  type RequestFilterValues,
} from "../../citizen/my-requests/requests-filters";
import { RequestRowActions } from "../../common/request-table/request-row-actions";
import RequestTable from "../../common/request-table/request-table";

const PAGE_SIZE = 6;

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

  const { data, isPending: isRequestPending } = useAllRequests({
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

      <RequestTable
        requests={requests}
        isPending={isRequestPending}
        page={page}
        totalPages={totalPages}
        totalItems={totalItems}
        pageSize={PAGE_SIZE}
        onPageChange={(p) => setParams({ page: String(p) })}
        renderActions={(r) => (
          <RequestRowActions
            request={r}
            userRole="STAFF"
            detailsHref={`/staff/requests/${r.id}`}
          />
        )}
      />
    </>
  );
}
