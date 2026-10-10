import { Lock, PlusCircle, Search, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RadarCard } from "./cards/RadarCard";

const TRUST_ITEMS = [
  {
    icon: ShieldCheck,
    label: "Gov-Verified Identity",
    color: "text-emerald-600",
  },
  { icon: Lock, label: "End-to-End Encrypted", color: "text-blue-600" },
  { icon: Zap, label: "Real-Time Dispatch", color: "text-amber-500" },
];

export function Hero() {
  return (
    <section className="w-full">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-20">
        {/* Left content */}
        <div className="flex flex-col items-start">
          <Badge
            variant="secondary"
            className="gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-blue-600"
          >
            <ShieldCheck className="size-3.5" aria-hidden />
            Official City Service Portal
          </Badge>

          <h1 className="mt-5 text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-[3.25rem]">
            Your City. Your Voice.
            <span className="block text-blue-600">Better Services.</span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Report civic issues, request public services, and track real-time
            resolution progress—all from one verified municipal hub built for
            citizen accountability.
          </p>

          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-blue-600 font-semibold hover:bg-blue-700"
            >
              <Link href="/citizen/create-request">
                <PlusCircle className="size-4" aria-hidden />
                Submit a Request
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-white font-semibold"
            >
              <Link href="/services">
                <Search className="size-4" aria-hidden />
                Explore Services
              </Link>
            </Button>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 border-t pt-6 text-xs font-medium text-slate-600">
            {TRUST_ITEMS.map(({ icon: Icon, label, color }) => (
              <li key={label} className="flex items-center gap-1.5">
                <Icon className={`size-4 ${color}`} aria-hidden />
                {label}
              </li>
            ))}
          </ul>
        </div>

        {/* Right content */}
        <RadarCard className="mx-auto max-w-xl lg:max-w-none" />
      </div>
    </section>
  );
}
