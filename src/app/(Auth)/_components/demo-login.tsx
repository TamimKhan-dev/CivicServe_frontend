"use client";

import { Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLogin } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import type { UserRole } from "@/types";
import { OPTIONS } from "./Others/demo-login-data";

const DEMO_CREDENTIALS: Record<UserRole, { email: string; password: string }> =
  {
    ADMIN: { email: "testeradmin@gmail.com", password: "Tester@admin12345" },
    STAFF: { email: "testerstaff@gmail.com", password: "Tester@staff12345" },
    CITIZEN: {
      email: "testercitizen@gmail.com",
      password: "Tester@citizen12345",
    },
  };

export function DemoLogin() {
  const router = useRouter();
  const { mutate: demoLogin, isPending } = useLogin();

  const handleDemoLogin = (role: UserRole) => {
    demoLogin(DEMO_CREDENTIALS[role], {
      onSuccess: () => {
        router.push("/");
      },
    });
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <span className="h-px flex-1 bg-slate-200" />
        <span className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">
          Quick Demo Login
        </span>
        <span className="h-px flex-1 bg-slate-200" />
      </div>

      <ul className="space-y-2.5">
        {OPTIONS.map((o) => (
          <li key={o.role}>
            <button
              type="button"
              disabled={isPending}
              onClick={() => handleDemoLogin(o.role)}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-left transition-colors disabled:cursor-not-allowed disabled:opacity-60",
                o.rowClass,
              )}
            >
              <span
                className={cn(
                  "flex size-9 shrink-0 items-center justify-center rounded-lg",
                  o.iconClass,
                )}
              >
                <o.icon className="size-4" aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                  <span className="text-sm font-bold text-slate-900">
                    {o.title}
                  </span>
                  <span
                    className={cn(
                      "rounded px-1.5 py-px text-[10px] font-semibold",
                      o.tagClass,
                    )}
                  >
                    {o.tag}
                  </span>
                </span>
                <span className="mt-0.5 block text-xs text-slate-500">
                  {o.subtitle}
                </span>
              </span>
              <Zap className="size-4 shrink-0 text-slate-400" aria-hidden />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
