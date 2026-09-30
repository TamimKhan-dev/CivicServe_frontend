import type { LucideIcon } from "lucide-react";
import { Check, Clock, Droplet, Info, MapPin, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type StepStatus = "done" | "active" | "pending";

export type TimelineStep = {
  title: string;
  description: string;
  time: string;
  status: StepStatus;
};

export type TrackedTicket = {
  id: string;
  priority: string;
  category: string;
  title: string;
  location: string;
  targetLabel: string;
  targetValue: string;
  steps: TimelineStep[];
};

const STEP_STYLES: Record<
  StepStatus,
  {
    circle: string;
    card: string;
    title: string;
    text: string;
    icon: LucideIcon;
  }
> = {
  done: {
    circle: "bg-emerald-600 text-white",
    card: "bg-slate-50",
    title: "text-slate-900",
    text: "text-slate-500",
    icon: Check,
  },
  active: {
    circle: "bg-blue-600 text-white ring-4 ring-blue-100",
    card: "border border-blue-200 bg-blue-50",
    title: "text-blue-700",
    text: "text-slate-600",
    icon: RefreshCw,
  },
  pending: {
    circle: "bg-slate-100 text-slate-400",
    card: "bg-slate-50 opacity-60",
    title: "text-slate-500",
    text: "text-slate-400",
    icon: Info,
  },
};

export function TicketTimelineCard({
  ticket,
  icon: HeaderIcon = Droplet,
  className,
}: {
  ticket: TrackedTicket;
  icon?: LucideIcon;
  className?: string;
}) {
  return (
    <Card
      className={cn("gap-0 rounded-2xl bg-white py-0 shadow-xl", className)}
    >
      <CardContent className="p-5 sm:p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b pb-5">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-base font-bold text-blue-600">
                {ticket.id}
              </span>
              <Badge className="rounded-full bg-red-50 text-[11px] font-semibold text-red-600 hover:bg-red-50">
                {ticket.priority}
              </Badge>
              <Badge className="rounded-full bg-blue-50 text-[11px] font-semibold text-blue-600 hover:bg-blue-50">
                {ticket.category}
              </Badge>
            </div>
            <h3 className="mt-2 text-xl font-bold text-slate-900 sm:text-2xl">
              {ticket.title}
            </h3>
            <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
              <MapPin className="size-3.5 shrink-0" aria-hidden />
              {ticket.location}
            </p>
          </div>
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 sm:size-11">
            <HeaderIcon className="size-5" aria-hidden />
          </span>
        </div>

        {/* Target window */}
        <div className="mt-5 flex flex-col gap-1 rounded-lg border border-blue-100 bg-blue-50/60 px-3 py-2.5 text-xs sm:flex-row sm:items-center sm:justify-between">
          <span className="flex items-center gap-2 font-medium text-slate-600">
            <Clock className="size-4 shrink-0 text-blue-600" aria-hidden />
            {ticket.targetLabel}
          </span>
          <span className="font-bold text-blue-700">{ticket.targetValue}</span>
        </div>

        {/* Timeline */}
        <ol className="mt-6">
          {ticket.steps.map((step, i) => {
            const s = STEP_STYLES[step.status];
            const StepIcon = s.icon;
            const isLast = i === ticket.steps.length - 1;

            return (
              <li
                key={step.title}
                aria-current={step.status === "active" ? "step" : undefined}
                className={cn(
                  "relative pb-4 pl-12",
                  !isLast &&
                    "before:absolute before:-bottom-3 before:left-4 before:top-10 before:w-px before:-translate-x-1/2 before:bg-slate-200",
                  isLast && "pb-0",
                )}
              >
                <span
                  className={cn(
                    "absolute left-0 top-3 z-10 flex size-8 items-center justify-center rounded-full",
                    s.circle,
                  )}
                >
                  <StepIcon className="size-4" aria-hidden />
                </span>

                <div
                  className={cn(
                    "flex flex-col gap-1 rounded-xl px-4 py-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4",
                    s.card,
                  )}
                >
                  <div className="min-w-0">
                    <p
                      className={cn(
                        "flex flex-wrap items-center gap-2 text-sm font-bold",
                        s.title,
                      )}
                    >
                      {step.title}
                      {step.status === "active" && (
                        <Badge className="rounded bg-blue-600 px-1.5 py-0 text-[9px] font-bold uppercase tracking-wide text-white hover:bg-blue-600">
                          Active Now
                        </Badge>
                      )}
                    </p>
                    <p className={cn("mt-0.5 text-xs", s.text)}>
                      {step.description}
                    </p>
                  </div>
                  <span
                    className={cn(
                      "shrink-0 text-xs",
                      step.status === "active"
                        ? "font-semibold text-blue-600"
                        : "text-slate-400",
                    )}
                  >
                    {step.time}
                  </span>
                </div>
              </li>
            );
          })}
        </ol>
      </CardContent>
    </Card>
  );
}
