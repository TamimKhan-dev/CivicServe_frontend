"use client";

import { type ReactNode, useState } from "react";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useGetMe, useLogout } from "@/hooks/useAuth";
import { DashboardHeader } from "./dashboard-header";
import { DashboardSidebar } from "./dashboard-sidebar";

export function DashboardShell({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { mutate: logout } = useLogout();
  const { data } = useGetMe();
  const user = data?.data;

  return (
    <div className="flex min-h-dvh bg-slate-50">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 border-r bg-white lg:block">
        <DashboardSidebar user={user} onLogout={() => logout()} />
      </aside>

      {/* Mobile sidebar */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-72 gap-0 p-0 lg:hidden">
          <SheetTitle className="sr-only">Navigation menu</SheetTitle>
          <DashboardSidebar
            user={user}
            onLogout={() => logout()}
            onNavigate={() => setMobileOpen(false)}
          />
        </SheetContent>
      </Sheet>

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardHeader
          user={user}
          onMenuClick={() => setMobileOpen(true)}
          onLogout={() => logout()}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
