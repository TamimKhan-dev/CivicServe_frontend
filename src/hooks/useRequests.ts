import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  allCategories,
  allDepartments,
  allServices,
  citizenStats,
  createRequest,
  myRecentRequests,
  myRequests,
  uploadRequestImage,
} from "@/api/requests";
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
