import type { ReactNode } from "react";
import RoleGuard from "@/components/guards/role-guard";
import { DashboardShell } from "../_components/common/dashboard-shell";

export default function StaffDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <RoleGuard roles={["STAFF"]}>
      <DashboardShell>{children}</DashboardShell>
    </RoleGuard>
  );
}
