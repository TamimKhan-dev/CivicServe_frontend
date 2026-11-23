export type RequestType = "COMPLAINT_REQUEST" | "SERVICE_REQUEST";
export type StepStatus = "done" | "active" | "pending";
export type PaymentStatus =
  | "PENDING"
  | "PAID"
  | "FAILED"
  | "CANCELLED"
  | "REFUNDED";

export type RequestStatus =
  | "SUBMITTED"
  | "ASSIGNED"
  | "IN_PROGRESS"
  | "RESOLVED"
  | "REJECTED";

type TimelineStep = {
  title: string;
  description: string;
  time?: string;
  status: StepStatus;
  spin?: boolean;
};

export type TrackedTicket = {
  id: string;
  priority: string;
  category: string;
  title: string;
  location: string;
  targetLabel: string;
  targetValue: string;
  steps: TimelineStep[];
};

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

export type Category = {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

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

export type RequestFilterValues = {
  search: string;
  status: string;
  category: string;
  sort: "newest" | "oldest";
};
