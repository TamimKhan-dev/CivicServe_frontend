import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { allPayments } from "@/api/payments";
import {
  createCheckoutSession,
  createRequest,
  getPaymentDetails,
  myRecentRequests,
  myRequests,
  uploadRequestImage,
} from "@/api/requests";
import { getErrorMessage } from "@/lib/getErrorMessage";
import type { CreateRequestPayload, QueryParams } from "@/types";

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

export function useAllPaymentsList() {
  return useQuery({
    queryKey: ["all-payments"],
    queryFn: allPayments,
  });
}

export function useCitizenRecentRequests() {
  return useQuery({
    queryKey: ["citizen-recent-requests"],
    queryFn: myRecentRequests,
  });
}

export function useCitizenRequests(query: QueryParams) {
  return useQuery({
    queryKey: ["citizen-requests", query],
    queryFn: () => myRequests(query),
  });
}

export function usePaymentDetails(sessionId: string) {
  return useQuery({
    queryKey: ["payment-success", sessionId],
    queryFn: () => getPaymentDetails(sessionId),
  });
}
