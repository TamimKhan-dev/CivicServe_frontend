// profile-page.tsx
"use client";

import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetMe } from "@/hooks/useAuth";
import type { ProfileData } from "./dummy-profile";
import { ProfileCard } from "./profile-card";
import { ProfileDetails } from "./profile-details";
import { ProfileEditForm } from "./profile-edit-form";

export function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const { data, isPending, isError } = useGetMe();

  if (isPending) {
    return (
      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <Skeleton className="h-80 rounded-2xl" />
        <Skeleton className="h-125 rounded-2xl" />
      </div>
    );
  }

  const profile: ProfileData | undefined = data?.data;

  if (isError || !profile) {
    return (
      <p className="rounded-2xl bg-white p-6 text-sm text-red-600 shadow-sm">
        Could not load your profile. Please refresh the page.
      </p>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <ProfileCard
        profile={profile}
        isEditing={isEditing}
        onEdit={() => setIsEditing(true)}
      />
      {isEditing ? (
        <ProfileEditForm
          profile={profile}
          onCancel={() => setIsEditing(false)}
          onSaved={() => setIsEditing(false)}
        />
      ) : (
        <ProfileDetails profile={profile} />
      )}
    </div>
  );
}
