import { Wrench } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

function PulseDot({
  colorClass,
  className,
}: {
  colorClass: string;
  className?: string;
}) {
  return (
    <span
      className={cn("relative flex size-2 shrink-0", className)}
      aria-hidden
    >
      <span
        className={cn(
          "absolute inline-flex size-full animate-ping rounded-full opacity-70 motion-reduce:animate-none",
          colorClass,
        )}
      />
      <span
        className={cn(
          "relative inline-flex size-full rounded-full",
          colorClass,
        )}
      />
    </span>
  );
}

type FloatingTagProps = {
  district: string;
  title: string;
  status: string;
  dotClass: string;
  statusClass: string;
  className?: string;
};

function FloatingTag({
  district,
  title,
  status,
  dotClass,
  statusClass,
  className,
}: FloatingTagProps) {
  return (
    <div
      className={cn(
        "absolute flex min-w-0 items-center gap-2 rounded-lg border bg-white px-2.5 py-2 shadow-md sm:gap-3 sm:px-3",
        className,
      )}
    >
      <div className="min-w-0">
        <p className="flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-wide text-slate-500 sm:text-[10px]">
          <PulseDot colorClass={dotClass} className="size-1.5" />
          <span className="truncate">{district}</span>
        </p>
        <p className="truncate text-xs font-semibold text-slate-900 sm:text-sm">
          {title}
        </p>
      </div>
      <span
        className={cn(
          "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium",
          statusClass,
        )}
      >
        {status}
      </span>
    </div>
  );
}

export function RadarCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "w-full rounded-2xl border bg-white p-4 shadow-xl sm:p-5",
        className,
      )}
    >
      {/* Header */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
        <p className="flex min-w-0 items-center gap-2 text-sm font-medium text-slate-800">
          <PulseDot colorClass="bg-blue-600" />
          <span className="truncate">Live Municipal Dispatch Radar</span>
        </p>
        <Badge
          variant="secondary"
          className="shrink-0 bg-slate-100 text-[11px] font-normal text-slate-600"
        >
          Auto-synced
        </Badge>
      </div>

      {/* Map */}
      <div
        className="relative h-56 overflow-hidden rounded-xl border bg-slate-50 sm:h-64"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgb(226 232 240 / 0.6) 1px, transparent 1px), linear-gradient(to bottom, rgb(226 232 240 / 0.6) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
        role="img"
        aria-label="Map showing active streetlight upgrade and water main test"
      >
        <svg
          viewBox="0 0 400 260"
          preserveAspectRatio="none"
          className="absolute inset-0 size-full"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M0 200 C 90 190, 130 120, 220 130 S 350 60, 400 20"
            stroke="#BFDBFE"
            strokeWidth="2"
          />
          <path
            d="M0 120 C 100 100, 160 180, 260 170 S 360 130, 400 150"
            stroke="#DBEAFE"
            strokeWidth="2"
          />
        </svg>

        <div className="absolute bottom-6 right-6 size-16 rounded-full bg-emerald-200/60 blur-xl sm:size-20" />

        <FloatingTag
          district="Oakwood District"
          title="Streetlight Upgrade"
          status="Active"
          dotClass="bg-blue-600"
          statusClass="bg-blue-50 text-blue-600"
          className="left-[4%] top-[14%] max-w-[90%]"
        />

        <FloatingTag
          district="Civic Center"
          title="Water Main Test"
          status="In Progress"
          dotClass="bg-emerald-500"
          statusClass="bg-emerald-50 text-emerald-600"
          className="right-[4%] top-[50%] max-w-[90%] sm:left-[34%] sm:right-auto"
        />

        <span className="absolute bottom-2 left-2 rounded-md bg-white/80 px-2 py-1 text-[9px] font-medium uppercase tracking-wide text-slate-500 sm:text-[10px]">
          Sector 04 Realtime Feeds
        </span>
      </div>

      {/* Ticket row */}
      <div className="mt-4 flex flex-col gap-3 rounded-xl border bg-slate-50 p-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <Wrench className="size-4" aria-hidden />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-900 sm:truncate">
              Pothole repair on 4th Ave &amp; Main
            </p>
            <p className="text-xs text-slate-500 sm:truncate">
              Ticket #CV-77809 • DPW Road Crew #3 Assigned
            </p>
          </div>
        </div>
        <Badge className="w-fit shrink-0 gap-1.5 bg-emerald-100 text-[11px] font-medium text-emerald-700 hover:bg-emerald-100">
          <PulseDot colorClass="bg-emerald-500" className="size-1.5" />
          Est. 48 hrs
        </Badge>
      </div>
    </div>
  );
}
