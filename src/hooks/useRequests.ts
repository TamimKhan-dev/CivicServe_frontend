import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { myRequests } from "@/api/requests";
import { getErrorMessage } from "@/lib/getErrorMessage";

export function useMyRequests() {
  return useMutation({
    mutationFn: myRequests,
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
