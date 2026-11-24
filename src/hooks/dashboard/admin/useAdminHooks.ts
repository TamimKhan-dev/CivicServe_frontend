import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  adminRecentRequests,
  assignStaff,
  fetchAllStaffs,
} from "@/api/requests";
import { getErrorMessage } from "@/lib/getErrorMessage";

export function useStaffList(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ["all-staffs"],
    queryFn: fetchAllStaffs,
    enabled: options?.enabled,
  });
}

export function useAdminRecentRequests() {
  return useQuery({
    queryKey: ["admin-recent-requests"],
    queryFn: adminRecentRequests,
  });
}

export function useAssignStaff() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: assignStaff,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-requests"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
      console.log(error);
    },
  });
}
