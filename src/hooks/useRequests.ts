import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  adminRecentRequests,
  adminStats,
  allCategories,
  allDepartments,
  allRequests,
  allServices,
  citizenStats,
  createCheckoutSession,
  createRequest,
  getPaymentDetails,
  getRecentAssignedTasks,
  getSingleRequest,
  getStaffStats,
  myRecentRequests,
  myRequests,
  updateRequestStatus,
  uploadRequestImage,
} from "@/api/requests";
import { getErrorMessage } from "@/lib/getErrorMessage";
import type { CreateRequestPayload, QueryParams } from "@/types/requests-types";

const TEN_MINUTES = 10 * 60 * 1000;

export function useMyRecentRequests() {
  return useQuery({
    queryKey: ["my-recent-requests"],
    queryFn: myRecentRequests,
  });
}

export function useCitizenStats() {
  return useQuery({
    queryKey: ["citizen-stats"],
    queryFn: citizenStats,
  });
}

export function useStaffStats() {
  return useQuery({
    queryKey: ["staff-stats"],
    queryFn: getStaffStats,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ["all-categories"],
    queryFn: allCategories,
    staleTime: 10 * 60 * 1000,
  });
}

export function useMyRequests(query: QueryParams) {
  return useQuery({
    queryKey: ["my-requests", query],
    queryFn: () => myRequests(query),
  });
}

export function useDepartments() {
  return useQuery({
    queryKey: ["all-departments"],
    queryFn: allDepartments,
    staleTime: TEN_MINUTES,
  });
}

export function useServices() {
  return useQuery({
    queryKey: ["all-services"],
    queryFn: allServices,
    staleTime: TEN_MINUTES,
  });
}

export function useCreateRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      payload,
      image,
    }: {
      payload: CreateRequestPayload;
      image?: File | null;
    }) => {
      const res = await createRequest(payload);

      let imageFailed = false;
      if (image) {
        try {
          await uploadRequestImage(res.data.id, image);
        } catch {
          imageFailed = true;
        }
      }

      return { request: res.data, imageFailed };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-requests"] });
      queryClient.invalidateQueries({ queryKey: ["my-recent-requests"] });
      queryClient.invalidateQueries({ queryKey: ["citizen-stats"] });
    },
  });
}

export function useCreatePayment() {
  return useMutation({
    mutationFn: createCheckoutSession,
    onSuccess: (response) => {
      const paymentUrl = response?.data?.paymentUrl;

      if (paymentUrl) {
        window.location.href = paymentUrl;
      } else {
        console.error("Payment URL missing from backend response", response);
        toast.error("Could not find the payment redirect link.");
      }
    },
    onError: (error) => {
      console.log(error);
      toast.error(getErrorMessage(error));
    },
  });
}

export function usePaymentDetails(sessionId: string) {
  return useQuery({
    queryKey: ["payment-success", sessionId],
    queryFn: () => getPaymentDetails(sessionId),
  });
}

export function useSingleRequest(requestId: string) {
  return useQuery({
    queryKey: ["single-request", requestId],
    queryFn: () => getSingleRequest(requestId),
  });
}

export function useRecentAssignedTasks() {
  return useQuery({
    queryKey: ["recent-assigned-tasks"],
    queryFn: getRecentAssignedTasks,
  });
}

export function useAllRequests(query: QueryParams) {
  return useQuery({
    queryKey: ["all-requests", query],
    queryFn: () => allRequests(query),
  });
}

export function useUpdateRequestStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateRequestStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-requests"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
}

export function useAdminStats() {
  return useQuery({
    queryKey: ["admin-stats"],
    queryFn: adminStats,
  });
}

export function useAdminRecentRequests() {
  return useQuery({
    queryKey: ["admin-recent-requests"],
    queryFn: adminRecentRequests,
  });
}
