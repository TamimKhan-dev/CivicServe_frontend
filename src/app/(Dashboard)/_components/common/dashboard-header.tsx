"use client";

import { ChevronDown, LogOut, Menu, Settings, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { DashboardUser } from "./nav-config";

const humanize = (segment: string) =>
  segment
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

type DashboardHeaderProps = {
  user: DashboardUser;
  onMenuClick: () => void;
  onLogout?: () => void;
};

export function DashboardHeader({
  user,
  onMenuClick,
  onLogout,
}: DashboardHeaderProps) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const crumbs = segments.map((seg, i) => ({
    label: humanize(seg),
    href: "/" + segments.slice(0, i + 1).join("/"),
  }));

 if (segments.length === 1) {
  crumbs.push({ label: "Overview", href: `/${segments[0]}` });
}

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b bg-white px-4 sm:px-6 lg:px-8">
      <div className="flex min-w-0 items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
        >
          <Menu className="size-6" />
        </Button>

        {/* Breadcrumbs */}
        <Breadcrumb>
          <BreadcrumbList className="flex-nowrap text-sm">
            <BreadcrumbItem className="hidden sm:inline-flex">
              <BreadcrumbLink asChild>
                <Link href="/" className="font-medium text-slate-500">
                  CivicServe
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            {crumbs.map((crumb, i) => {
              const isLast = i === crumbs.length - 1;
              return (
                <Fragment key={crumb.href + i}>
                  <BreadcrumbSeparator className="hidden sm:block" />
                  <BreadcrumbItem
                    className={isLast ? "" : "hidden sm:inline-flex"}
                  >
                    {isLast ? (
                      <BreadcrumbPage className="font-bold text-slate-900">
                        {crumb.label}
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link
                          href={crumb.href}
                          className="font-medium text-slate-500"
                        >
                          {crumb.label}
                        </Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger
          aria-label="Open profile menu"
          className="flex shrink-0 items-center gap-2 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <Avatar className="size-9">
            <AvatarImage src={user.image ?? undefined} alt={user.name} />
            <AvatarFallback className="bg-blue-700 text-white">
              <User className="size-4" aria-hidden />
            </AvatarFallback>
          </Avatar>
          <ChevronDown className="size-4 text-slate-500" aria-hidden />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="font-normal">
            <p className="truncate text-sm font-medium">{user.name}</p>
            {user.email && (
              <p className="truncate text-xs text-muted-foreground">
                {user.email}
              </p>
            )}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="#">
              <Settings className="size-4" />
              Profile &amp; Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={onLogout}>
            <LogOut className="size-4" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
