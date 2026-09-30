import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  FilePenLine,
  Split,
  UserCheck,
  Workflow,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Step = {
  icon: LucideIcon;
  title: string;
  description: string;
  iconClass: string;
  tagline: string;
  taglineClass: string;
};

const STEPS: Step[] = [
  {
    icon: FilePenLine,
    title: "Submit Request",
    description:
      "Choose a civic service and submit your request with the required details and supporting information.",
    iconClass: "bg-blue-100 text-blue-600",
    tagline: "Details & image upload",
    taglineClass: "text-blue-600",
  },
  {
    icon: Split,
    title: "Request Assignment",
    description:
      "An administrator reviews the request and assigns it to the appropriate staff member.",
    iconClass: "bg-sky-100 text-sky-600",
    tagline: "Admin review & assignment",
    taglineClass: "text-sky-600",
  },
  {
    icon: UserCheck,
    title: "Service Resolution",
    description:
      "The assigned staff member works on the request and updates its status as progress is made.",
    iconClass: "bg-emerald-100 text-emerald-600",
    tagline: "Status updates by staff",
    taglineClass: "text-emerald-600",
  },
  {
    icon: BadgeCheck,
    title: "Track & Review",
    description:
      "Citizens can track their request status and view the progress of their submitted requests.",
    iconClass: "bg-indigo-100 text-indigo-600",
    tagline: "Live request tracking",
    taglineClass: "text-indigo-600",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="w-full bg-slate-50"
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-blue-600">
            <Workflow className="size-3.5" aria-hidden />
            Service Architecture
          </p>
          <h2
            id="how-it-works-heading"
            className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl"
          >
            How CivicServe Works
          </h2>
          <p className="mt-3 text-sm text-slate-600 sm:text-base">
            A transparent, 4-step municipal workflow engineered for citizen
            accountability and fast resolution.
          </p>
        </div>

        <ol className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(
            (
              {
                icon: Icon,
                title,
                description,
                iconClass,
                tagline,
                taglineClass,
              },
              i,
            ) => (
              <li key={title} className="flex">
                <Card className="w-full gap-0 rounded-2xl bg-white py-0 shadow-sm">
                  <CardContent className="flex flex-1 flex-col p-5 sm:p-6">
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
                        className="rounded-md bg-slate-100 text-[11px] font-semibold text-slate-600"
                      >
                        Step {String(i + 1).padStart(2, "0")}
                      </Badge>
                    </div>
                    <h3 className="mt-5 text-base font-bold text-slate-900">
                      {title}
                    </h3>
                    <p className="mt-2 mb-5 text-sm leading-relaxed text-slate-600">
                      {description}
                    </p>
                    <p
                      className={cn(
                        "mt-auto border-t pt-4 text-xs font-semibold",
                        taglineClass,
                      )}
                    >
                      {tagline}
                    </p>
                  </CardContent>
                </Card>
              </li>
            ),
          )}
        </ol>
      </div>
    </section>
  );
}
