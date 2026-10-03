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
          href: "/citizen/my-requests",
          icon: ClipboardList,
        },
        {
          label: "Create Request",
          href: "/citizen/create-request",
          icon: PlusCircle,
        },
        {
          label: "My Applications",
          href: "/citizen/my-applications",
          icon: FileUser,
        },
        { label: "Payments", href: "/citizen/payments", icon: Banknote },
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
          href: "/staff/assigned-queue",
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
          href: "/admin/all-requests",
          icon: Archive,
        },
        {
          label: "Departments",
          href: "/admin/departments",
          icon: Building2,
        },
        {
          label: "Audit Logs",
          href: "/admin/audit-logs",
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
