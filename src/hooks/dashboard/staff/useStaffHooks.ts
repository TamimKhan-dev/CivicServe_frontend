import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getRecentAssignedTasks, updateRequestStatus } from "@/api/requests";

export function useRecentAssignedTasks() {
  return useQuery({
    queryKey: ["recent-assigned-tasks"],
    queryFn: getRecentAssignedTasks,
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
