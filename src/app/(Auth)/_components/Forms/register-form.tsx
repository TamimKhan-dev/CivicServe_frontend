"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  Loader2,
  Lock,
  LockKeyhole,
  Mail,
  Phone,
  User,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { PasswordToggle } from "@/components/ui/password-toggle";
import { useRegisterUser } from "@/hooks/useAuth";
import { registerSchema } from "@/validations";

export type RegisterValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { mutate: registerUser, isPending } = useRegisterUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (payload: RegisterValues) => {
    const { confirmPassword, ...resInfo } = payload;

    registerUser(resInfo, {
      onSuccess: () => {
        toast.success("OTP Sent to Email Successfully!");
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">

      <Field
        id="fullName"
        label="Full Name"
        icon={User}
        error={errors.name?.message}
      >
        <Input
          id="fullName"
          autoComplete="name"
          placeholder="e.g. Eleanor Vance"
          aria-invalid={!!errors.name}
          className="h-11 pl-9"
          {...register("name")}
        />
      </Field>

      <Field
        id="email"
        label="Email Address"
        icon={Mail}
        error={errors.email?.message}
      >
        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="name@example.com"
          aria-invalid={!!errors.email}
          className="h-11 pl-9"
          {...register("email")}
        />
      </Field>

      <Field
        id="phone"
        label="Phone Number(Optional)"
        icon={Phone}
        error={errors.phone?.message}
      >
        <Input
          id="phone"
          type="tel"
          autoComplete="tel"
          placeholder="(+880) 1800-000000"
          aria-invalid={!!errors.phone}
          className="h-11 pl-9"
          {...register("phone")}
        />
      </Field>

      <Field
        id="password"
        label="Password"
        icon={Lock}
        error={errors.password?.message}
        hint="At least 5 characters with a number"
        trailing={
          <PasswordToggle
            shown={showPassword}
            onToggle={() => setShowPassword((v) => !v)}
          />
        }
      >
        <Input
          id="password"
          type={showPassword ? "text" : "password"}
          autoComplete="new-password"
          placeholder="••••••••"
          aria-invalid={!!errors.password}
          className="h-11 pl-9 pr-11"
          {...register("password")}
        />
      </Field>

      <Field
        id="confirmPassword"
        label="Confirm Password"
        icon={LockKeyhole}
        error={errors.confirmPassword?.message}
        trailing={
          <PasswordToggle
            shown={showConfirm}
            onToggle={() => setShowConfirm((v) => !v)}
          />
        }
      >
        <Input
          id="confirmPassword"
          type={showConfirm ? "text" : "password"}
          autoComplete="new-password"
          placeholder="••••••••"
          aria-invalid={!!errors.confirmPassword}
          className="h-11 pl-9 pr-11"
          {...register("confirmPassword")}
        />
      </Field>

      <Button
        type="submit"
        disabled={isPending}
        className="h-11 w-full bg-blue-600 font-semibold hover:bg-blue-700"
      >
        {isPending ? (
          <Loader2 className="size-4 animate-spin" aria-hidden />
        ) : (
          <>
            Create Account
            <ArrowRight className="size-4" aria-hidden />
          </>
        )}
      </Button>
    </form>
  );
}
