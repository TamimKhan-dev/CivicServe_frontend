"use client";

import {
  ArrowRight,
  Compass,
  type LucideIcon,
  Tag,
  UserCheck,
  Users,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type QuickAction = {
  title: string;
  description: string;
  cta: string;
  icon: LucideIcon;
  href?: string;
  toastMessage?: string;
};

const ACTIONS: QuickAction[] = [
  {
    title: "Assign Staff to Requests",
    description: "Dispatch field teams and allocate incoming work tickets.",
    cta: "Get started",
    icon: UserCheck,
    href: "/admin/all-requests",
  },
  {
    title: "Manage Users",
    description: "Review citizen accounts, department staff, and permissions.",
    cta: "View users",
    icon: Users,
    toastMessage: "This route/page hasn't been built yet",
  },
  {
    title: "Manage Services",
    description:
      "Configure municipal service offerings, SLAs, and permit fees.",
    cta: "Configure",
    icon: Compass,
    toastMessage: "This route/page hasn't been built yet",
  },
  {
    title: "Manage Categories",
    description: "Organize ticket taxonomies, priority rules, and routing.",
    cta: "Organize",
    icon: Tag,
    toastMessage: "This route/page hasn't been built yet",
  },
];

const cardClass =
  "group flex h-full w-full flex-col justify-between gap-6 rounded-2xl bg-white p-5 text-left shadow-sm transition hover:shadow-md";

function ActionCard({ action }: { action: QuickAction }) {
  const { title, description, cta, icon: Icon, href, toastMessage } = action;

  const content = (
    <>
      <div className="space-y-3">
        <span className="flex size-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          <Icon className="size-5" aria-hidden />
        </span>
        <div className="space-y-1">
          <h3 className="font-semibold text-slate-900">{title}</h3>
          <p className="text-sm text-slate-600">{description}</p>
        </div>
      </div>
      <span className="inline-flex items-center justify-between text-xs font-semibold text-blue-600">
        {cta}
        <ArrowRight className="size-3.5" aria-hidden />
      </span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cn(cardClass)}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={() =>
        toast.info(toastMessage ?? "This route/page hasn't been built yet")
      }
      className={cn(cardClass)}
    >
      {content}
    </button>
  );
}

export function AdminQuickActions() {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Quick Actions</h2>
        <p className="text-sm text-slate-600">
          Manage platform operations efficiently.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ACTIONS.map((a) => (
          <ActionCard key={a.title} action={a} />
        ))}
      </div>
    </section>
  );
}
