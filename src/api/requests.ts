import apiClient from "@/lib/apiClient";
import type { QueryParams } from "@/types/requests-types";

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
