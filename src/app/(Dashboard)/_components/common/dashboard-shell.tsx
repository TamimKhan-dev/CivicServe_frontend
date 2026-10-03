"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { DashboardHeader } from "./dashboard-header";
import { DashboardSidebar } from "./dashboard-sidebar";
import type { DashboardUser } from "./nav-config";

type DashboardShellProps = {
  user: DashboardUser;
  children: React.ReactNode;
  onLogout?: () => void;
};

export function DashboardShell({
  user,
  children,
  onLogout,
}: DashboardShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-dvh bg-slate-50">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 border-r bg-white lg:block">
        <DashboardSidebar user={user} onLogout={onLogout} />
      </aside>

      {/* Mobile sidebar */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-72 gap-0 p-0 lg:hidden">
          <SheetTitle className="sr-only">Navigation menu</SheetTitle>
          <DashboardSidebar
            user={user}
            onLogout={onLogout}
            onNavigate={() => setMobileOpen(false)}
          />
        </SheetContent>
      </Sheet>

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardHeader
          user={user}
          onMenuClick={() => setMobileOpen(true)}
          onLogout={onLogout}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
