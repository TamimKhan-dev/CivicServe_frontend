import { Inbox } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-2 px-4 py-14 text-center">
      <span className="flex size-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
        <Inbox className="size-6" aria-hidden />
      </span>
      <p className="text-base font-semibold text-slate-900">
        No requests found
      </p>
      <p className="text-sm text-slate-600">
        Try changing your search or filters.
      </p>
    </div>
  );
}
