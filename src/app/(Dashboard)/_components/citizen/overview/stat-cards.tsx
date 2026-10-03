import type { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type StatCardProps = {
  label: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
  iconClass: string;
};

export function StatCard({
  label,
  value,
  description,
  icon: Icon,
  iconClass,
}: StatCardProps) {
  return (
    <Card className="gap-0 rounded-2xl bg-white py-0 shadow-sm">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <p className="text-xs font-semibold text-slate-600">{label}</p>
          <span
            className={cn(
              "flex size-9 shrink-0 items-center justify-center rounded-lg",
              iconClass,
            )}
          >
            <Icon className="size-4" aria-hidden />
          </span>
        </div>
        <p className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          {value}
        </p>
        <p className="mt-1 text-sm text-slate-600">{description}</p>
      </CardContent>
    </Card>
  );
}
