import type { LucideIcon } from "lucide-react";

export type Metric = {
  icon: LucideIcon;
  value: string;
  label: string;
  tag: string;
  iconClass: string;
  tagClass: string;
};

export type StatItem = {
  label: string;
  value: number | string;
  description: string;
  icon: LucideIcon;
  iconClass: string;
};
