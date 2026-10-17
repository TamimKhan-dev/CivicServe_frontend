import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type Props = {
  icon: LucideIcon;
  label: string;
  value: ReactNode;
  sub?: ReactNode;
};

export function InfoItem({ icon: Icon, label, value, sub }: Props) {
  return (
    <div className="flex gap-3">
      <Icon className="mt-0.5 size-4 shrink-0 text-slate-400" aria-hidden />
      <div className="min-w-0 space-y-0.5">
        <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500">
          {label}
        </p>
        <p className="text-sm font-semibold text-slate-900">{value}</p>
        {sub && <div className="text-xs text-slate-500">{sub}</div>}
      </div>
    </div>
  );
}
