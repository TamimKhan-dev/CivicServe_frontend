"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

type Props = {
  images: string[];
  index: number | null;
  onIndexChange: (index: number | null) => void;
};

export function ImageLightbox({ images, index, onIndexChange }: Props) {
  const total = images.length;
  const current = index === null ? null : images[index];

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") onIndexChange((index + 1) % total);
      if (e.key === "ArrowLeft") onIndexChange((index - 1 + total) % total);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, total, onIndexChange]);

  return (
    <Dialog
      open={index !== null}
      onOpenChange={(open) => !open && onIndexChange(null)}
    >
      <DialogContent className="p-2 sm:max-w-4xl">
        <DialogTitle className="sr-only">Photo preview</DialogTitle>
        {current && index !== null && (
          <div className="space-y-3">
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-lg bg-slate-100">
              <Image
                src={current}
                alt={"Request photo"}
                fill
                unoptimized
                sizes="896px"
                className="object-contain"
              />
            </div>

            <div className="flex items-center justify-between gap-4 px-2 pb-1">
              <p className="text-sm text-slate-600">
                Here is the place image caption will be placed
              </p>
              {total > 1 && (
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    aria-label="Previous photo"
                    onClick={() => onIndexChange((index - 1 + total) % total)}
                  >
                    <ChevronLeft className="size-4" aria-hidden />
                  </Button>
                  <span className="text-xs font-medium text-slate-500">
                    {index + 1} / {total}
                  </span>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    aria-label="Next photo"
                    onClick={() => onIndexChange((index + 1) % total)}
                  >
                    <ChevronRight className="size-4" aria-hidden />
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
