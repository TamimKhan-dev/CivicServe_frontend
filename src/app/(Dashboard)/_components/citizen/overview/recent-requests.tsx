import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
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
import { type RequestStatus, StatusBadge } from "./status-badge";

export type RecentRequest = {
  id: string;
  title: string;
  category: string;
  submittedAt: string;
  status: RequestStatus;
  icon: LucideIcon;
};

const detailsHref = (id: string) =>
  `/citizen/my-requests/${encodeURIComponent(id.replace("#", ""))}`;

function ViewDetails({ id }: { id: string }) {
  return (
    <Link
      href={detailsHref(id)}
      className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700"
    >
      View Details
      <ArrowRight className="size-3.5" aria-hidden />
    </Link>
  );
}

export function RecentRequests({ requests }: { requests: RecentRequest[] }) {
  return (
    <Card className="gap-0 overflow-hidden rounded-2xl bg-white py-0 shadow-sm">
      {/* Header */}
      <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Recent Requests</h2>
          <p className="mt-1 text-sm text-slate-600">
            Your {requests.length} most recently submitted civic service
            requests
          </p>
        </div>
        <Link
          href="/citizen/my-requests"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          View All Requests
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow className="hover:bg-slate-50">
              {["Request", "ID", "Category", "Submitted", "Status"].map((h) => (
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
            {requests.map(
              ({ id, title, category, submittedAt, status, icon: Icon }) => (
                <TableRow key={id}>
                  <TableCell className="py-4 pl-6">
                    <div className="flex items-center gap-3">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                        <Icon className="size-4" aria-hidden />
                      </span>
                      <span className="font-semibold text-slate-900">
                        {title}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 font-mono text-xs text-slate-600">
                    {id}
                  </TableCell>
                  <TableCell className="px-4 text-sm text-slate-700">
                    {category}
                  </TableCell>
                  <TableCell className="px-4 text-sm text-slate-700">
                    {submittedAt}
                  </TableCell>
                  <TableCell className="px-4">
                    <StatusBadge status={status} />
                  </TableCell>
                  <TableCell className="px-4 pr-6 text-right">
                    <ViewDetails id={id} />
                  </TableCell>
                </TableRow>
              ),
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile list */}
      <ul className="divide-y border-t md:hidden">
        {requests.map(
          ({ id, title, category, submittedAt, status, icon: Icon }) => (
            <li key={id} className="space-y-3 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                    <Icon className="size-4" aria-hidden />
                  </span>
                  <span className="text-sm font-semibold text-slate-900">
                    {title}
                  </span>
                </div>
                <StatusBadge status={status} className="shrink-0" />
              </div>
              <p className="text-xs text-slate-500">
                <span className="font-mono">{id}</span> • {category} •{" "}
                {submittedAt}
              </p>
              <ViewDetails id={id} />
            </li>
          ),
        )}
      </ul>
    </Card>
  );
}
