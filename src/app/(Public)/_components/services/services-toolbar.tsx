"use client";

import { RotateCcw, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ServicesToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  resultCount: number;
  onReset: () => void;
};

export function ServicesToolbar({
  search,
  onSearchChange,
  resultCount,
  onReset,
}: ServicesToolbarProps) {
  const hasSearch = search.trim() !== "";

  return (
    <div className="space-y-6">
      {/* Heading */}
      <div>
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
            <span className="size-1.5 rounded-full bg-blue-600" aria-hidden />
            Civic Directory
          </span>
          <span className="text-slate-500">Metropolitan Public Services</span>
        </div>
        <h1 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">
          Municipal Services
        </h1>
        <p className="mt-2 max-w-xl text-sm text-slate-600 sm:text-base">
          Explore municipal services, review dispatch timelines, and submit
          localized requests directly to departmental operations.
        </p>
      </div>

      {/* Search */}
      <div className="flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1 sm:max-w-sm">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400"
              aria-hidden
            />
            <Input
              type="search"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search services or departments..."
              aria-label="Search services or departments"
              className="pl-9"
            />
          </div>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onReset}
            disabled={!hasSearch}
            className="justify-start text-slate-600 sm:justify-center"
          >
            <RotateCcw className="size-3.5" aria-hidden />
            Reset
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
          <p aria-live="polite">
            Showing{" "}
            <span className="font-semibold text-slate-900">{resultCount}</span>{" "}
            municipal {resultCount === 1 ? "service" : "services"}
          </p>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
            <span
              className="size-1.5 rounded-full bg-emerald-500"
              aria-hidden
            />
            Dispatch Live
          </span>
        </div>
      </div>
    </div>
  );
}
