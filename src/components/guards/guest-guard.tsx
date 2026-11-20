"use client";

import { useRouter } from "next/navigation";
import { type ReactNode, useEffect } from "react";
import { useAuth } from "@/providers/auth.provider";
import AuthLoading from "./auth-loading";

export default function GuestGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && user) {
      router.replace("/");
    }
  }, [isLoading, user, router]);

  if (isLoading) {
    return <AuthLoading label="Redirecting..." />;
  }

  if (!user) {
    return <>{children}</>;
  }

  return <AuthLoading label="Redirecting..." />;
}
