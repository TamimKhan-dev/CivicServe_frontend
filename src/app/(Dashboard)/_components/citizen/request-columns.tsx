import { Split } from "lucide-react";
import { CopyIdButton } from "@/components/shared/copy-id-button";
import { formatDate } from "@/lib/formatters";
import { isService } from "@/lib/requests/requests-helpers";
import type { DataTableColumn } from "../common/data-table/data-table-types";
import type { RequestItem } from "../common/data-table/request-table-types";
import { TypeTag } from "../common/data-table/type-tag";
import { PaymentBadge } from "./my-requests/payment-badge";
import { StatusBadge } from "./overview/status-badge";

export const requestColumns: DataTableColumn<RequestItem>[] = [
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
    className: "font-mono text-xs text-slate-600 truncate",
    cell: (r) => (
      <div className="flex items-center gap-1">
        <span className="max-w-24 truncate font-mono text-xs">{r.id}</span>
        <CopyIdButton value={r.id} />
      </div>
    ),
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

export const renderMobileRequest = (r: RequestItem) => (
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
