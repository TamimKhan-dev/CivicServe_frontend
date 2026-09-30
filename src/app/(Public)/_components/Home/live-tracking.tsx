import { ScanSearch } from "lucide-react";
import {
  TicketTimelineCard,
  type TrackedTicket,
} from "./cards/ticket-timeline-card";
import { TicketSearch } from "./other/ticket-search";

// Demo data.
const DEMO_TICKET: TrackedTicket = {
  id: "#CV-84912",
  priority: "High Priority",
  category: "Public Utility",
  title: "Water Main Leakage & Valve Repair",
  location: "Maple Ave & 12th St, Sector 04",
  targetLabel: "Municipal Target Resolution Window",
  targetValue: "Guaranteed Within 4 Hours",
  steps: [
    {
      title: "Request Received & Verified",
      description:
        "Logged with high-accuracy GPS coordinates & citizen photo verification.",
      time: "Today, 09:15 AM",
      status: "done",
    },
    {
      title: "Assigned: Dept. of Water Works",
      description:
        "Rapid Response Team Alpha deployed with repair excavator unit.",
      time: "Today, 11:30 AM",
      status: "done",
    },
    {
      title: "Field Crew Dispatched & On-Site",
      description:
        "Excavation crew testing bypass valve pressure and preparing replacement gasket.",
      time: "Live Status",
      status: "active",
    },
    {
      title: "Resolution & Sign-off",
      description:
        "Post-repair asphalt resurfacing, cleanup, and citizen satisfaction rating.",
      time: "Estimated 2:00 PM",
      status: "pending",
    },
  ],
};

export function LiveTracking() {
  return (
    <section
      id="live-tracking"
      aria-labelledby="live-tracking-heading"
      className="w-full"
    >
      <div className="mx-auto grid max-w-7xl items-start gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-5 lg:gap-10 lg:px-8">
        {/* Left */}
        <div className="lg:col-span-2">
          <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-blue-600">
            <ScanSearch className="size-3.5" aria-hidden />
            Transparency Hub
          </p>
          <h2
            id="live-tracking-heading"
            className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl"
          >
            Live Request Tracking
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
            Follow municipal work crews in real time from initial citizen
            dispatch to successful post-repair sign-off.
          </p>

          <div className="mt-6">
            <TicketSearch defaultValue="#CV-84912" />
          </div>
        </div>

        {/* Right */}
        <div className="lg:col-span-3">
          <TicketTimelineCard ticket={DEMO_TICKET} />
        </div>
      </div>
    </section>
  );
}
