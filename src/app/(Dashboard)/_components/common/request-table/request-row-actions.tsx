"use client";

import { ArrowRight, CreditCard, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCreatePayment, useUpdateRequestStatus } from "@/hooks/useRequests";
import type { UserRole } from "@/types";
import { needsPayment } from "./helper";
import type { RequestItem } from "./request-table-types";

type Props = {
  request: RequestItem;
  userRole: UserRole;
  detailsHref: string;
};

export function RequestRowActions({ request, userRole, detailsHref }: Props) {
  const { mutate: pay, isPending: isPaying } = useCreatePayment();
  const { mutate: updateStatus, isPending: isUpdating } =
    useUpdateRequestStatus();

  const staffAction =
    userRole === "STAFF"
      ? request.status === "ASSIGNED"
        ? { label: "Start Work", next: "IN_PROGRESS" as const }
        : request.status === "IN_PROGRESS"
          ? { label: "Mark as Resolved", next: "RESOLVED" as const }
          : null
      : null;

  return (
    <div className="flex items-center gap-4">
      {staffAction && (
        <Button
          size="sm"
          disabled={isUpdating}
          onClick={() =>
            updateStatus({ requestId: request.id, status: staffAction.next })
          }
          className="h-8 bg-blue-600 px-3 text-xs font-semibold hover:bg-blue-700"
        >
          {isUpdating && (
            <Loader2 className="size-3.5 animate-spin" aria-hidden />
          )}
          {staffAction.label}
        </Button>
      )}

      {userRole === "CITIZEN" && needsPayment(request) && (
        <Button
          size="sm"
          disabled={isPaying}
          onClick={() => pay(request.id)}
          className="h-8 bg-blue-600 px-3 text-xs font-semibold hover:bg-blue-700"
        >
          {isPaying ? (
            <Loader2 className="size-3.5 animate-spin" aria-hidden />
          ) : (
            <CreditCard className="size-3.5" aria-hidden />
          )}
          Pay Now
        </Button>
      )}

      <Link
        href={detailsHref}
        className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700"
      >
        View Details
        <ArrowRight className="size-3.5" aria-hidden />
      </Link>
    </div>
  );
}
