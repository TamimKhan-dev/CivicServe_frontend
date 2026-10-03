import type { LucideIcon } from "lucide-react";
import {
  Archive,
  Banknote,
  Building2,
  ClipboardList,
  FileUser,
  Inbox,
  LayoutDashboard,
  PlusCircle,
  ScrollText,
  Settings,
} from "lucide-react";
import type { UserRole } from "@/types";

export type DashboardUser = {
  name: string;
  email?: string;
  image?: string | null;
  role: UserRole;
};

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export type NavGroup = {
  label: string;
  items: NavItem[];
};

const account: NavGroup = {
  label: "Account",
  items: [{ label: "Profile & Settings", href: "#", icon: Settings }],
};

export const NAV_BY_ROLE: Record<UserRole, NavGroup[]> = {
  CITIZEN: [
    {
      label: "Citizen Services",
      items: [
        {
          label: "Overview",
          href: "/citizen",
          icon: LayoutDashboard,
        },
        {
          label: "My Requests",
          href: "/dashboard/my-requests",
          icon: ClipboardList,
        },
        {
          label: "Create Request",
          href: "/dashboard/create-request",
          icon: PlusCircle,
        },
        {
          label: "My Applications",
          href: "/dashboard/my-applications",
          icon: FileUser,
        },
        { label: "Payments", href: "/dashboard/payments", icon: Banknote },
      ],
    },
    account,
  ],
  STAFF: [
    {
      label: "Staff Workspace",
      items: [
        {
          label: "Overview",
          href: "/staff",
          icon: LayoutDashboard,
        },
        {
          label: "Assigned Queue",
          href: "/dashboard/assigned-queue",
          icon: Inbox,
        },
      ],
    },
    account,
  ],
  ADMIN: [
    {
      label: "Administration",
      items: [
        {
          label: "Overview",
          href: "/admin",
          icon: LayoutDashboard,
        },
        {
          label: "All Requests",
          href: "/dashboard/all-requests",
          icon: Archive,
        },
        {
          label: "Departments",
          href: "/dashboard/departments",
          icon: Building2,
        },
        {
          label: "Audit Logs",
          href: "/dashboard/audit-logs",
          icon: ScrollText,
        },
      ],
    },
    account,
  ],
};

export const ROLE_LABEL: Record<UserRole, string> = {
  CITIZEN: "Verified Citizen",
  STAFF: "Staff Member",
  ADMIN: "Administrator",
};
