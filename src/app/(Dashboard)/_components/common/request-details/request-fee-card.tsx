import { CheckCircle2, Clock, type LucideIcon, Undo2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn, formatDate } from "@/lib/utils";
import type { UserRole } from "@/types";
import type { RequestDetails } from "@/types/requests-types";
import { formatMoney } from "../request-table/helper";

type Look = { box: string; text: string; label: string; icon: LucideIcon };

const LOOK = {
  PAID: {
    box: "border-blue-100 bg-blue-50/60",
    text: "text-emerald-600",
    label: "Paid in Full",
    icon: CheckCircle2,
  },
  REFUNDED: {
    box: "border-slate-200 bg-slate-50",
    text: "text-slate-600",
    label: "Refunded",
    icon: Undo2,
  },
  UNPAID: {
    box: "border-amber-200 bg-amber-50",
    text: "text-amber-700",
    label: "Payment Pending",
    icon: Clock,
  },
  NOT_DUE: {
    box: "border-slate-200 bg-slate-50",
    text: "text-slate-600",
    label: "No payment due",
    icon: CheckCircle2,
  },
} satisfies Record<string, Look>;

type Props = { request: RequestDetails; userRole?: UserRole };

function ServiceFee({ request, userRole }: Props) {
  const { service, payment, status } = request;
  const amount = payment?.amount ?? service?.fee ?? 0;
  const isPaid = payment?.status === "PAID";
  const isRefunded = payment?.status === "REFUNDED";

  const look = isPaid
    ? LOOK.PAID
    : isRefunded
      ? LOOK.REFUNDED
      : status === "REJECTED"
        ? LOOK.NOT_DUE
        : LOOK.UNPAID;
  const Icon = look.icon;

  const billed = [
    payment?.paymentMethod && `Billed to ${payment.paymentMethod}`,
    payment?.paidAt &&
      `${payment.paymentMethod ? "on" : "Paid on"} ${formatDate(payment.paidAt)}`,
  ]
    .filter(Boolean)
    .join(" ");

  const reference = payment?.transactionId
    ? `…${payment.transactionId.slice(-8)}`
    : null;

  const showBilling = isPaid && (billed || reference);
  const showUnpaidNote = look === LOOK.UNPAID;

  return (
    <div className={cn("rounded-xl border p-4", look.box)}>
      <div className="flex items-start justify-between gap-3">
        <p className="font-medium text-slate-800">
          {service?.name ?? "Service fee"}
        </p>
        <p className="text-2xl font-extrabold tracking-tight text-slate-900">
          {formatMoney(amount)}
        </p>
      </div>

      <div className="mt-2 flex items-center justify-between text-sm">
        <span className="text-slate-500">Status:</span>
        <span
          className={cn(
            "inline-flex items-center gap-1.5 font-semibold",
            look.text,
          )}
        >
          <Icon className="size-4" aria-hidden />
          {look.label}
        </span>
      </div>

      {showBilling && (
        <p className="mt-3 border-t border-black/5 pt-3 text-xs leading-relaxed text-slate-500">
          {billed && <>{billed}. </>}
          {reference && <>Ref: {reference}</>}
        </p>
      )}

      {showUnpaidNote && (
        <p className="mt-3 border-t border-black/5 pt-3 text-xs leading-relaxed text-slate-600">
          {userRole === "CITIZEN"
            ? "Use Pay Now above to complete payment. Staff can be assigned once the fee is paid."
            : "Waiting for the citizen to pay. Staff can be assigned once the fee is paid."}
        </p>
      )}
    </div>
  );
}

export function RequestFeeCard({ request, userRole }: Props) {
  const { type } = request;

  return (
    <Card className="gap-0 rounded-2xl bg-white p-5 shadow-sm">
      <h2 className="pb-4 text-xs font-bold uppercase tracking-wide text-slate-900">
        Financial &amp; Service Fees
      </h2>

      {type !== "SERVICE_REQUEST" ? (
        <div className="space-y-2 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="flex items-center gap-2 font-semibold text-emerald-700">
            <CheckCircle2 className="size-4" aria-hidden />
            No Citizen Fee Required
          </p>
          <p className="text-sm leading-relaxed text-slate-600">
            This type of request is funded by the city. No fee applies.
          </p>
        </div>
      ) : (
        <ServiceFee request={request} userRole={userRole} />
      )}
    </Card>
  );
}
