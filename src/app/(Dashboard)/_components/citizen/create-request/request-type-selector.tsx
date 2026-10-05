"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import type { RequestType } from "@/types/requests-types";

const OPTIONS: {
  value: RequestType;
  label: string;
  tag: string;
  tagClass: string;
}[] = [
  {
    value: "COMPLAINT_REQUEST",
    label: "Complaint Request",
    tag: "Standard",
    tagClass: "bg-slate-200 text-slate-600",
  },
  {
    value: "SERVICE_REQUEST",
    label: "Service Request (Paid)",
    tag: "Paid Service",
    tagClass: "bg-blue-100 text-blue-700",
  },
];

type RequestTypeSelectorProps = {
  value: RequestType;
  onChange: (value: RequestType) => void;
};

export function RequestTypeSelector({
  value,
  onChange,
}: RequestTypeSelectorProps) {
  return (
    <RadioGroup
      value={value}
      onValueChange={(v) => onChange(v as RequestType)}
      aria-label="Request type"
      className="grid gap-1 rounded-xl bg-indigo-50/70 p-1.5 sm:grid-cols-2"
    >
      {OPTIONS.map((o) => (
        <Label
          key={o.value}
          htmlFor={`request-type-${o.value}`}
          className={cn(
            "flex cursor-pointer items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold text-slate-900 transition-colors",
            value === o.value ? "bg-white shadow-sm" : "hover:bg-white/60",
          )}
        >
          <RadioGroupItem id={`request-type-${o.value}`} value={o.value} />
          <span className="flex-1">{o.label}</span>
          <span
            className={cn(
              "rounded-full px-2.5 py-0.5 text-[11px] font-medium",
              o.tagClass,
            )}
          >
            {o.tag}
          </span>
        </Label>
      ))}
    </RadioGroup>
  );
}
