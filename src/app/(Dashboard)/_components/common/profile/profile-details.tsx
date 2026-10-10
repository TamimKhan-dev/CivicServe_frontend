import { CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn, formatDate } from "@/lib/utils";
import type { ProfileData } from "@/types";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <dt className="text-[11px] font-bold uppercase tracking-wide text-slate-500">
        {label}
      </dt>
      <dd className="text-sm font-semibold text-slate-900">{children}</dd>
    </div>
  );
}

function Section({
  title,
  hint,
  children,
}: {
  title: string;
  hint: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4 border-t py-6 first:border-t-0 first:pt-0">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-xs font-bold uppercase tracking-wide text-slate-500">
          {title}
        </h3>
        <span className="text-xs text-slate-400">{hint}</span>
      </div>
      <dl className="grid gap-x-6 gap-y-5 sm:grid-cols-2">{children}</dl>
    </section>
  );
}

export function ProfileDetails({ profile }: { profile: ProfileData }) {
  const {
    name,
    email,
    phone,
    profileImage,
    role,
    status,
    emailVerified,
    createdAt,
    updatedAt,
    department,
  } = profile;

  return (
    <Card className="gap-0 rounded-2xl bg-white p-6 shadow-sm">
      <div className="pb-6">
        <h1 className="text-2xl font-bold text-slate-900">My Profile</h1>
        <p className="mt-1 text-sm text-slate-600">
          View and manage your account information.
        </p>
      </div>

      <Section title="Personal Information" hint="Public registry contact card">
        <Field label="Full Name">{name}</Field>
        <Field label="Email Address">{email}</Field>
        <Field label="Phone Number">{phone ?? "Not added"}</Field>
        <Field label="Profile Image">
          {profileImage ? "Uploaded photo (active)" : "No photo"}
        </Field>
      </Section>

      <Section title="Account Information" hint="System credentials & rights">
        <Field label="Account Role">
          <span className="capitalize">{role.toLowerCase()}</span>
        </Field>
        <Field label="Account Status">
          <span
            className={cn(
              "capitalize",
              status === "ACTIVE" ? "text-emerald-600" : "text-red-600",
            )}
          >
            {status.toLowerCase()}
          </span>
        </Field>
        <Field label="Email Verification Status">
          {emailVerified ? (
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="size-4 text-emerald-600" aria-hidden />
              Verified
            </span>
          ) : (
            "Not verified"
          )}
        </Field>
        <Field label="Member Since">{formatDate(createdAt)}</Field>
      </Section>

      <Section title="Additional Information" hint="System audit metadata">
        <Field label="Last Updated">{formatDate(updatedAt)}</Field>
        {department && <Field label="Department">{department?.name}</Field>}
      </Section>
    </Card>
  );
}
