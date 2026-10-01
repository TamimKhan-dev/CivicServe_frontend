"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

export function GoogleLoginSuccess() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const hasShown = useRef(false);

  useEffect(() => {
    if (searchParams.get("success") === "true" && !hasShown.current) {
      hasShown.current = true
      toast.success("Google login successful!");
      router.replace("/");
    }
  }, [searchParams, router]);

  return null;
}