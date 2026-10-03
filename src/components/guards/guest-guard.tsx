"use client";

import { useRouter } from "next/navigation";
import { type ReactNode, useEffect } from "react";
import { useGetMe } from "@/hooks/useAuth";
import AuthLoading from "./auth-loading";

export default function GuestGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { data, isPending, isError } = useGetMe();

  const user = data?.data;

  useEffect(() => {
    if (!isPending && !isError && user) {
      router.replace("/");
    }
  }, [isPending, isError, user, router]);

  if (isPending) {
    return <AuthLoading label="Verifying" />;
  }

  if (isError || !user) {
    return <>{children}</>;
  }

  return <AuthLoading label="Redirecting..." />;
}
