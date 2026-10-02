import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { registerUser, userLogin, verifyOtp } from "@/api/auth";
import { getErrorMessage } from "@/lib/getErrorMessage";

export function useLogin() {
  return useMutation({
    mutationFn: userLogin,
    onSuccess: () => {
      toast.success("Logged in successfully!");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

export function useRegisterUser() {
  return useMutation({
    mutationFn: registerUser,
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

export function useVerifyOtp() {
  return useMutation({
    mutationFn: verifyOtp,
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
