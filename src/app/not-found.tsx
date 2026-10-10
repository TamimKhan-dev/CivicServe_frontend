import { Home, SearchX } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-6 py-16">
      <div className="w-full max-w-lg text-center">
        <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
          <SearchX size={32} />
        </div>

        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-600">
          Error 404
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Page not found
        </h1>

        <p className="mx-auto mt-4 max-w-md text-slate-600">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It may
          have been moved or the link may be incorrect.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            <Home size={16} />
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
