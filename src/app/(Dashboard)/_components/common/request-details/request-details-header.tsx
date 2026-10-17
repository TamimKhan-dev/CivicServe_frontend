"use client";

import { AlertCircle, ArrowLeft, Clock } from "lucide-react";
import Link from "next/link";
import { CopyIdButton } from "@/app/payment/_components/payment-receipt-details";
import { formatDateTime, timeAgo } from "@/lib/utils";
import type { UserRole } from "@/types";
import { StatusBadge } from "../../citizen/overview/status-badge";
import type { RequestDetails } from "./dummy-requests";

type Props = {
  request: RequestDetails;
  backHref: string;
  userRole?: UserRole;
};

export function RequestHeader({ request, backHref }: Props) {
  const { id, title, status, severity, createdAt, updatedAt } = request;

  return (
    <header className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Back to Requests
        </Link>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-md border bg-white px-2 py-1 font-mono text-xs font-semibold text-slate-700">
              {id}
              <CopyIdButton value={id} />
            </span>
            <StatusBadge status={status} />
            {severity && (
              <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-semibold text-red-700">
                <AlertCircle className="size-3.5" aria-hidden />
                {severity} Severity
              </span>
            )}
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            {title}
          </h1>

          <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
            <span>Submitted {formatDateTime(createdAt)}</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="size-3.5" aria-hidden />
              Updated {timeAgo(updatedAt)}
            </span>
          </p>
        </div>
      </div>
    </header>
  );
}
