"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordToggle } from "@/components/ui/password-toggle";
import { useLogin } from "@/hooks/useAuth";
import { loginSchema } from "@/validations";

export type LoginValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const { mutateAsync: login, isPending } = useLogin();

  const onSubmit = async (payload: LoginValues) => {
    await login(payload);
    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email" className="font-semibold text-slate-900">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="name@example.com"
          aria-invalid={!!errors.email}
          className="h-11"
          {...register("email")}
        />
        {errors.email && (
          <p role="alert" className="text-xs text-red-600">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <Label htmlFor="password" className="font-semibold text-slate-900">
            Password
          </Label>
          <Link
            href="/forgot-password"
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Forgot password?
          </Link>
        </div>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="••••••••"
            aria-invalid={!!errors.password}
            className="h-11 pr-11"
            {...register("password")}
          />
          <PasswordToggle
            onToggle={() => setShowPassword((v) => !v)}
            shown={showPassword}
          />
        </div>
        {errors.password && (
          <p role="alert" className="text-xs text-red-600">
            {errors.password.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="h-11 w-full bg-blue-600 font-semibold hover:bg-blue-700"
      >
        {isPending ? (
          <Loader2 className="size-4 animate-spin" aria-hidden />
        ) : (
          <>
            Log in
            <ArrowRight className="size-4" aria-hidden />
          </>
        )}
      </Button>
    </form>
  );
}
