"use client";

import { useRouter } from "next/navigation";
import { type ReactNode, useEffect } from "react";
import { useAuth } from "@/providers/auth.provider";
import type { UserRole } from "@/types";
import AccessDenied from "./access-denied";
import AuthLoading from "./auth-loading";

interface IProps {
  children: ReactNode;
  roles: UserRole[];
}

export default function RoleGuard({ children, roles }: IProps) {
  const router = useRouter();

  const { user, isLoading } = useAuth();

  const isAuthorized = !!user && roles.includes(user.role);

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

  if (isAuthorized) {
    return <>{children}</>;
  }

  return <AccessDenied />;
}
