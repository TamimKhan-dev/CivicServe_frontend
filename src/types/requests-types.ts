import type { LucideIcon } from "lucide-react";

export type RequestStatus =
  | "SUBMITTED"
  | "ASSIGNED"
  | "IN_PROGRESS"
  | "RESOLVED"
  | "REJECTED";
type RequestType = "COMPLAINT_REQUEST" | "SERVICE_REQUEST";

export type Requests = {
  id: string;
  title: string;
  description: string;
  location: string;
  status: RequestStatus;
  type: RequestType;
  imageUrl: string | null;
  imagePublicId: string | null;
  categoryId: string;
  category: {
    id: string;
    name: string;
  };
  serviceId: string;
  service: {
    id: string;
    name: string;
    fee: string;
  };
  departmentId: string;
  department: {
    id: string;
    name: string;
  };
  assignedStaffId: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  userId: string;
};

export type CitizenStatCards = {
  label: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
  iconClass: string;
};

export type CitizenStatsData = {
  totalRequests: number;
  pendingRequests: number;
  inProgressRequests: number;
  resolvedRequests: number;
};
