"use client";

import {
  ArrowRight,
  Check,
  LayoutDashboard,
  Mail,
  Printer,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import SpinnerCustom from "@/app/loading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { usePaymentDetails } from "@/hooks/useRequests";
import { PaymentReceiptDetails } from "../_components/payment-receipt-details";

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { data, isPending } = usePaymentDetails(sessionId as string);
  const receipt = data?.data ?? {};

  return (
    <main className="flex min-h-dvh items-center justify-center bg-slate-50 p-4 sm:p-6">
      <div className="w-full max-w-md mx-auto mt-15">
        {isPending ? (
          <SpinnerCustom />
        ) : (
          <>
            <Card className="gap-0 overflow-hidden rounded-2xl bg-white py-0 shadow-xl">
              {/* Colored line on top */}
              <div className="h-1.5 bg-linear-to-r from-blue-600 via-sky-400 to-emerald-500" />

              <div className="p-6 sm:p-8">
                {/* Icon, title and subtitle */}
                <div className="flex flex-col items-center text-center">
                  <span className="flex size-20 items-center justify-center rounded-full bg-emerald-50">
                    <span className="flex size-12 items-center justify-center rounded-full bg-emerald-100">
                      <Check
                        className="size-6 text-emerald-800"
                        strokeWidth={3}
                        aria-hidden
                      />
                    </span>
                  </span>
                  <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900">
                    Payment Successful
                  </h1>
                  <p className="mt-1 max-w-xs text-sm text-slate-600">
                    Your municipal transaction has been processed and officially
                    recorded.
                  </p>
                </div>

                {/* Details (piece 1) */}
                <div className="mt-6">
                  <PaymentReceiptDetails receipt={receipt} />
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
                    <Link href="/citizen">
                      <LayoutDashboard className="size-4" aria-hidden />
                      Dashboard
                    </Link>
                  </Button>
                </div>

                {/* Print */}
                <button
                  type="button"
                  className="mx-auto mt-4 flex items-center gap-1.5 text-[11px] font-medium text-slate-600 transition-colors hover:text-slate-900"
                >
                  <Printer className="size-3.5" aria-hidden />
                  Print Municipal Receipt (PDF)
                </button>

                {/* Footer line inside the card */}
                <div className="mt-6 flex items-center justify-center gap-1.5 border-t pt-4 text-[11px] text-slate-500">
                  <ShieldCheck
                    className="size-3.5 text-emerald-600"
                    aria-hidden
                  />
                  Official City Transaction • 256-bit Encrypted
                </div>
              </div>
            </Card>
            <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs text-slate-600">
              <Mail className="size-3.5 shrink-0 text-blue-600" aria-hidden />A
              confirmation receipt has been dispatched to citizen email.
            </p>
          </>
        )}
      </div>
    </main>
  );
}
