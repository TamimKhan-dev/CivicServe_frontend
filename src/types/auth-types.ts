import type { UserRole } from ".";

export type UserLoginPayload = {
  email: string;
  password: string;
};

export type UserRegisterPayload = {
  name: string;
  email: string;
  password: string;
  phone?: string;
};

export type OtpVerificationPayload = {
  email: string;
  otp: string;
};

export type UpdateProfilePayload = {
  userId: string;
  name?: string;
  phone?: string;
  image?: File;
};

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
