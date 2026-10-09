"use client";

import { Check, Copy, CreditCard } from "lucide-react";
import { useState } from "react";
import { cn, formatDate } from "@/lib/utils";

export type PaymentReceipt = {
  id: string;
  amount: string;
  createdAt: string;
  paidAt: string;
  paymentMethod: string;
  request: {
    service: {
      name: string;
    };
  };
  requestId: string;
  status: "PAID" | "PENDING";
  transactionId: string;
  updatedAt: string;
  userId: string;
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

export function ReceiptRow({
  label,
  children,
  labelClassName,
}: {
  label: React.ReactNode;
  children: React.ReactNode;
  labelClassName?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 text-sm">
      <dt className={cn("shrink-0 text-slate-600", labelClassName)}>{label}</dt>
      <dd className="flex min-w-0 items-center justify-end gap-2 text-right font-semibold text-slate-900">
        {children}
      </dd>
    </div>
  );
}

export function CopyIdButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      console.log("Something went wrong with the Payment!");
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label="Copy request ID"
      className="rounded p-1 text-slate-500 transition-colors hover:bg-white hover:text-slate-800"
    >
      {copied ? (
        <Check className="size-3.5 text-emerald-600" aria-hidden />
      ) : (
        <Copy className="size-3.5" aria-hidden />
      )}
    </button>
  );
}

export function PaymentReceiptDetails({
  receipt,
}: {
  receipt: PaymentReceipt;
}) {
  const status = STATUS_STYLES[receipt.status];
  console.log(receipt);

  return (
    <div className="rounded-xl bg-indigo-50/70 p-5">
      {/* Amount */}
      <div className="flex items-baseline justify-between gap-4 pb-4">
        <span className="text-[11px] font-bold uppercase tracking-wide text-slate-700">
          Amount Paid
        </span>
        <span className="flex items-baseline gap-1">
          <span className="text-3xl font-extrabold tracking-tight text-slate-900">
            {receipt.amount}
          </span>
          <span className="text-[10px] font-semibold text-slate-500">
            {receipt.amount}
          </span>
        </span>
      </div>

      {/* Details list */}
      <dl className="divide-y divide-slate-200/70 border-t border-slate-200/70">
        <ReceiptRow label="Status">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold",
              status.pill,
            )}
          >
            <span
              className={cn("size-1.5 rounded-full", status.dot)}
              aria-hidden
            />
            {status.label}
          </span>
        </ReceiptRow>

        <ReceiptRow label="Request ID">
          <span className="font-mono text-xs max-w-25 truncate">
            {receipt.requestId}
          </span>
          <CopyIdButton value={receipt.requestId} />
        </ReceiptRow>

        <ReceiptRow label="Service">{receipt.request.service.name}</ReceiptRow>

        <ReceiptRow label="Payment Method">
          <CreditCard className="size-4 shrink-0 text-slate-600" aria-hidden />
          {receipt.paymentMethod}
        </ReceiptRow>

        <ReceiptRow label="Timestamp">
          <span className="font-medium">{formatDate(receipt.paidAt)}</span>
        </ReceiptRow>
      </dl>
    </div>
  );
}
