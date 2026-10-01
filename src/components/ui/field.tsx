import type { LucideIcon } from "lucide-react";
import { Label } from "@/components/ui/label";

type FieldProps = {
  id: string;
  label: string;
  icon: LucideIcon;
  error?: string;
  hint?: string;
  trailing?: React.ReactNode;
  children: React.ReactNode;
};

export function Field({
  id,
  label,
  icon: Icon,
  error,
  hint,
  trailing,
  children,
}: FieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="font-semibold text-slate-900">
        {label}
      </Label>
      <div className="relative">
        <Icon
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400"
          aria-hidden
        />
        {children}
        {trailing}
      </div>
      {error ? (
        <p role="alert" className="text-xs text-red-600">
          {error}
        </p>
      ) : hint ? (
        <p className="text-sm text-slate-600">{hint}</p>
      ) : null}
    </div>
  );
}
