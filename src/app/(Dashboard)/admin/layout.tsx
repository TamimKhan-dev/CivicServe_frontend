import type { ReactNode } from "react";
import RoleGuard from "@/components/guards/role-guard";
import { DashboardShell } from "../_components/common/dashboard-shell";

export default function AdminDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <RoleGuard roles={["ADMIN"]}>
      <DashboardShell>{children}</DashboardShell>
    </RoleGuard>
  );
}
