export type ProfileData = {
  name: string;
  email: string;
  phone: string | null;
  profileImage: string | null;
  role: "CITIZEN" | "STAFF" | "ADMIN";
  status: "ACTIVE" | "SUSPENDED";
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  department?: string | null;
};

export const DUMMY_PROFILE: ProfileData = {
  name: "Tamim Ahmed",
  email: "tamim.ahmed@civicserve.gov",
  phone: "+1 (555) 234-8901",
  profileImage: null,
  role: "CITIZEN",
  status: "ACTIVE",
  emailVerified: true,
  createdAt: "2023-10-14T00:00:00.000Z",
  updatedAt: "2025-03-28T00:00:00.000Z",
  department: "Central District Operations",
};
