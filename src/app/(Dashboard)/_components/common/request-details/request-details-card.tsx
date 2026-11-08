"use client";

import { Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn, timeAgo } from "@/lib/utils";
import type { UserRole } from "@/types";
import type { RequestDetails } from "@/types/requests-types";
import { hasRoleAction, isAwaitingPayment } from "../request-table/helper";
import { RequestRowActions } from "../request-table/request-row-actions";

type StatusUi = {
  label: string;
  message: string;
  box: string;
  title: string;
  dot: string;
  pulse?: boolean;
};

const STATUS_UI: Record<string, StatusUi> = {
  PENDING: {
    label: "Pending",
    message: "This request has been received and is waiting to be assigned.",
    box: "border-amber-200 bg-amber-50",
    title: "text-amber-700",
    dot: "bg-amber-500",
  },
  ASSIGNED: {
    label: "Assigned",
    message: "A staff member has been assigned and will begin work soon.",
    box: "border-indigo-200 bg-indigo-50",
    title: "text-indigo-700",
    dot: "bg-indigo-500",
  },
  IN_PROGRESS: {
    label: "In Progress",
    message: "Work is actively in progress on this request.",
    box: "border-blue-200 bg-blue-50",
    title: "text-blue-700",
    dot: "bg-blue-500",
    pulse: true,
  },
  RESOLVED: {
    label: "Resolved",
    message: "The work is complete and this request has been resolved.",
    box: "border-emerald-200 bg-emerald-50",
    title: "text-emerald-700",
    dot: "bg-emerald-500",
  },
  REJECTED: {
    label: "Rejected",
    message: "This request was reviewed and could not be accepted.",
    box: "border-red-200 bg-red-50",
    title: "text-red-700",
    dot: "bg-red-500",
  },
};

type Props = {
  request: RequestDetails;
  userRole?: UserRole;
};

export function RequestStatusCard({ request, userRole }: Props) {
  const { status, updatedAt } = request;
  const ui = STATUS_UI[status] ?? STATUS_UI.PENDING;
  const isClosed = status === "RESOLVED" || status === "REJECTED";

  const showActions = !!userRole && hasRoleAction(request, userRole);
  const waitingForPayment = userRole === "ADMIN" && isAwaitingPayment(request);

  return (
    <Card className="gap-0 rounded-2xl bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between pb-4">
        <h2 className="text-[11px] font-bold uppercase tracking-wide text-slate-500">
          Current Status
        </h2>
        <span className="text-xs text-slate-400">
          {isClosed ? "Closed Ticket" : "Live Ticket"}
        </span>
      </div>

      <div className={cn("space-y-3 rounded-xl border p-4", ui.box)}>
        <div className="flex items-center gap-2">
          <span className="relative flex size-2.5">
            {ui.pulse && (
              <span
                className={cn(
                  "absolute inline-flex size-full animate-ping rounded-full opacity-75",
                  ui.dot,
                )}
              />
            )}
            <span
              className={cn(
                "relative inline-flex size-2.5 rounded-full",
                ui.dot,
              )}
            />
          </span>
          <p className={cn("font-semibold", ui.title)}>{ui.label}</p>
        </div>

        <p className="text-sm leading-relaxed text-slate-600">{ui.message}</p>

        <p className="flex items-center gap-1.5 border-t border-black/5 pt-3 text-xs text-slate-500">
          <Clock className="size-3.5" aria-hidden />
          Updated {timeAgo(updatedAt)}
        </p>
      </div>

      {(showActions || waitingForPayment) && (
        <div className="mt-4 space-y-2 border-t pt-4">
          {showActions && userRole && (
            <RequestRowActions
              request={request}
              userRole={userRole}
              className="flex-wrap"
            />
          )}
          {waitingForPayment && (
            <p className="text-xs text-slate-500">
              Waiting for payment before staff can be assigned.
            </p>
          )}
        </div>
      )}
    </Card>
  );
}
