import type { ReactNode } from "react";
import RoleGuard from "@/components/guards/role-guard";
import { DashboardShell } from "../_components/common/dashboard-shell";

export default function CitizenDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <RoleGuard roles={["CITIZEN"]}>
      <DashboardShell>{children}</DashboardShell>
    </RoleGuard>
  );
}
