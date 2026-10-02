import apiClient from "@/lib/apiClient";
import type {
  OtpVerificationPayload,
  UserLoginPayload,
  UserRegisterPayload,
} from "@/types";

export function userLogin(payload: UserLoginPayload) {
  return apiClient(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/credential-login`,
    { method: "POST", body: payload },
  );
}

export function registerUser(payload: UserRegisterPayload) {
  return apiClient(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/register`,
    { method: "POST", body: payload },
  );
}

export function verifyOtp(payload: OtpVerificationPayload) {
  return apiClient(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/verify-email`,
    { method: "POST", body: payload },
  );
}

export async function getMe() {
  return await apiClient(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/get-me`,
  );
}

export function logout() {
  return apiClient(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/logout`, { method: "POST" });
};
