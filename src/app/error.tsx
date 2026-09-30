"use client";

import { AlertTriangle, RotateCw } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#f8f9ff] px-4 py-10">
      <div className="w-full max-w-105 bg-white rounded-2xl border border-[#e5eeff] shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)] p-8 text-center">
        <div className="w-20 h-20 rounded-full bg-[#ffdad6] flex items-center justify-center mx-auto mb-6">
          <div className="w-12 h-12 rounded-full bg-[#ba1a1a] flex items-center justify-center">
            <AlertTriangle size={22} className="text-white" fill="none" />
          </div>
        </div>

        <h1 className="font-bold text-2xl md:text-3xl text-[#0b1c30] mb-3">
          Something Went Wrong
        </h1>
        <p className="text-sm text-[#515f74] leading-relaxed mb-7">
          We couldn&apos;t load this page right now. Please try again.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <Button
            onClick={() => reset()}
            className="flex-1 min-w-0 bg-[#006c49] hover:bg-[#006c49]/90 text-white font-semibold h-auto py-3 rounded-xl gap-2 cursor-pointer"
          >
            <RotateCw size={16} className="shrink-0" />
            Try Again
          </Button>
          <Button
            asChild
            variant="outline"
            className="flex-1 min-w-0 border-[#bbcabf] text-[#0b1c30] font-semibold h-auto py-3 rounded-xl cursor-pointer"
          >
            <Link href="/">Back to Home</Link>
          </Button>
        </div>

        <p className="text-xs text-[#94a3b8]">Error {error.digest ?? "500"}</p>
      </div>
    </div>
  );
}
