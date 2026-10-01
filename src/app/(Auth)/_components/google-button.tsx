"use client";

import { Button } from "@/components/ui/button";
import { GoogleIcon } from "@/components/ui/google-icon";

export function GoogleButton({
  label = "Continue with Google",
}: {
  label?: string;
}) {
  const handleGoogleLogin = async () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/google`;
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <span className="h-px flex-1 bg-slate-200" />
        <span className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">
          Or
        </span>
        <span className="h-px flex-1 bg-slate-200" />
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={handleGoogleLogin}
        className="h-11 w-full bg-white font-medium text-slate-800"
      >
        <GoogleIcon />
        {label}
      </Button>
    </div>
  );
}
