import { BadgeCheck, MapPinPlus, Megaphone } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function ReportIssueCta() {
  return (
    <section aria-labelledby="report-cta-heading" className="w-full">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-blue-600 to-indigo-600 px-6 py-10 shadow-xl sm:px-10 sm:py-12 lg:px-12">
          {/* Soft highlight */}
          <div
            className="pointer-events-none absolute -right-16 top-1/2 size-80 -translate-y-1/2 rounded-full bg-white/10 blur-3xl"
            aria-hidden
          />

          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
            {/* Text */}
            <div className="max-w-2xl">
              <Badge className="gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white hover:bg-white/15">
                <Megaphone className="size-3.5" aria-hidden />
                Civic Engagement Initiative
              </Badge>

              <h2
                id="report-cta-heading"
                className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl"
              >
                Have a civic issue? Let your city know today.
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-blue-50 sm:text-base">
                Submit your complaint or service request in seconds. Help build
                a cleaner, safer, and better organized neighborhood for everyone
                in the city.
              </p>

              <p className="mt-4 flex items-start gap-2 text-xs font-medium text-blue-50">
                <BadgeCheck
                  className="mt-0.5 size-4 shrink-0 text-emerald-300"
                  aria-hidden
                />
                Over 94% of reported issues resolved within verified municipal
                SLA standards.
              </p>
            </div>

            {/* Actions */}
            <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-white font-semibold text-blue-700 shadow-lg hover:bg-blue-50"
              >
                <Link href="/requests/new">
                  <MapPinPlus className="size-4" aria-hidden />
                  Submit a Request
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/25 bg-white/10 font-semibold text-white hover:bg-white/20 hover:text-white"
              >
                <a href="tel:311">Contact 311 Support</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
