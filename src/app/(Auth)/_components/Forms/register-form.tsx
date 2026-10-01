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
import { Controller, useForm } from "react-hook-form";
import type { z } from "zod";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { PasswordToggle } from "@/components/ui/password-toggle";
import { registerSchema } from "@/validations";
import { PhotoUpload } from "../photo-upload";

export type RegisterValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      photo: null,
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (payload: RegisterValues) => {
    console.log(payload);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <Controller
        control={control}
        name="photo"
        render={({ field }) => (
          <PhotoUpload
            value={field.value}
            onChange={field.onChange}
            error={errors.photo?.message}
          />
        )}
      />

      <Field
        id="fullName"
        label="Full Name"
        icon={User}
        error={errors.fullName?.message}
      >
        <Input
          id="fullName"
          autoComplete="name"
          placeholder="e.g. Eleanor Vance"
          aria-invalid={!!errors.fullName}
          className="h-11 pl-9"
          {...register("fullName")}
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
        hint="At least 8 characters with a number"
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
        disabled={isSubmitting}
        className="h-11 w-full bg-blue-600 font-semibold hover:bg-blue-700"
      >
        {isSubmitting ? (
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
