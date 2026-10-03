import apiClient from "@/lib/apiClient";

export function myRequests() {
  return apiClient(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/request/my-requests?sortOrder=desc&limit=3`,
  );
}

export function citizenStats() {
  return apiClient(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/request/citizen-stat`,
  );
}
