"use client";

import { AlertTriangle, Home, RefreshCw } from "lucide-react";
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
    console.error("Application error:", error);
  }, [error]);

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-6 py-16">
      <div className="w-full max-w-lg text-center">
        <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-red-100 text-red-600">
          <AlertTriangle size={32} />
        </div>

        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-red-600">
          Something went wrong
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          We couldn&apos;t load this page
        </h1>

        <p className="mx-auto mt-4 max-w-md text-slate-600">
          An unexpected error occurred. Please try again. If the problem
          continues, return home and try later.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button
            asChild
            className="gap-2 bg-blue-600 text-white hover:bg-blue-700"
          >
            <Link href="/">
              <Home size={16} />
              Return Home
            </Link>
          </Button>

          <Button
            onClick={() => reset()}
            className="gap-2 bg-blue-600 text-white hover:bg-blue-700"
          >
            <RefreshCw size={16} />
            Try Again
          </Button>
        </div>
      </div>
    </main>
  );
}
