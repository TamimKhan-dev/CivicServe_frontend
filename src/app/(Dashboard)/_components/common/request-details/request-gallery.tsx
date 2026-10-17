"use client";

import { Eye, ImageIcon, Maximize2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { RequestImage } from "./dummy-requests";
import { ImageLightbox } from "./request-image-lightbox";

const LAYOUT = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-[2fr_1fr] md:grid-rows-2",
} as const;

export function RequestGallery({ images }: { images: RequestImage[] }) {
  const [active, setActive] = useState<number | null>(null);
  const shown = images.slice(0, 3);
  const count = shown.length as 1 | 2 | 3;

  if (shown.length === 0) return null;

  return (
    <section className="space-y-3">
      <div className="flex items-center gap-3">
        <ImageIcon className="size-4 text-blue-600" aria-hidden />
        <h2 className="text-sm font-bold uppercase tracking-wide text-slate-900">
          Field Evidence &amp; Photography
        </h2>
        <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600">
          {count} Attached {count === 1 ? "Photo" : "Photos"}
        </span>
      </div>

      <div className={cn("grid gap-3 md:h-110", LAYOUT[count])}>
        {shown.map((img, i) => {
          const isPrimary = i === 0;
          return (
            <button
              key={img.url}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "group relative aspect-video overflow-hidden rounded-xl bg-slate-100 md:aspect-auto",
                count === 3 && isPrimary && "md:row-span-2",
              )}
            >
              <Image
                src={img.url}
                alt={img.caption ?? `Request photo ${i + 1}`}
                fill
                unoptimized
                sizes="(min-width: 768px) 60vw, 100vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {isPrimary && (
                <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-md bg-white/90 px-2 py-1 text-xs font-semibold text-slate-800">
                  <Eye className="size-3.5" aria-hidden />
                  Primary Perspective
                </span>
              )}

              {img.caption && (
                <span className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent p-3 pr-14 text-left text-xs font-medium text-white">
                  {img.caption}
                </span>
              )}

              <span className="absolute bottom-3 right-3 flex size-8 items-center justify-center rounded-full bg-white/90 text-slate-700">
                <Maximize2 className="size-4" aria-hidden />
              </span>
            </button>
          );
        })}
      </div>

      <ImageLightbox images={shown} index={active} onIndexChange={setActive} />
    </section>
  );
}
