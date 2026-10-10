import { Building2, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

type ServicesEmptyStateProps = {
  search: string;
  onReset: () => void;
};

export function ServicesEmptyState({
  search,
  onReset,
}: ServicesEmptyStateProps) {
  const hasSearch = search.trim() !== "";
  const Icon = hasSearch ? SearchX : Building2;

  return (
    <div className="flex flex-col items-center rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
      <span className="flex size-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
        <Icon className="size-6" aria-hidden />
      </span>

      <h2 className="mt-4 text-lg font-semibold text-slate-900">
        {hasSearch ? "No services found" : "No services available yet"}
      </h2>

      <p className="mt-2 max-w-sm break-words text-sm text-slate-600">
        {hasSearch
          ? `We couldn't find anything for "${search.trim()}". Try a different keyword or a department name.`
          : "Municipal services will appear here once they are published."}
      </p>

      {hasSearch && (
        <Button
          type="button"
          variant="outline"
          onClick={onReset}
          className="mt-6"
        >
          Clear search
        </Button>
      )}
    </div>
  );
}
