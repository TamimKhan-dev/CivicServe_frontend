import { Split } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import { PaymentBadge } from "../../citizen/my-requests/payment-badge";
import {
  RequestListSkeleton,
  RequestRowsSkeleton,
} from "../../citizen/overview/recent-requests-skeleton";
import { StatusBadge } from "../../citizen/overview/status-badge";
import { TablePagination } from "../TablePagination";
import { EmptyState } from "../table-empty-state";
import { isService } from "./helper";
import type { RequestTableProps } from "./request-table-types";
import { TypeTag } from "./type-tag";

const HEADERS = ["Request", "ID", "Category", "Submitted", "Status"];

export default function RequestTable({
  requests,
  isPending,
  page,
  totalPages,
  onPageChange,
  totalItems,
  pageSize = 10,
  renderActions,
}: RequestTableProps) {
  const isEmpty = !isPending && requests.length === 0;

  return (
    <Card className="gap-0 overflow-hidden rounded-2xl bg-white py-0 shadow-sm">
      {isEmpty ? (
        <EmptyState />
      ) : (
        <>
          {/* Desktop */}
          <div className="hidden md:block">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow className="hover:bg-slate-50">
                  {HEADERS.map((h) => (
                    <TableHead
                      key={h}
                      className="h-11 px-4 text-xs font-semibold uppercase tracking-wide text-slate-600 first:pl-6"
                    >
                      {h}
                    </TableHead>
                  ))}
                  <TableHead className="h-11 px-4 pr-6 text-right text-xs font-semibold uppercase tracking-wide text-slate-600">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isPending ? (
                  <RequestRowsSkeleton count={pageSize} />
                ) : (
                  requests.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell className="py-4 pl-6">
                        <div className="flex items-center gap-3">
                          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                            <Split className="size-4" aria-hidden />
                          </span>
                          <div className="min-w-0 space-y-1">
                            <p className="font-semibold text-slate-900">
                              {r.title}
                            </p>
                            <TypeTag type={r.type} />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="px-4 font-mono text-xs text-slate-600">
                        {r.id}
                      </TableCell>
                      <TableCell className="px-4 text-sm text-slate-700">
                        {r.category?.name}
                      </TableCell>
                      <TableCell className="px-4 text-sm text-slate-700">
                        {formatDate(r.createdAt)}
                      </TableCell>
                      <TableCell className="px-4">
                        <div className="flex flex-col items-start gap-1.5">
                          <StatusBadge status={r.status} />
                          {isService(r) && (
                            <PaymentBadge status={r.payment?.status} />
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="px-4 pr-6">
                        <div className="flex justify-end">
                          {renderActions(r)}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Mobile */}
          <ul className="divide-y md:hidden">
            {isPending ? (
              <RequestListSkeleton count={pageSize} />
            ) : (
              requests.map((r) => (
                <li key={r.id} className="space-y-3 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                        <Split className="size-4" aria-hidden />
                      </span>
                      <div className="min-w-0 space-y-1">
                        <p className="text-sm font-semibold text-slate-900">
                          {r.title}
                        </p>
                        <TypeTag type={r.type} />
                      </div>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-1.5">
                      <StatusBadge status={r.status} />
                      {isService(r) && (
                        <PaymentBadge status={r?.payment?.status} />
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-slate-500">
                    <span className="font-mono">{r.id}</span> •{" "}
                    {r.category?.name} • {formatDate(r.createdAt)}
                  </p>
                  {renderActions(r)}
                </li>
              ))
            )}
          </ul>
        </>
      )}

      {!isPending && !isEmpty && (
        <TablePagination
          className="border-t"
          page={page}
          totalPages={totalPages}
          totalItems={totalItems}
          pageSize={pageSize}
          onPageChange={onPageChange}
        />
      )}
    </Card>
  );
}
