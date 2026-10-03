import { useQuery } from "@tanstack/react-query";
import { citizenStats, myRequests } from "@/api/requests";

export function useMyRequests() {
  return useQuery({
    queryKey: ["my-requests"],
    queryFn: myRequests,
  });
}

export function useCitizenStats() {
  return useQuery({
    queryKey: ["citizen-stats"],
    queryFn: citizenStats,
  });
}
