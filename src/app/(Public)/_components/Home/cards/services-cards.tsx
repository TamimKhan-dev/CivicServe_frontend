import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type ServiceCardProps = {
  href: string;
  icon: LucideIcon;
  title: string;
  description: string;
  category: string;
  note: string;
  iconClass: string;
  categoryClass?: string;
  noteDotClass: string;
  noteTextClass?: string;
};

export function ServiceCard({
  href,
  icon: Icon,
  title,
  description,
  category,
  note,
  iconClass,
  categoryClass = "bg-slate-100 text-slate-600",
  noteDotClass,
  noteTextClass = "text-slate-700",
}: ServiceCardProps) {
  return (
    <Card className="h-full gap-0 rounded-2xl bg-white py-0 shadow-sm transition-shadow hover:shadow-md">
      <CardContent className="flex h-full flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <span
            className={cn(
              "flex size-10 shrink-0 items-center justify-center rounded-xl",
              iconClass,
            )}
          >
            <Icon className="size-5" aria-hidden />
          </span>
          <Badge
            variant="secondary"
            className={cn(
              "rounded-full text-[11px] font-semibold",
              categoryClass,
            )}
          >
            {category}
          </Badge>
        </div>

        <h3 className="mt-5 text-lg font-bold text-slate-900">{title}</h3>
        <p className="mt-2 mb-5 text-sm leading-relaxed text-slate-600">
          {description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 border-t pt-4">
          <span
            className={cn(
              "flex min-w-0 items-center gap-1.5 text-xs font-semibold",
              noteTextClass,
            )}
          >
            <span
              className={cn("size-1.5 shrink-0 rounded-full", noteDotClass)}
              aria-hidden
            />
            <span className="truncate">{note}</span>
          </span>
          <Link
            href={href}
            className="group inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            View Service
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
