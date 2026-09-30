import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "../_components/auth-shell";
import { DemoLogin } from "../_components/demo-login";
import { LoginForm } from "../_components/Forms/login-form";
import { GoogleButton } from "../_components/google-button";

export const metadata: Metadata = {
  title: "Log in | CivicServe",
};

export default function LoginPage() {
  return (
    <AuthShell
      title="Welcome back"
      description="Sign in to your CivicServe account to continue."
    >
      <LoginForm />
      <GoogleButton />
      <DemoLogin />
      <p className="text-center text-sm text-slate-600">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-semibold text-blue-600 hover:text-blue-700"
        >
          Register
        </Link>
      </p>
    </AuthShell>
  );
}
