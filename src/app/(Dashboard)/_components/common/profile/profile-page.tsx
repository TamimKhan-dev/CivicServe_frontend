"use client";

import { useState } from "react";
import { DUMMY_PROFILE } from "./dummy-profile";
import { ProfileCard } from "./profile-card";
import { ProfileDetails } from "./profile-details";
import { ProfileEditForm } from "./profile-edit-form";

export function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const profile = DUMMY_PROFILE;

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <ProfileCard
        profile={profile}
        isEditing={isEditing}
        onEdit={() => setIsEditing(true)}
      />

      {/* Piece 2 and 3 go here: details view, then edit form */}
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
