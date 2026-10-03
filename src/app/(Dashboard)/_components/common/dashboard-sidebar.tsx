"use client";

import { BadgeCheck, LogOut, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";
import { type DashboardUser, NAV_BY_ROLE, ROLE_LABEL } from "./nav-config";

type DashboardSidebarProps = {
  user: DashboardUser;
  onLogout?: () => void;
  onNavigate?: () => void;
};

export function DashboardSidebar({
  user,
  onLogout,
  onNavigate,
}: DashboardSidebarProps) {
  const pathname = usePathname();

 const rootHref = `/${user.role.toLowerCase()}`;

const isActive = (href: string) =>
  href === rootHref
    ? pathname === href
    : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <div className="flex h-full flex-col">
      <div className="px-5 pb-4 pt-5">
        <Logo />
      </div>

      {/* Navigation */}
      <nav
        aria-label="Dashboard"
        className="flex flex-1 flex-col gap-6 overflow-y-auto px-3 py-2"
      >
        {NAV_BY_ROLE[user.role].map((group) => (
          <div key={group.label}>
            <p className="px-3 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              {group.label}
            </p>
            <ul className="mt-2 space-y-1">
              {group.items.map(({ label, href, icon: Icon }) => {
                const active = isActive(href);

                return (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={onNavigate}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors",
                        active
                          ? "bg-blue-600 text-white shadow-sm"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                      )}
                    >
                      <Icon className="size-5 shrink-0" aria-hidden />
                      <span className="flex-1 truncate">{label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* User card */}
      <div className="p-3">
        <div className="flex items-center gap-3 rounded-xl border bg-white p-3 shadow-sm">
          <Avatar className="size-10 shrink-0">
            <AvatarImage src={user.image ?? undefined} alt={user.name} />
            <AvatarFallback className="bg-blue-700 text-white">
              <User className="size-5" aria-hidden />
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold text-slate-900">
              {user.name}
            </p>
            <p className="flex items-center gap-1 truncate text-xs font-medium text-emerald-700">
              <BadgeCheck className="size-3.5 shrink-0" aria-hidden />
              {ROLE_LABEL[user.role]}
            </p>
          </div>

          <button
            type="button"
            onClick={onLogout}
            aria-label="Log out"
            className="shrink-0 rounded-md p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
          >
            <LogOut className="size-5" aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}
