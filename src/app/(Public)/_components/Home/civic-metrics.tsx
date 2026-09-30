import {
  BadgeCheck,
  Building2,
  CheckCircle2,
  Network,
  Users,
} from "lucide-react";
import { type Metric, MetricCard } from "./cards/civic-metrics-card";

const METRICS: Metric[] = [
  {
    icon: CheckCircle2,
    value: "14,820+",
    label: "Resolved Public Issues",
    tag: "+12% MoM",
    iconClass: "bg-emerald-100 text-emerald-600",
    tagClass: "bg-emerald-100 text-emerald-700",
  },
  {
    icon: Network,
    value: "42",
    label: "Integrated City Services",
    tag: "Active 24/7",
    iconClass: "bg-sky-100 text-sky-600",
    tagClass: "bg-sky-100 text-sky-700",
  },
  {
    icon: Building2,
    value: "18",
    label: "City Departments",
    tag: "All Boroughs",
    iconClass: "bg-blue-100 text-blue-600",
    tagClass: "bg-blue-100 text-blue-700",
  },
  {
    icon: Users,
    value: "185K+",
    label: "Citizens Served",
    tag: "Registered",
    iconClass: "bg-purple-100 text-purple-600",
    tagClass: "bg-purple-100 text-purple-700",
  },
];

export function CivicMetrics() {
  return (
    <section
      aria-labelledby="civic-metrics-heading"
      className="w-full bg-white"
    >
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
              Operational Transparency
            </p>
            <h2
              id="civic-metrics-heading"
              className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl"
            >
              Civic Performance &amp; Real-time Metrics
            </h2>
          </div>
          <p className="flex items-center gap-2 text-sm text-slate-500">
            <BadgeCheck className="size-4 shrink-0" aria-hidden />
            Audited public municipal data updated every 15 minutes
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {METRICS.map((metric) => (
            <MetricCard key={metric.label} {...metric} />
          ))}
        </div>
      </div>
    </section>
  );
}
