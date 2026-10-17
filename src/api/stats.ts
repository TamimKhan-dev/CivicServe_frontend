import apiClient from "@/lib/apiClient";

export function citizenStats() {
  return apiClient(`/api/v1/stats/citizen-stats`);
}

export function staffStats() {
  return apiClient(`/api/v1/stats/staff-stats`);
}

export function adminStats() {
  return apiClient(`/api/v1/stats/admin-stats`);
}
