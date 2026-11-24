import { useQuery } from "@tanstack/react-query";

import {
  allCategories,
  allDepartments,
  allRequests,
  allServices,
  getSingleRequest,
} from "@/api/requests";
import type { QueryParams } from "@/types";

const TEN_MINUTES = 10 * 60 * 1000;

export function useCategories() {
  return useQuery({
    queryKey: ["all-categories"],
    queryFn: allCategories,
    staleTime: 10 * 60 * 1000,
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

export function useSingleRequest(requestId: string, isLoggedIn: boolean) {
  return useQuery({
    queryKey: ["single-request", requestId],
    queryFn: () => getSingleRequest(requestId),
    enabled: isLoggedIn && !!requestId,
  });
}

export function useAllRequests(query: QueryParams) {
  return useQuery({
    queryKey: ["all-requests", query],
    queryFn: () => allRequests(query),
  });
}
