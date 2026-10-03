"use client";

import { useGetMe } from "@/hooks/useAuth";

export default function WelcomeHeading() {
  const { data } = useGetMe();
  const user = data?.data;
  return (
    <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
      Welcome back, {user.name} <span aria-hidden>👋</span>
    </h1>
  );
}
