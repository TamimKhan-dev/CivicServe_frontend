import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { registerUser, userLogin } from "@/api/auth";

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

export function useRegisterUser() {
  return useMutation({
    mutationFn: registerUser,
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
