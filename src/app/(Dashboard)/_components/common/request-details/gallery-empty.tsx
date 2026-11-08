import { ImageOff } from "lucide-react";

export function GalleryEmpty() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-10 text-center">
      <span className="flex size-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
        <ImageOff className="size-5" aria-hidden />
      </span>
      <div className="space-y-1">
        <p className="font-semibold text-slate-900">
          No images attached to this request
        </p>
        <p className="mx-auto max-w-md text-sm text-slate-500">
          This request was filed without supporting photos. Staff will review
          the details and inspect the location if needed.
        </p>
      </div>
    </div>
  );
}
