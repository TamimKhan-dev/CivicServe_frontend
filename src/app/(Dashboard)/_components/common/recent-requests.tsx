import { ArrowRight, MapPin, Split } from "lucide-react";
import Link from "next/link";
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
import type { Requests } from "@/types/requests-types";
import {
  RequestListSkeleton,
  RequestRowsSkeleton,
} from "../citizen/overview/recent-requests-skeleton";
import { StatusBadge } from "../citizen/overview/status-badge";
import { EmptyState } from "./table-empty-state";

type Props = {
  title?: string;
  description: string;
  viewAllHref: string;
  requests: Requests[];
  isPending: boolean;
  getDetailsHref: (request: Requests) => string;
  showStaffInfo?: boolean;
};

const shortId = (id: string) => id.slice(0, 8);

export function RecentRequestsCard({
  title = "Recent Requests",
  description,
  viewAllHref,
  requests,
  isPending,
  getDetailsHref,
  showStaffInfo = false,
}: Props) {
  const columns = [
    "Request",
    "ID",
    "Category",
    ...(showStaffInfo ? ["Location"] : []),
    "Submitted",
    "Status",
  ];
  const displayId = (id: string) => (showStaffInfo ? shortId(id) : id);

  return (
    <Card className="gap-0 overflow-hidden rounded-2xl bg-white py-0 shadow-sm">
      <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">{title}</h2>
          <p className="mt-1 text-sm text-slate-600">{description}</p>
        </div>
        <Link
          href={viewAllHref}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          View All Requests
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>

      {/* Desktop */}
      <div className="hidden md:block">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow className="hover:bg-slate-50">
              {columns.map((h) => (
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
              <RequestRowsSkeleton />
            ) : requests.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={columns.length + 1}>
                  <EmptyState />
                </TableCell>
              </TableRow>
            ) : (
              requests.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="py-4 pl-6">
                    <div className="flex items-center gap-3">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                        <Split className="size-4" aria-hidden />
                      </span>
                      <div className="min-w-0">
                        <p className="max-w-55 truncate font-semibold text-slate-900">
                          {r.title}
                        </p>
                        {showStaffInfo && !r.assignedStaffId && (
                          <p className="text-xs text-amber-600">Unassigned</p>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell
                    className="px-4 font-mono text-xs text-slate-600"
                    title={r.id}
                  >
                    {displayId(r.id)}
                  </TableCell>
                  <TableCell className="px-4 text-sm text-slate-700">
                    <p>{r.category?.name}</p>
                    {showStaffInfo && (
                      <p className="text-xs text-slate-500">
                        {r.department?.name}
                      </p>
                    )}
                  </TableCell>
                  {showStaffInfo && (
                    <TableCell className="px-4 text-sm text-slate-700">
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin
                          className="size-3.5 shrink-0 text-slate-400"
                          aria-hidden
                        />
                        <span className="max-w-40 truncate">{r.location}</span>
                      </span>
                    </TableCell>
                  )}
                  <TableCell className="px-4 text-sm text-slate-700">
                    {formatDate(r.createdAt)}
                  </TableCell>
                  <TableCell className="px-4">
                    <StatusBadge status={r.status} />
                  </TableCell>
                  <TableCell className="px-4 pr-6 text-right">
                    <DetailsLink href={getDetailsHref(r)} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile */}
      <ul className="divide-y border-t md:hidden">
        {isPending ? (
          <RequestListSkeleton />
        ) : requests.length === 0 ? (
          <li>
            <EmptyState />
          </li>
        ) : (
          requests.map((r) => (
            <li key={r.id} className="space-y-3 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                    <Split className="size-4" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-900">
                      {r.title}
                    </p>
                    {showStaffInfo && !r.assignedStaffId && (
                      <p className="text-xs text-amber-600">Unassigned</p>
                    )}
                  </div>
                </div>
                <StatusBadge status={r.status} className="shrink-0" />
              </div>
              <p className="text-xs text-slate-500">
                <span className="font-mono">{displayId(r.id)}</span> •{" "}
                {r.category?.name} • {formatDate(r.createdAt)}
              </p>
              {showStaffInfo && (
                <p className="flex items-center gap-1.5 text-xs text-slate-500">
                  <MapPin className="size-3.5 shrink-0" aria-hidden />
                  {r.location}
                </p>
              )}
              <DetailsLink href={getDetailsHref(r)} />
            </li>
          ))
        )}
      </ul>
    </Card>
  );
}

function DetailsLink({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700"
    >
      View Details
      <ArrowRight className="size-3.5" aria-hidden />
    </Link>
  );
}
