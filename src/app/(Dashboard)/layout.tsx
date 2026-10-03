import type { ReactNode } from "react";
import AuthGuard from "@/components/guards/auth-guard";

export default function layout({ children }: { children: ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>;
}
