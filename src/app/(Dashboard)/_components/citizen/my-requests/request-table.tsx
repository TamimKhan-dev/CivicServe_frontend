import { ArrowRight, CreditCard, Loader2, Split } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCreatePayment } from "@/hooks/useRequests";
import { cn, formatDate } from "@/lib/utils";
import type {
  PaymentStatus,
  RequestStatus,
  RequestType,
} from "@/types/requests-types";
import { TablePagination } from "../../common/TablePagination";
import { EmptyState } from "../../common/table-empty-state";
import {
  RequestListSkeleton,
  RequestRowsSkeleton,
} from "../overview/recent-requests-skeleton";
import { StatusBadge } from "../overview/status-badge";
import { PaymentBadge } from "./payment-badge";

export type RequestItem = {
  id: string;
  title: string;
  createdAt: string;
  status: RequestStatus;
  type: RequestType;
  category?: { name: string } | null;
  service?: { name: string; fee: number | string } | null;
  payment?: { status: PaymentStatus; amount: number | string } | null;
};

type MyRequestsTableProps = {
  requests: RequestItem[];
  isPending: boolean;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems?: number;
  pageSize?: number;
  onPayNow?: (request: RequestItem) => void;
  payingId?: string | null;
};

const isService = (r: RequestItem) => r.type === "SERVICE_REQUEST";
const needsPayment = (r: RequestItem) =>
  isService(r) &&
  r.status !== "REJECTED" &&
  r.payment?.status !== "PAID" &&
  r.payment?.status !== "REFUNDED";

function TypeTag({ type }: { type: RequestType }) {
  const service = type === "SERVICE_REQUEST";
  return (
    <span
      className={cn(
        "inline-flex rounded px-1.5 py-px text-[10px] font-semibold uppercase tracking-wide",
        service
          ? "bg-indigo-50 text-indigo-700"
          : "bg-slate-100 text-slate-600",
      )}
    >
      {service ? "Service" : "Complaint"}
    </span>
  );
}

function PayNowButton({
  request,
  onPayNow,
  paying,
}: {
  request: RequestItem;
  onPayNow?: (request: RequestItem) => void;
  paying: boolean;
}) {
  return (
    <Button
      type="button"
      size="sm"
      disabled={paying}
      onClick={() => onPayNow?.(request)}
      className="h-8 bg-blue-600 px-3 text-xs font-semibold hover:bg-blue-700"
    >
      {paying ? (
        <Loader2 className="size-3.5 animate-spin" aria-hidden />
      ) : (
        <CreditCard className="size-3.5" aria-hidden />
      )}
      Pay Now
    </Button>
  );
}

function ViewDetails({ id }: { id: string }) {
  return (
    <Link
      href={`/citizen/${id}`}
      className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700"
    >
      View Details
      <ArrowRight className="size-3.5" aria-hidden />
    </Link>
  );
}

export default function MyRequestsTable({
  requests,
  isPending,
  page,
  totalPages,
  onPageChange,
  totalItems,
  pageSize = 10,
}: MyRequestsTableProps) {
  const isEmpty = !isPending && requests.length === 0;
  const {
    mutate: createPayment,
    isPending: isPaymentPending,
    variables: payingRequestId,
  } = useCreatePayment();

  return (
    <Card className="gap-0 overflow-hidden rounded-2xl bg-white py-0 shadow-sm">
      {isEmpty ? (
        <EmptyState />
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden md:block">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow className="hover:bg-slate-50">
                  {["Request", "ID", "Category", "Submitted", "Status"].map(
                    (h) => (
                      <TableHead
                        key={h}
                        className="h-11 px-4 text-xs font-semibold uppercase tracking-wide text-slate-600 first:pl-6"
                      >
                        {h}
                      </TableHead>
                    ),
                  )}
                  <TableHead className="h-11 px-4 pr-6 text-right text-xs font-semibold uppercase tracking-wide text-slate-600">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isPending ? (
                  <RequestRowsSkeleton count={pageSize} />
                ) : (
                  requests.map((request) => {
                    const { id, title, category, createdAt, status } = request;
                    return (
                      <TableRow key={id}>
                        <TableCell className="py-4 pl-6">
                          <div className="flex items-center gap-3">
                            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                              <Split className="size-4" aria-hidden />
                            </span>
                            <div className="min-w-0 space-y-1">
                              <p className="font-semibold text-slate-900">
                                {title}
                              </p>
                              <TypeTag type={request.type} />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="px-4 font-mono text-xs text-slate-600">
                          {id}
                        </TableCell>
                        <TableCell className="px-4 text-sm text-slate-700">
                          {category?.name}
                        </TableCell>
                        <TableCell className="px-4 text-sm text-slate-700">
                          {formatDate(createdAt)}
                        </TableCell>
                        <TableCell className="px-4">
                          <div className="flex flex-col items-start gap-1.5">
                            <StatusBadge status={status} />
                            {isService(request) && (
                              <PaymentBadge status={request.payment?.status} />
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="px-4 pr-6">
                          <div className="flex items-center justify-end gap-4">
                            {needsPayment(request) && (
                              <PayNowButton
                                request={request}
                                onPayNow={() => createPayment(id)}
                                paying={
                                  isPaymentPending && payingRequestId === id
                                }
                              />
                            )}
                            <ViewDetails id={id} />
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>

          {/* Mobile list */}
          <ul className="divide-y md:hidden">
            {isPending ? (
              <RequestListSkeleton count={pageSize} />
            ) : (
              requests.map((request) => {
                const { id, title, category, createdAt, status } = request;
                return (
                  <li key={id} className="space-y-3 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                          <Split className="size-4" aria-hidden />
                        </span>
                        <div className="min-w-0 space-y-1">
                          <p className="text-sm font-semibold text-slate-900">
                            {title}
                          </p>
                          <TypeTag type={request.type} />
                        </div>
                      </div>
                      <div className="flex shrink-0 flex-col items-end gap-1.5">
                        <StatusBadge status={status} />
                        {isService(request) && (
                          <PaymentBadge status={request.payment?.status} />
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-slate-500">
                      <span className="font-mono">{id}</span> • {category?.name}{" "}
                      • {formatDate(createdAt)}
                    </p>
                    <div className="flex items-center gap-4">
                      {needsPayment(request) && (
                        <PayNowButton
                          request={request}
                          onPayNow={() => createPayment(id)}
                          paying={isPaymentPending && payingRequestId === id}
                        />
                      )}
                      <ViewDetails id={id} />
                    </div>
                  </li>
                );
              })
            )}
          </ul>
        </>
      )}

      {/* Pagination */}
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
