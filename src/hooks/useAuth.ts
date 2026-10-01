import { useMutation } from "@tanstack/react-query";
import { userLogin } from "@/api/auth";
import { toast } from "sonner";

export function useLogin() {
  return useMutation({
    mutationFn: userLogin,
    onSuccess: () => {
        toast.success("Logged in successfully!");
    },
    onError: (error) => {
        toast.error(error.message);
    }, 
  });
}
