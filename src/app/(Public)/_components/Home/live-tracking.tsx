"use client";

import { ScanSearch } from "lucide-react";
import { useState } from "react";
import { useSingleRequest } from "@/hooks/requests/useRequests";
import { mapRequestToTicket } from "@/lib/map-request-to-ticket";
import { useAuth } from "@/providers/auth.provider";
import { TicketTimelineCard } from "./cards/ticket-timeline-card";
import { DEMO_REQUEST } from "./demo-data/demo-request";
import { TicketSearch } from "./other/ticket-search";
import { TicketTimelineSkeleton } from "./skeletons/ticket-timeline-skeleton";

export function LiveTracking() {
  const { isLoggedIn } = useAuth();
  const [requestId, setRequestId] = useState("");
  const { data, isLoading } = useSingleRequest(requestId, isLoggedIn);
  const request = data?.data;

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
            <TicketSearch
              onSearch={(trackingId: string) => setRequestId(trackingId)}
            />
          </div>
        </div>

        {/* Right */}
        <div className="lg:col-span-3">
          {isLoggedIn && requestId && isLoading ? (
            <TicketTimelineSkeleton />
          ) : request ? (
            <TicketTimelineCard ticket={mapRequestToTicket(request)} />
          ) : (
            <TicketTimelineCard
              ticket={request ?? mapRequestToTicket(DEMO_REQUEST)}
            />
          )}
        </div>
      </div>
    </section>
  );
}
