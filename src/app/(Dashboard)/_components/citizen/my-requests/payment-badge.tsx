import { cn } from "@/lib/utils";
import type { PaymentStatus } from "@/types/requests-types";

const PAYMENT_STYLES: Record<PaymentStatus, { label: string; badge: string }> =
  {
    PENDING: { label: "Payment Due", badge: "bg-amber-50 text-amber-700" },
    PAID: { label: "Paid", badge: "bg-emerald-50 text-emerald-700" },
    FAILED: { label: "Payment Failed", badge: "bg-red-50 text-red-700" },
    CANCELLED: {
      label: "Payment Cancelled",
      badge: "bg-slate-100 text-slate-600",
    },
    REFUNDED: { label: "Refunded", badge: "bg-violet-50 text-violet-700" },
  };

export function PaymentBadge({
  status,
  className,
}: {
  status?: PaymentStatus | null;
  className?: string;
}) {
  const s = PAYMENT_STYLES[status ?? "PENDING"];

  return (
    <span
      className={cn(
        "inline-flex items-center whitespace-nowrap rounded-md px-2 py-0.5 text-[11px] font-semibold",
        s.badge,
        className,
      )}
    >
      {s.label}
    </span>
  );
}
