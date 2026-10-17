import { useQuery } from "@tanstack/react-query";
import { adminStats, citizenStats, staffStats } from "@/api/stats";

export function useStaffStats() {
  return useQuery({
    queryKey: ["staff-stats"],
    queryFn: staffStats,
  });
}

export function useCitizenStats() {
  return useQuery({
    queryKey: ["citizen-stats"],
    queryFn: citizenStats,
  });
}

export function useAdminStats() {
  return useQuery({
    queryKey: ["admin-stats"],
    queryFn: adminStats,
  });
}
