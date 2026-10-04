import { ArrowUpDown, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export type RequestFilterValues = {
  search: string;
  status: string;
  category: string;
  sort: "newest" | "oldest";
};

export const DEFAULT_REQUEST_FILTERS: RequestFilterValues = {
  search: "",
  status: "ALL",
  category: "ALL",
  sort: "newest",
};

const STATUS_OPTIONS = [
  { value: "SUBMITTED", label: "Pending" },
  { value: "ASSIGNED", label: "Assigned" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "RESOLVED", label: "Resolved" },
  { value: "REJECTED", label: "Rejected" },
];

const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
];

type RequestFiltersProps = {
  value: RequestFilterValues;
  onChange: (value: RequestFilterValues) => void;
  categories: { value: string; label: string }[];
  total?: number;
};

const triggerClass =
  "h-11 w-full border-transparent bg-indigo-50/70 font-semibold text-slate-800 shadow-none";

export function RequestFilters({
  value,
  onChange,
  categories,
}: RequestFiltersProps) {
  const update = (patch: Partial<RequestFilterValues>) =>
    onChange({ ...value, ...patch });

  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-white p-3 shadow-sm sm:p-4 lg:flex-row lg:items-center">
      {/* Search */}
      <div className="relative lg:w-72 lg:shrink-0">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-500"
          aria-hidden
        />
        <Input
          type="search"
          value={value.search}
          onChange={(e) => update({ search: e.target.value })}
          placeholder="Search requests..."
          aria-label="Search requests"
          className="h-11 border-transparent bg-indigo-50/70 pl-9 pr-14 shadow-none"
        />
      </div>

      {/* Selects */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:flex-1">
        <Select
          value={value.status}
          onValueChange={(status) => update({ status })}
        >
          <SelectTrigger className={triggerClass} aria-label="Filter by status">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Statuses</SelectItem>
            {STATUS_OPTIONS.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={value.category}
          onValueChange={(category) => update({ category })}
        >
          <SelectTrigger
            className={triggerClass}
            aria-label="Filter by category"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Categories</SelectItem>
            {categories.map((c) => (
              <SelectItem key={c.value} value={c.value}>
                {c.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="relative">
          <ArrowUpDown
            className={cn(
              "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-500",
            )}
            aria-hidden
          />
          <Select
            value={value.sort}
            onValueChange={(sort) =>
              update({ sort: sort as RequestFilterValues["sort"] })
            }
          >
            <SelectTrigger
              className={cn(triggerClass, "pl-9")}
              aria-label="Sort requests"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
