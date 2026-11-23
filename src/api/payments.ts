import apiClient from "@/lib/apiClient";

export function allPayments() {
  return apiClient(`/api/v1/payments/get-all-payment`);
}
