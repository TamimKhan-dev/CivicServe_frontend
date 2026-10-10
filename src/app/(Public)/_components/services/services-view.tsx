"use client";

import { useState } from "react";
import { useServices } from "@/hooks/useRequests";
import { ServiceCard } from "./service-card";
import { ServiceCardSkeleton } from "./service-card-skeleton";
import { ServicesEmptyState } from "./service-empty-state";
import { ServicesToolbar } from "./services-toolbar";

export function ServicesView() {
  const { data, isPending, isError } = useServices();
  const [search, setSearch] = useState("");
  const services = (data?.data ?? []).filter((s) => s.isActive);

  const query = search.trim().toLowerCase();

  const filtered = services.filter(
    (service) =>
      query === "" ||
      service.name.toLowerCase().includes(query) ||
      service.department.name.toLowerCase().includes(query),
  );

  return (
    <div className="space-y-6">
      <ServicesToolbar
        search={search}
        onSearchChange={setSearch}
        resultCount={filtered.length}
        onReset={() => setSearch("")}
      />

      {isPending ? (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, i) => (
            <li key={i}>
              <ServiceCardSkeleton />
            </li>
          ))}
        </ul>
      ) : isError ? (
        <p className="py-12 text-center text-sm text-red-600">
          Could not load services. Please try again later.
        </p>
      ) : filtered.length === 0 ? (
        <ServicesEmptyState search={search} onReset={() => setSearch("")} />
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((service) => (
            <li key={service.id}>
              <ServiceCard service={service} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
