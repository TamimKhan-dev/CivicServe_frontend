import { MapPin, Split } from "lucide-react";
import { CopyIdButton } from "@/components/shared/copy-id-button";
import { StatusBadge } from "../citizen/overview/status-badge";
import type { DataTableColumn } from "../common/data-table/data-table-types";
import type { RequestItem } from "../common/data-table/request-table-types";
import { TypeTag } from "../common/data-table/type-tag";

export const staffTableColumns: DataTableColumn<RequestItem>[] = [
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
    id: "location",
    header: "Location",
    cell: (r) => (
      <div className="flex items-center gap-1.5 text-slate-700">
        <MapPin className="size-4 shrink-0 text-slate-400" aria-hidden />
        <span className="max-w-48 truncate">{r.location}</span>
      </div>
    ),
  },
  {
    id: "status",
    header: "Status",
    cell: (r) => (
      <div className="flex flex-col items-start gap-1.5">
        <StatusBadge status={r.status} />
        {/* {isService(r) && <PaymentBadge status={r.payment?.status} />} */}
      </div>
    ),
  },
];

export const staffTableMobileRow = (r: RequestItem) => {
  return (
    <>
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
            <Split className="size-4" aria-hidden />
          </span>
          <div className="min-w-0 space-y-1">
            <p className="line-clamp-2 text-sm font-semibold text-slate-900">
              {r.title}
            </p>
            <TypeTag type={r.type} />
          </div>
        </div>
        <div className="shrink-0">
          <StatusBadge status={r.status} />
        </div>
      </div>
      <p className="flex items-center gap-1.5 text-xs text-slate-600">
        <MapPin className="size-3.5 shrink-0 text-slate-400" aria-hidden />
        <span className="min-w-0 truncate">{r.location}</span>
      </p>
      <div className="flex items-center gap-1 text-xs text-slate-500">
        <span className="max-w-28 truncate font-mono">{r.id}</span>
        <CopyIdButton value={r.id} />
        <span aria-hidden>•</span>
        <span className="truncate">{r.category?.name}</span>
      </div>
    </>
  );
};
