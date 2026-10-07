"use client";

import {
  ArrowLeft,
  ArrowRight,
  CircleMinus,
  ExternalLink,
  Fingerprint,
  ShieldCheck,
  X,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import SpinnerCustom from "@/app/loading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useSingleRequest } from "@/hooks/useRequests";
import {
  CopyIdButton,
  ReceiptRow,
} from "../_components/payment-receipt-details";

const labelClass = "text-xs font-bold text-slate-700";

export default function PaymentCancel() {
  const requestId = useSearchParams().get("requestId");
  const { data, isPending } = useSingleRequest(requestId as string);
  const payment = data?.data ?? {};

  console.log(payment);

  return (
    <main className="flex min-h-dvh items-center justify-center bg-slate-50 p-4 sm:p-6">
      {isPending ? (
        <SpinnerCustom />
      ) : (
        <div className="w-full max-w-lg">
          <Card className="gap-0 overflow-hidden rounded-2xl bg-white py-0 shadow-xl">
            {/* Red line on top */}
            <div className="h-1.5 bg-linear-to-r from-red-800 via-red-600 to-red-400" />

            <div className="p-6 sm:p-8">
              {/* Icon, title and messages */}
              <div className="flex flex-col items-center text-center">
                <span className="flex size-20 items-center justify-center rounded-full bg-red-50">
                  <span className="flex size-14 items-center justify-center rounded-full bg-red-100">
                    <span className="flex size-9 items-center justify-center rounded-full bg-red-700">
                      <X
                        className="size-5 text-white"
                        strokeWidth={3}
                        aria-hidden
                      />
                    </span>
                  </span>
                </span>

                <p className="mt-4 text-[11px] font-bold uppercase tracking-widest text-red-700">
                  Transaction Incomplete
                </p>
                <h1 className="mt-1 font-serif text-3xl font-bold tracking-tight text-slate-900">
                  Payment Cancelled
                </h1>
                <p className="mt-3 text-sm text-slate-700">
                  Your payment was cancelled. No payment has been completed.
                </p>
                <p className="mt-1 max-w-sm text-xs text-slate-500">
                  Your account has not been charged, and your service request
                  details have been safely retained as pending.
                </p>
              </div>

              {/* Payment status panel */}
              <div className="mt-6 rounded-xl bg-indigo-50/70 p-5">
                <div className="flex items-center justify-between gap-3 pb-3">
                  <span className="font-serif text-xs font-bold uppercase tracking-wide text-slate-700">
                    Payment Status
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-700">
                    <span
                      className="size-1.5 rounded-full bg-red-600"
                      aria-hidden
                    />
                    Cancelled
                  </span>
                </div>

                <dl className="divide-y divide-slate-200/70 border-t border-slate-200/70">
                  <ReceiptRow label="Request ID" labelClassName={labelClass}>
                    <span className="font-mono text-sm font-bold max-w-25 truncate">
                      {payment?.id}
                    </span>
                    <CopyIdButton value={payment?.id} />
                  </ReceiptRow>

                  <ReceiptRow
                    label="Municipal Service"
                    labelClassName={labelClass}
                  >
                    <div>
                      <p className="font-serif text-base font-bold">
                        {payment?.service?.name}
                      </p>
                    </div>
                  </ReceiptRow>

                  <ReceiptRow label="Applicant" labelClassName={labelClass}>
                    <span className="font-serif font-medium">
                      {payment?.user?.name}
                    </span>
                  </ReceiptRow>

                  <ReceiptRow
                    label={
                      <div>
                        <p className="text-xs font-bold text-slate-900">
                          Remaining Amount Due
                        </p>
                        <p className="mt-0.5 flex items-center gap-1 text-[11px] font-medium text-red-700">
                          <CircleMinus className="size-3" aria-hidden />
                          Payment outstanding • Zero charged
                        </p>
                      </div>
                    }
                  >
                    <span className="flex items-baseline gap-1">
                      <span className="font-serif text-2xl font-bold">
                        {payment?.payment?.amount}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-500">
                        USD
                      </span>
                    </span>
                  </ReceiptRow>
                </dl>
              </div>

              {/* Gateway strip */}
              <div className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-indigo-50/70 px-3 py-2.5 text-center text-[11px] font-semibold text-slate-700">
                <ShieldCheck
                  className="size-4 shrink-0 text-emerald-600"
                  aria-hidden
                />
                Official Municipal Gateway • 0.00 USD Debited from Source
              </div>

              {/* Buttons */}
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <Button
                  asChild
                  className="h-11 bg-blue-700 font-semibold hover:bg-blue-800"
                >
                  <Link href="/">
                    Return Home
                    <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="secondary"
                  className="h-11 bg-indigo-50 font-semibold text-slate-800 hover:bg-indigo-100"
                >
                  <Link href="/citizen/my-requests">
                    <ArrowLeft className="size-4" aria-hidden />
                    Back to My Requests
                  </Link>
                </Button>
              </div>

              {/* Notes */}
              <p className="mt-5 text-center text-xs text-slate-600">
                A notification regarding this cancelled session has been
                registered in your citizen records.
              </p>
              <p className="mt-2 flex flex-wrap items-center justify-center gap-x-1.5 text-center text-xs">
                <span className="font-semibold text-slate-700">
                  Questions regarding this filing?
                </span>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1 font-semibold text-blue-700 hover:text-blue-800"
                >
                  Contact Municipal Support
                  <ExternalLink className="size-3" aria-hidden />
                </Link>
              </p>
            </div>

            {/* Bottom bar */}
            <div className="flex flex-col gap-1 border-t bg-indigo-50/60 px-6 py-3 text-[11px] text-slate-600 sm:flex-row sm:items-center sm:justify-between">
              <span className="flex items-center gap-1.5 font-mono">
                <Fingerprint className="size-3.5 shrink-0" aria-hidden />
                Request ID: {payment?.id}
              </span>
              <span className="font-serif">
                City of Metropolis • Dept. of Revenue
              </span>
            </div>
          </Card>
        </div>
      )}
    </main>
  );
}
