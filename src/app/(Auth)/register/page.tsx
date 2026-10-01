import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "../_components/auth-shell";
import { RegisterForm } from "../_components/Forms/register-form";
import { GoogleButton } from "../_components/google-button";

export const metadata: Metadata = {
  title: "Create account | CivicServe",
};

export default function RegisterPage() {
  return (
    <AuthShell
      title="Create your account"
      description="Join CivicServe to report issues, request services, and track your requests."
    >
      <RegisterForm />
      <GoogleButton />
      <p className="text-center text-sm text-slate-600">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-blue-600 hover:text-blue-700"
        >
          Log in
        </Link>
      </p>
    </AuthShell>
  );
}
