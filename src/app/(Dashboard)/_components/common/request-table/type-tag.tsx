import { cn } from "@/lib/utils";
import type { RequestType } from "@/types/requests-types";

export function TypeTag({ type }: { type: RequestType }) {
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
