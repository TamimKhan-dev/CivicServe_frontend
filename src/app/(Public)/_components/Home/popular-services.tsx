import {
  ArrowRight,
  Droplet,
  LayoutGrid,
  Lightbulb,
  Shield,
  TrafficCone,
  Trash2,
  TreePine,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ServiceCard, type ServiceCardProps } from "./cards/services-cards";

// Temporary dummy Data
const SERVICES: ServiceCardProps[] = [
  {
    href: "/services/roads-infrastructure",
    icon: TrafficCone,
    title: "Roads & Infrastructure",
    description:
      "Pothole repair, pedestrian sidewalk hazards, traffic signal timing faults, and street resurfacing requests.",
    category: "Most Requested",
    categoryClass: "bg-blue-50 text-blue-600",
    note: "98% on-time fix",
    iconClass: "bg-blue-100 text-blue-600",
    noteDotClass: "bg-emerald-500",
    noteTextClass: "text-emerald-700",
  },
  {
    href: "/services/waste-sanitation",
    icon: Trash2,
    title: "Waste & Sanitation",
    description:
      "Missed trash pickups, large bulk item scheduling, hazardous waste disposal, and replacement recycling bins.",
    category: "Sanitation",
    note: "24h pickup cycle",
    iconClass: "bg-sky-100 text-sky-600",
    noteDotClass: "bg-emerald-500",
    noteTextClass: "text-emerald-700",
  },
  {
    href: "/services/water-utilities",
    icon: Droplet,
    title: "Water & Utilities",
    description:
      "Main water leaks, residential meter inspections, abnormal pressure inquiries, and municipal water testing.",
    category: "Utilities",
    note: "High Priority SLA",
    iconClass: "bg-cyan-100 text-cyan-600",
    noteDotClass: "bg-amber-500",
    noteTextClass: "text-amber-600",
  },
  {
    href: "/services/streetlights-power",
    icon: Lightbulb,
    title: "Streetlights & Power",
    description:
      "Dark street lamps, flickering fixtures, damaged public light poles, and pedestrian pathway illumination.",
    category: "Electrical",
    note: "96% on-time fix",
    iconClass: "bg-amber-100 text-amber-600",
    noteDotClass: "bg-emerald-500",
    noteTextClass: "text-emerald-700",
  },
  {
    href: "/services/public-safety-code",
    icon: Shield,
    title: "Public Safety & Code",
    description:
      "Building code non-compliance, noise ordinances, animal control dispatches, and illegal dumping/signage.",
    category: "Compliance",
    note: "Officer Dispatched",
    iconClass: "bg-slate-100 text-slate-700",
    noteDotClass: "bg-slate-400",
    noteTextClass: "text-slate-600",
  },
  {
    href: "/services/parks-green-space",
    icon: TreePine,
    title: "Parks & Green Space",
    description:
      "Hazardous branch trimming, playground equipment repairs, irrigation leaks, and community trail cleanups.",
    category: "Recreation",
    note: "Park Board Verified",
    iconClass: "bg-emerald-100 text-emerald-600",
    noteDotClass: "bg-emerald-500",
    noteTextClass: "text-emerald-700",
  },
];

export function PopularServices() {
  return (
    <section
      id="services"
      aria-labelledby="popular-services-heading"
      className="w-full"
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-blue-600">
              <LayoutGrid className="size-3.5" aria-hidden />
              Municipal Directory
            </p>
            <h2
              id="popular-services-heading"
              className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl"
            >
              Popular Civic Services
            </h2>
            <p className="mt-2 text-sm text-slate-600 sm:text-base">
              Access everyday municipal services instantly without waiting in
              queue at City Hall.
            </p>
          </div>
          <Link
            href="/services"
            className="hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 sm:inline-flex"
          >
            Explore All 42 Civic Services
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <ServiceCard key={service.href} {...service} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full bg-white font-semibold sm:w-auto"
          >
            <Link href="/services">
              Explore All 42 Municipal Civic Services
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
