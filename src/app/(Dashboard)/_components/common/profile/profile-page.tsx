"use client";

import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/providers/auth.provider";
import type { ProfileData } from "@/types";
import { ProfileCard } from "./profile-card";
import { ProfileDetails } from "./profile-details";
import { ProfileEditForm } from "./profile-edit-form";

export function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <Skeleton className="h-80 rounded-2xl" />
        <Skeleton className="h-125 rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <ProfileCard
        profile={user as ProfileData}
        isEditing={isEditing}
        onEdit={() => setIsEditing(true)}
      />
      {isEditing ? (
        <ProfileEditForm
          profile={user as ProfileData}
          onCancel={() => setIsEditing(false)}
          onSaved={() => setIsEditing(false)}
        />
      ) : (
        <ProfileDetails profile={user as ProfileData} />
      )}
    </div>
  );
}
