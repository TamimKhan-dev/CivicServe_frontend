import type { LucideIcon } from "lucide-react";
import { Briefcase, Shield, User } from "lucide-react";
import type { UserRole } from "@/types";

type DemoOption = {
  role: UserRole;
  title: string;
  tag: string;
  subtitle: string;
  icon: LucideIcon;
  iconClass: string;
  rowClass: string;
  tagClass: string;
};

export const OPTIONS: DemoOption[] = [
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
