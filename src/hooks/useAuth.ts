import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getMe, logout, registerUser, userLogin, verifyOtp } from "@/api/auth";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { useRouter } from "next/navigation";

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userLogin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
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

export function useGetMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: logout, 
    onSuccess: () => {
      queryClient.clear();
      toast.success("Logout was Successful!");
      router.replace("/login");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    }
  });
};
