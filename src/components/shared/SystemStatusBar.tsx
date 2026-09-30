import { Phone, Timer } from "lucide-react";

import { Separator } from "@/components/ui/separator";

type SystemStatusBarProps = {
  status?: string;
  network?: string;
  avgResponse?: string;
  nonEmergency?: string;
};

export function SystemStatusBar({
  status = "All Municipal Systems Operational",
  network = "Metropolitan Dispatch Network v4.2",
  avgResponse = "18m",
  nonEmergency = "311",
}: SystemStatusBarProps) {
  return (
    <div className="w-full border-b bg-background text-sm">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-1 px-4 py-2 sm:px-6 lg:px-8">
        {/* Left: system status */}
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex items-center gap-2 font-medium text-foreground">
            <span className="relative flex size-2 shrink-0">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            <span className="truncate">{status}</span>
          </span>

          <Separator orientation="vertical" className="hidden h-4 md:block" />

          <span className="hidden text-muted-foreground md:inline">
            {network}
          </span>
        </div>

        {/* Right: quick info */}
        <div className="flex items-center gap-4 font-medium sm:gap-6">
          <span className="hidden items-center gap-1.5 text-blue-600 sm:flex">
            <Timer className="size-4 shrink-0" aria-hidden />
            Avg dispatch response: {avgResponse}
          </span>

          <a
            href={`tel:${nonEmergency}`}
            className="flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <Phone className="size-4 shrink-0" aria-hidden />
            Non-Emergency: {nonEmergency}
          </a>
        </div>
      </div>
    </div>
  );
}
