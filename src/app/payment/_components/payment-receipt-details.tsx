"use client";

import { Check, Copy, CreditCard } from "lucide-react";
import { useState } from "react";
import { cn, formatDate } from "@/lib/utils";

export type PaymentReceipt = {
  amount: string;
  currency: string;
  status: "PAID" | "PENDING";
  requestId: string;
  method: string;
  paidAt: string;
  request: {
    service: { name: string}
  }
};

const STATUS_STYLES = {
  PAID: {
    label: "Paid",
    pill: "bg-emerald-100 text-emerald-700",
    dot: "bg-emerald-500",
  },
  PENDING: {
    label: "Confirming",
    pill: "bg-amber-100 text-amber-700",
    dot: "bg-amber-500",
  },
};

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 text-sm">
      <dt className="shrink-0 text-slate-600">{label}</dt>
      <dd className="flex min-w-0 items-center justify-end gap-2 text-right font-semibold text-slate-900">
        {children}
      </dd>
    </div>
  );
}

export default function PaymentReceiptDetails({
  receipt,
}: {
  receipt: PaymentReceipt;
}) {
  const [copied, setCopied] = useState(false);
  const status = STATUS_STYLES[receipt?.status];

  const copyRequestId = async () => {
    try {
      await navigator.clipboard.writeText(receipt?.requestId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="rounded-xl bg-indigo-50/70 p-5">
      {/* Amount */}
      <div className="flex items-baseline justify-between gap-4 pb-4">
        <span className="text-[11px] font-bold uppercase tracking-wide text-slate-700">
          Amount Paid
        </span>
        <span className="flex items-baseline gap-1">
          <span className="text-3xl font-extrabold tracking-tight text-slate-900">
            {receipt?.amount}$
          </span>
        </span>
      </div>

      {/* Details list */}
      <dl className="divide-y divide-slate-200/70 border-t border-slate-200/70">
        <Row label="Status">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold",
              status?.pill,
            )}
          >
            <span
              className={cn("size-1.5 rounded-full", status?.dot)}
              aria-hidden
            />
            {status?.label}
          </span>
        </Row>

        <Row label="Request ID">
          <span className="font-mono text-xs max-w-45 truncate">{receipt?.requestId}</span>
          <button
            type="button"
            onClick={copyRequestId}
            aria-label="Copy request ID"
            className="rounded p-1 text-slate-500 transition-colors hover:bg-white hover:text-slate-800"
          >
            {copied ? (
              <Check className="size-3.5 text-emerald-600" aria-hidden />
            ) : (
              <Copy className="size-3.5" aria-hidden />
            )}
          </button>
        </Row>

        <Row label="Service">{receipt?.request.service.name}</Row>

        <Row label="Payment Method">
          <CreditCard className="size-4 shrink-0 text-slate-600" aria-hidden />
          Stripe
        </Row>

        <Row label="Timestamp">
          <span className="font-medium">{formatDate(receipt?.paidAt)}</span>
        </Row>
      </dl>
    </div>
  );
}
