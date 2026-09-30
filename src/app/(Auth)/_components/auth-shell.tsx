import { ArrowLeft, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Logo } from "@/components/ui/logo";

type AuthShellProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export function AuthShell({ title, description, children }: AuthShellProps) {
  return (
    <div className="flex min-h-dvh flex-col bg-linear-to-b from-slate-100 to-slate-50">
      {/* Top bar */}
      <div className="mx-auto flex w-full max-w-md items-center justify-between gap-3 px-4 py-4 sm:max-w-lg">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Back to CivicServe Home
        </Link>
        <Badge className="gap-1.5 rounded-full bg-emerald-50 text-[11px] font-semibold text-emerald-700 hover:bg-emerald-50">
          <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden />
          SSO Active
        </Badge>
      </div>

      {/* Card */}
      <main className="flex flex-1 items-start justify-center px-4 pb-8 sm:items-center">
        <Card className="w-full max-w-md gap-0 rounded-2xl bg-white py-0 shadow-xl sm:max-w-lg">
          <CardContent className="p-5 sm:p-8">
            <div className="flex flex-col items-center text-center">
              <Logo />
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                Municipal Digital Portal
              </p>
              <h1 className="mt-6 text-lg font-bold text-slate-900">{title}</h1>
              <p className="mt-1 text-sm text-slate-600">{description}</p>
            </div>

            <div className="mt-6 space-y-5">{children}</div>
          </CardContent>
        </Card>
      </main>

      {/* Footer note */}
      <p className="flex items-center justify-center gap-2 px-4 pb-6 text-center text-xs text-slate-500">
        <ShieldCheck className="size-4 shrink-0 text-emerald-600" aria-hidden />
        Gov-Verified Identity • 256-bit Municipal Encryption
      </p>
    </div>
  );
}
