"use client";

import { useCategories, useMyRequests } from "@/hooks/useRequests";
import { useUrlFilters } from "@/hooks/useUrlFilters";
import type { Category } from "@/types/requests-types";
import { RequestFiltersSkeleton } from "./request-filter-skeleton";
import MyRequestsTable from "./request-table";
import { RequestFilters, type RequestFilterValues } from "./requests-filters";

const PAGE_SIZE = 5;

const REQUEST_URL_DEFAULTS = {
  searchTerm: "",
  status: "",
  categoryId: "",
  sortOrder: "desc",
  page: "1",
};

export default function RequestData() {
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

  const { data, isPending: isRequestPending } = useMyRequests({
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
      <MyRequestsTable
        requests={requests}
        isPending={isRequestPending}
        page={page}
        totalPages={totalPages}
        totalItems={totalItems}
        pageSize={PAGE_SIZE}
        onPageChange={(p) => setParams({ page: String(p) })}
      />
    </>
  );
}
