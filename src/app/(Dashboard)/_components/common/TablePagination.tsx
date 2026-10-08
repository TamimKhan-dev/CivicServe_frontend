"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type TablePaginationProps = {
  /** Current page, starting at 1 */
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  /** Optional: enables the "Showing 11–20 of 45" summary */
  totalItems?: number;
  pageSize?: number;
  className?: string;
};

const range = (from: number, to: number) =>
  Array.from({ length: to - from + 1 }, (_, i) => from + i);

/** Builds [1, "…", 4, 5, 6, "…", 10] style page lists. */
function getPageRange(page: number, total: number, siblings = 1) {
  const maxVisible = siblings * 2 + 5;
  if (total <= maxVisible) return range(1, total);

  const left = Math.max(page - siblings, 1);
  const right = Math.min(page + siblings, total);
  const showLeftDots = left > 2;
  const showRightDots = right < total - 1;
  const edgeCount = 3 + siblings * 2;

  if (!showLeftDots && showRightDots) {
    return [...range(1, edgeCount), "…", total] as (number | "…")[];
  }
  if (showLeftDots && !showRightDots) {
    return [1, "…", ...range(total - edgeCount + 1, total)] as (number | "…")[];
  }
  return [1, "…", ...range(left, right), "…", total] as (number | "…")[];
}

export function TablePagination({
  page,
  totalPages,
  onPageChange,
  totalItems,
  pageSize,
  className,
}: TablePaginationProps) {
  const showSummary = totalItems !== undefined && pageSize !== undefined;
  const from = showSummary ? (page - 1) * pageSize + 1 : 0;
  const to = showSummary ? Math.min(page * pageSize, totalItems) : 0;

  return (
    <nav
      aria-label="Pagination"
      className={cn(
        "flex flex-col items-center gap-3 px-4 py-4 sm:flex-row sm:justify-between sm:px-6",
        className,
      )}
    >
      <p className="text-sm text-slate-600">
        {showSummary ? (
          <>
            Showing <span className="font-semibold text-slate-900">{from}</span>
            –<span className="font-semibold text-slate-900">{to}</span> of{" "}
            <span className="font-semibold text-slate-900">{totalItems}</span>
          </>
        ) : (
          <>
            Page <span className="font-semibold text-slate-900">{page}</span> of{" "}
            {totalPages}
          </>
        )}
      </p>

      <div className="flex items-center gap-1.5">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          aria-label="Previous page"
        >
          <ChevronLeft className="size-4" aria-hidden />
          <span className="hidden sm:inline">Previous</span>
        </Button>

        {/* Page numbers (tablet and up) */}
        <div className="hidden items-center gap-1.5 sm:flex">
          {getPageRange(page, totalPages).map((item, i) =>
            item === "…" ? (
              <span
                key={`dots-${i}`}
                className="px-1 text-sm text-slate-500"
                aria-hidden
              >
                …
              </span>
            ) : (
              <Button
                key={item}
                type="button"
                size="sm"
                variant={item === page ? "default" : "outline"}
                onClick={() => onPageChange(item)}
                aria-label={`Page ${item}`}
                aria-current={item === page ? "page" : undefined}
                className={cn(
                  "min-w-9",
                  item === page && "bg-blue-600 hover:bg-blue-700",
                )}
              >
                {item}
              </Button>
            ),
          )}
        </div>

        {/* Compact indicator (mobile) */}
        <span className="px-2 text-sm font-medium text-slate-700 sm:hidden">
          {page} / {totalPages}
        </span>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          aria-label="Next page"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="size-4" aria-hidden />
        </Button>
      </div>
    </nav>
  );
}
