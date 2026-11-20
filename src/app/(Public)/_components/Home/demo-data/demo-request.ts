import type { RequestDetails } from "@/types/requests-types";

export const DEMO_REQUEST: RequestDetails = {
  id: "54b81c9a-0000-4000-8000-000000000000",
  title: "Water Main Leakage & Valve Repair",
  description:
    "Water is leaking from the main pipe near the valve, flooding the street.",
  type: "COMPLAINT_REQUEST",
  status: "IN_PROGRESS",
  location: "Maple Ave & 12th St, Sector 04",
  imageUrl: "",
  imagePublicId: "",
  createdAt: "2026-10-10T09:15:00.000Z",
  updatedAt: "2026-10-10T11:30:00.000Z",
  deletedAt: null,
  userId: "demo-user",
  user: { name: "Demo Citizen" },
  categoryId: "demo-category",
  category: { name: "Public Utility" },
  departmentId: "demo-department",
  department: { name: "Dept. of Water Works" },
  assignedStaffId: "demo-staff",
  assignedStaff: {
    name: "Rapid Response Team Alpha",
    email: "staff@example.com",
    profileImage: "",
    department: { name: "Dept. of Water Works" },
  },
  serviceId: null,
  service: null,
  payment: null,
};
