"use client";

import { useRouter } from "next/navigation";
import { type ReactNode, useEffect } from "react";
import { useAuth } from "@/providers/auth.provider";
import AuthLoading from "./auth-loading";

export default function AuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();

  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (!user) {
      router.replace("/login");
    }
  }, [isLoading, user, router]);

  if (isLoading) {
    return <AuthLoading />;
  }

  if (!user) {
    return <AuthLoading label="Redirecting..." />;
  }

  return <>{children}</>;
}
