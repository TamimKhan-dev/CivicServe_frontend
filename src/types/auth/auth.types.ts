export type UserRole = "ADMIN" | "STAFF" | "CITIZEN";

export type ProfileData = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  profileImage: string | null;
  role: UserRole;
  status: "ACTIVE" | "SUSPENDED";
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  departmentId?: string | null;
  department?: { name: string } | null;
};
