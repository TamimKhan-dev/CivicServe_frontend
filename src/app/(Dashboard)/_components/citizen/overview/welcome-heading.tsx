"use client";

import { useAuth } from "@/providers/auth.provider";

export default function WelcomeHeading() {
  const { user } = useAuth();

  return (
    <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
      Welcome back, {user?.name} <span aria-hidden>👋</span>
    </h1>
  );
}
