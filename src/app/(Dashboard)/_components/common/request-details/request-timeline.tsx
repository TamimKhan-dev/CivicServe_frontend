import { Check, Flag, Info, Wrench, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { RequestDetails } from "./dummy-requests";
import { buildTimelineSteps, getStageLabel } from "./timeline-steps";

const STATE = {
  DONE: {
    icon: Check,
    circle: "bg-emerald-500 text-white",
    title: "text-slate-900",
    tag: "bg-slate-100 text-slate-600",
  },
  ACTIVE: {
    icon: Wrench,
    circle: "bg-blue-600 text-white",
    title: "text-blue-600",
    tag: "bg-blue-50 text-blue-700",
  },
  PENDING: {
    icon: Flag,
    circle: "bg-white text-slate-400 ring-1 ring-slate-200",
    title: "text-slate-400",
    tag: "bg-slate-100 text-slate-500",
  },
  REJECTED: {
    icon: X,
    circle: "bg-red-500 text-white",
    title: "text-red-600",
    tag: "bg-red-50 text-red-700",
  },
} as const;

export function RequestTimeline({ request }: { request: RequestDetails }) {
  const steps = buildTimelineSteps(request);

  return (
    <Card className="gap-0 rounded-2xl bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4 pb-6">
        <h2 className="flex items-center gap-3 text-lg font-bold text-slate-900">
          <span className="h-5 w-1 rounded-full bg-slate-900" aria-hidden />
          Request Timeline
        </h2>
        <span className="text-xs text-slate-500">{getStageLabel(request)}</span>
      </div>

      <ol>
        {steps.map((step, i) => {
          const s = STATE[step.state];
          const Icon = s.icon;
          const isLast = i === steps.length - 1;

          return (
            <li
              key={step.id}
              className={cn("relative flex gap-4", !isLast && "pb-8")}
            >
              {!isLast && (
                <span
                  className="absolute bottom-0 left-3.5 top-7 w-px bg-slate-200"
                  aria-hidden
                />
              )}

              <span
                className={cn(
                  "relative flex size-7 shrink-0 items-center justify-center rounded-full",
                  s.circle,
                )}
              >
                <Icon className="size-3.5" aria-hidden />
              </span>

              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className={cn("text-sm font-semibold", s.title)}>
                    {step.title}
                  </p>
                  <span
                    className={cn(
                      "rounded px-1.5 py-px text-[10px] font-semibold uppercase tracking-wide",
                      s.tag,
                    )}
                  >
                    {step.tag}
                  </span>
                </div>
                <p className="text-xs text-slate-500">{step.description}</p>

                {step.note && (
                  <div className="mt-3 flex gap-2 rounded-lg border bg-slate-50 p-3 text-xs text-slate-600">
                    <Info
                      className="mt-0.5 size-3.5 shrink-0 text-slate-400"
                      aria-hidden
                    />
                    <p>
                      <span className="font-semibold">Staff Note:</span>{" "}
                      {step.note}
                    </p>
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </Card>
  );
}
