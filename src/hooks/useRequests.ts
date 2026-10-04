import { useQuery } from "@tanstack/react-query";
import {
  allCategories,
  citizenStats,
  myRecentRequests,
  myRequests,
} from "@/api/requests";
import type { QueryParams } from "@/types/requests-types";

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
