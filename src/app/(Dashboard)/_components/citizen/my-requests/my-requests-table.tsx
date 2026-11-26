"use client";

import { Split } from "lucide-react";
import { useCitizenRequests } from "@/hooks/dashboard/citizen/useCitizenHooks";
import { useCategories } from "@/hooks/requests/useRequests";
import { useUrlFilters } from "@/hooks/shared/useUrlFilters";
import { formatDate } from "@/lib/formatters";
import { isService } from "@/lib/requests/requests-helpers";
import type { Category, RequestFilterValues } from "@/types";
import DataTable from "../../common/request-table/data-table";
import type { DataTableColumn } from "../../common/request-table/data-table-types";
import { RequestRowActions } from "../../common/request-table/request-row-actions";
import type { RequestItem } from "../../common/request-table/request-table-types";
import { EmptyState } from "../../common/request-table/table-empty-state";
import { TypeTag } from "../../common/request-table/type-tag";
import {
  RequestListSkeleton,
  RequestRowsSkeleton,
} from "../overview/recent-requests-skeleton";
import { StatusBadge } from "../overview/status-badge";
import { PaymentBadge } from "./payment-badge";
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

const requestColumns: DataTableColumn<RequestItem>[] = [
  {
    id: "request",
    header: "Request",
    cell: (r) => (
      <div className="flex items-center gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
          <Split className="size-4" aria-hidden />
        </span>
        <div className="min-w-0 space-y-1">
          <p className="font-semibold text-slate-900">{r.title}</p>
          <TypeTag type={r.type} />
        </div>
      </div>
    ),
  },
  {
    id: "id",
    header: "ID",
    className: "font-mono text-xs text-slate-600",
    cell: (r) => r.id,
  },
  { id: "category", header: "Category", cell: (r) => r.category?.name },
  {
    id: "submitted",
    header: "Submitted",
    cell: (r) => formatDate(r.createdAt),
  },
  {
    id: "status",
    header: "Status",
    cell: (r) => (
      <div className="flex flex-col items-start gap-1.5">
        <StatusBadge status={r.status} />
        {isService(r) && <PaymentBadge status={r.payment?.status} />}
      </div>
    ),
  },
];

const renderMobileRequest = (r: RequestItem) => (
  <>
    <div className="flex items-start justify-between gap-3">
      <div className="flex min-w-0 items-center gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
          <Split className="size-4" aria-hidden />
        </span>
        <div className="min-w-0 space-y-1">
          <p className="text-sm font-semibold text-slate-900">{r.title}</p>
          <TypeTag type={r.type} />
        </div>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-1.5">
        <StatusBadge status={r.status} />
        {isService(r) && <PaymentBadge status={r.payment?.status} />}
      </div>
    </div>
    <p className="text-xs text-slate-500">
      <span className="font-mono">{r.id}</span> • {r.category?.name} •{" "}
      {formatDate(r.createdAt)}
    </p>
  </>
);

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
      <DataTable<RequestItem>
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
