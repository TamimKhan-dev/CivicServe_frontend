import type { LucideIcon } from "lucide-react";

export type PaymentStatus =
  | "PENDING"
  | "PAID"
  | "FAILED"
  | "CANCELLED"
  | "REFUNDED";
export type RequestType = "COMPLAINT_REQUEST" | "SERVICE_REQUEST";
export type RequestStatus =
  | "SUBMITTED"
  | "ASSIGNED"
  | "IN_PROGRESS"
  | "RESOLVED"
  | "REJECTED";

// export type Requests = {
//   id: string;
//   title: string;
//   description: string;
//   location: string;
//   status: RequestStatus;
//   type: RequestType;
//   imageUrl: string | null;
//   imagePublicId: string | null;
//   categoryId: string;
//   category: {
//     id: string;
//     name: string;
//   };
//   serviceId: string;
//   service: {
//     id: string;
//     name: string;
//     fee: string;
//   };
//   departmentId: string;
//   department: {
//     id: string;
//     name: string;
//   };
//   assignedStaffId: string | null;
//   createdAt: string;
//   updatedAt: string;
//   deletedAt: string | null;
//   userId: string;
// };
export type RequestPayment = {
  id: string;
  requestId: string;
  userId: string;
  status: PaymentStatus;
  amount: number | string;
  paymentMethod: string | null;
  transactionId: string | null;
  paidAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type RequestDetails = {
  id: string;
  title: string;
  description: string;
  type: RequestType;
  status: RequestStatus;
  location: string;
  imageUrl: string | null;
  imagePublicId: string | null;

  userId: string;
  categoryId: string;
  departmentId: string | null;
  serviceId: string | null;
  assignedStaffId: string | null;

  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;

  user: { name: string };
  category: { name: string } | null;
  department: { name: string } | null;
  service: { name: string; fee: number | string } | null;
  payment: RequestPayment | null;
  assignedStaff: {
    name: string;
    email: string;
    profileImage: string | null;
    department: { name: string } | null;
  } | null;
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

export type Category = {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type QueryParams = {
  page: number;
  limit: number;
  searchTerm?: string;
  status?: string;
  categoryId?: string;
  sortBy: string;
  sortOrder: "asc" | "desc";
};

export type ApiList<T> = { data: T[] };

export type RequestCategory = {
  id: string;
  name: string;
  isActive: boolean;
  departmentId: string;
};

export type Department = {
  id: string;
  name: string;
  isActive?: boolean;
};

export type Service = {
  id: string;
  name: string;
  description: string;
  fee: string;
  slaHours: number;
  isActive: boolean;
  departmentId: string;
  department: { id: string; name: string };
};

export type CreateRequestPayload = {
  type: RequestType;
  title: string;
  description: string;
  location: string;
  departmentId: string;
  categoryId: string;
  serviceId?: string;
};

export type CreateRequestResponse = {
  data: { id: string };
};

export type AdminStats = {
  totalRequests: number;
  pendingRequests: number;
  inProgress: number;
  totalUsers: number;
};
