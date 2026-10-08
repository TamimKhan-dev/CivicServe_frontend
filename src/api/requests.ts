import apiClient from "@/lib/apiClient";
import type {
  ApiList,
  CreateRequestPayload,
  CreateRequestResponse,
  Department,
  QueryParams,
  Service,
} from "@/types/requests-types";

export function myRecentRequests() {
  return apiClient(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/request/my-requests?sortOrder=desc&limit=3`,
  );
}

export function citizenStats() {
  return apiClient(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/request/citizen-stat`,
  );
}

export function allCategories() {
  return apiClient(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/category/all-categories`,
  );
}

export function myRequests(query: QueryParams) {
  const params = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      params.append(key, String(value));
    }
  });

  return apiClient(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/request/my-requests?${params.toString()}`,
  );
}

export function allDepartments() {
  return apiClient<ApiList<Department>>("/api/v1/department/all-departments");
}

export function allServices() {
  return apiClient<ApiList<Service>>("/api/v1/service/all-services");
}

export function createRequest(payload: CreateRequestPayload) {
  return apiClient<CreateRequestResponse>("/api/v1/request/create-request", {
    method: "POST",
    body: payload,
  });
}

export function uploadRequestImage(requestId: string, file: File) {
  const formData = new FormData();
  formData.append("imageUrl", file);

  return apiClient(`/api/v1/request/${requestId}/image`, {
    method: "POST",
    body: formData,
  });
}

export function createCheckoutSession(requestId: string) {
  return apiClient(`/api/v1/payments/checkout/${requestId}`, {
    method: "POST",
  });
}

export function getPaymentDetails(sessionId: string) {
  return apiClient(`/api/v1/payments/session/${sessionId}`);
}

export function getSingleRequest(requestId: string) {
  return apiClient(`/api/v1/request/${requestId}`);
}

export function getStaffStats() {
  return apiClient(`/api/v1/request/staff-stats`);
}

export function getRecentAssignedTasks() {
  return apiClient(`/api/v1/request/all-requests?sortOrder=desc&limit=3`);
}
