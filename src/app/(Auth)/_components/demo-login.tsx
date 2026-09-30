"use client";

import type { LucideIcon } from "lucide-react";
import { Briefcase, Shield, User, Zap } from "lucide-react";

import { cn } from "@/lib/utils";

export type DemoRole = "ADMIN" | "STAFF" | "CITIZEN";

type DemoOption = {
  role: DemoRole;
  title: string;
  tag: string;
  subtitle: string;
  icon: LucideIcon;
  iconClass: string;
  rowClass: string;
  tagClass: string;
};

const OPTIONS: DemoOption[] = [
  {
    role: "ADMIN",
    title: "Admin Demo Login",
    tag: "Tier 1",
    subtitle: "City Operations & Governance",
    icon: Shield,
    iconClass: "bg-slate-900 text-white",
    rowClass: "border-slate-200 bg-slate-50 hover:bg-slate-100",
    tagClass: "bg-slate-200 text-slate-700",
  },
  {
    role: "STAFF",
    title: "Staff Demo Login",
    tag: "Field Agent",
    subtitle: "Department Dispatch & Resolution",
    icon: Briefcase,
    iconClass: "bg-blue-600 text-white",
    rowClass: "border-blue-100 bg-blue-50/60 hover:bg-blue-50",
    tagClass: "bg-blue-100 text-blue-700",
  },
  {
    role: "CITIZEN",
    title: "Citizen Demo Login",
    tag: "Resident",
    subtitle: "Service Requests & Tracking",
    icon: User,
    iconClass: "bg-emerald-600 text-white",
    rowClass: "border-emerald-100 bg-emerald-50/60 hover:bg-emerald-50",
    tagClass: "bg-emerald-100 text-emerald-700",
  },
];

type DemoLoginProps = {
  onSelect?: (role: DemoRole) => void;
  disabled?: boolean;
};

export function DemoLogin({ onSelect, disabled }: DemoLoginProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <span className="h-px flex-1 bg-slate-200" />
        <span className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">
          Quick Demo Login
        </span>
        <span className="h-px flex-1 bg-slate-200" />
      </div>

      <ul className="space-y-2.5">
        {OPTIONS.map((o) => (
          <li key={o.role}>
            <button
              type="button"
              disabled={disabled}
              onClick={() => onSelect?.(o.role)}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-left transition-colors disabled:cursor-not-allowed disabled:opacity-60",
                o.rowClass,
              )}
            >
              <span
                className={cn(
                  "flex size-9 shrink-0 items-center justify-center rounded-lg",
                  o.iconClass,
                )}
              >
                <o.icon className="size-4" aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                  <span className="text-sm font-bold text-slate-900">
                    {o.title}
                  </span>
                  <span
                    className={cn(
                      "rounded px-1.5 py-px text-[10px] font-semibold",
                      o.tagClass,
                    )}
                  >
                    {o.tag}
                  </span>
                </span>
                <span className="mt-0.5 block text-xs text-slate-500">
                  {o.subtitle}
                </span>
              </span>
              <Zap className="size-4 shrink-0 text-slate-400" aria-hidden />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
