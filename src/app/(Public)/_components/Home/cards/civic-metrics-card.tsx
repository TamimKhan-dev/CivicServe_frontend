import type { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type Metric = {
  icon: LucideIcon;
  value: string;
  label: string;
  tag: string;
  iconClass: string;
  tagClass: string;
};

export function MetricCard({
  icon: Icon,
  value,
  label,
  tag,
  iconClass,
  tagClass,
}: Metric) {
  return (
    <Card className="gap-0 rounded-2xl bg-slate-50 py-0 shadow-none">
      <CardContent className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <span
            className={cn(
              "flex size-10 shrink-0 items-center justify-center rounded-xl",
              iconClass,
            )}
          >
            <Icon className="size-5" aria-hidden />
          </span>
          <Badge
            variant="secondary"
            className={cn("rounded-md text-[11px] font-semibold", tagClass)}
          >
            {tag}
          </Badge>
        </div>
        <p className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          {value}
        </p>
        <p className="mt-1 text-sm text-slate-600">{label}</p>
      </CardContent>
    </Card>
  );
}
