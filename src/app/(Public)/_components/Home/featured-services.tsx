"use client";

import { ArrowRight, LayoutGrid } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useServices } from "@/hooks/useRequests";
import { ServiceCard } from "../services/service-card";
import { ServiceCardSkeleton } from "../services/service-card-skeleton";

const FEATURED_COUNT = 3;

export function FeaturedServices() {
  const { data, isPending, isError } = useServices();

  const services = (data?.data ?? []).filter((s) => s.isActive);
  const featured = services.slice(0, FEATURED_COUNT);

  if (isError || (!isPending && featured.length === 0)) return null;

  const exploreLabel = isPending
    ? "Explore All Civic Services"
    : `Explore All ${services.length} Civic Services`;

  return (
    <section
      id="services"
      aria-labelledby="featured-services-heading"
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
              id="featured-services-heading"
              className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl"
            >
              Featured Civic Services
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
            {exploreLabel}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>

        <ul
          className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
          aria-busy={isPending}
        >
          {isPending
            ? Array.from({ length: FEATURED_COUNT }, (_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: static placeholders
                <li key={i}>
                  <ServiceCardSkeleton />
                </li>
              ))
            : featured.map((service) => (
                <li key={service.id}>
                  <ServiceCard service={service} />
                </li>
              ))}
        </ul>

        <div className="mt-10 flex justify-center sm:hidden">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full bg-white font-semibold"
          >
            <Link href="/services">
              {exploreLabel}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
