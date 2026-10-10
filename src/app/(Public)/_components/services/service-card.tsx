import { ArrowRight, Landmark } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Service } from "@/types/requests-types";

export function ServiceCard({ service }: { service: Service }) {
  const { name, description, fee, slaHours, department } = service;

  const feeNumber = Number(fee);
  const isFree = feeNumber === 0;

  return (
    <Card className="relative h-full gap-0 rounded-2xl bg-white py-0 shadow-sm transition-shadow hover:shadow-md">
      <CardContent className="flex h-full flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Landmark className="size-5" aria-hidden />
          </span>
          <Badge
            variant="secondary"
            className="max-w-[70%] rounded-full bg-slate-100 text-[11px] font-semibold text-slate-700"
          >
            <span className="truncate">{department.name}</span>
          </Badge>
        </div>

        <h3 className="mt-5 line-clamp-2 text-lg font-bold text-slate-900">
          {name}
        </h3>
        <p className="mt-2 mb-5 line-clamp-3 text-sm leading-relaxed text-slate-600">
          {description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 border-t pt-4">
          <span
            className={cn(
              "flex min-w-0 items-center gap-1.5 text-xs font-semibold",
              isFree ? "text-emerald-700" : "text-blue-700",
            )}
          >
            <span
              className={cn(
                "size-1.5 shrink-0 rounded-full",
                isFree ? "bg-emerald-500" : "bg-blue-500",
              )}
              aria-hidden
            />
            <span className="truncate">
              {isFree ? "Free" : `Fee ${feeNumber}`} · ~{slaHours}h resolution
            </span>
          </span>

          <Link
            href="/citizen/create-request"
            className="group inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-blue-600 after:absolute after:inset-0 after:rounded-2xl hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Request Service
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
