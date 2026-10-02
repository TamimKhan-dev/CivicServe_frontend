import apiClient from "@/lib/apiClient";
import type { UserLoginPayload, UserRegisterPayload } from "@/types";

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
