"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useCategories, useMyRequests } from "@/hooks/useRequests";
import type { Category } from "@/types/requests-types";
import { RequestFiltersSkeleton } from "./request-filter-skeleton";
import MyRequestsTable from "./request-table";
import {
  DEFAULT_REQUEST_FILTERS,
  RequestFilters,
  type RequestFilterValues,
} from "./requests-filters";

const PAGE_SIZE = 5;

export default function RequestData() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState(DEFAULT_REQUEST_FILTERS);
  const [page, setPage] = useState(() => {
    const value = Number(searchParams.get("page"));
    return Number.isInteger(value) && value > 0 ? value : 1;
  });

  const [debouncedSearch, setDebouncedSearch] = useState(
    () => searchParams.get("searchTerm") ?? "",
  );

  useEffect(() => {
    const id = setTimeout(() => setDebouncedSearch(filters?.search), 400);
    return () => clearTimeout(id);
  }, [filters.search]);

  const { data: categoryRes, isPending: isCategoryPending } = useCategories();
  const categories: Category[] = categoryRes?.data ?? [];
  const categoryOptions = categories
    .filter((c) => c.isActive)
    .map((c) => ({ value: c.id, label: c.name }));

  const { data, isPending: isRequestPending } = useMyRequests({
    page,
    limit: PAGE_SIZE,
    searchTerm: debouncedSearch.trim() || undefined,
    status: filters.status === "ALL" ? undefined : filters.status,
    categoryId: filters.category === "ALL" ? undefined : filters.category,
    sortBy: "createdAt",
    sortOrder: filters.sort === "newest" ? "desc" : "asc",
  });

  const requests = data?.data?.requests ?? [];
  const totalItems = data?.data?.meta?.total ?? 0;
  const totalPages = data?.data?.meta?.totalPages ?? 1;

  const handleFilterChange = (data: RequestFilterValues) => {
    setFilters(data);
    setPage(1);
  };

  useEffect(() => {
    const params = new URLSearchParams();

    if (debouncedSearch.trim()) {
      params.set("searchTerm", debouncedSearch.trim());
    }

    if (filters.status !== "ALL") {
      params.set("status", filters.status);
    }

    if (filters.category !== "ALL") {
      params.set("categoryId", filters.category);
    }

    if (filters.sort !== "newest") {
      params.set("sortOrder", "asc");
    }

    if (page > 1) {
      params.set("page", String(page));
    }

    const queryString = params.toString();

    router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  }, [
    debouncedSearch,
    filters.status,
    filters.category,
    filters.sort,
    page,
    pathname,
    router,
  ]);

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
        onPageChange={setPage}
      />
    </>
  );
}
