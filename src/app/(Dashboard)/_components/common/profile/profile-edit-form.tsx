"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ProfileData } from "./dummy-profile";
import { type ProfileFormValues, profileSchema } from "./profile-schema";

type Props = {
  profile: ProfileData;
  onCancel: () => void;
  onSaved: () => void;
};

export function ProfileEditForm({ profile, onCancel, onSaved }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: profile.name, phone: profile.phone ?? "" },
  });

  const image = watch("image");
  useEffect(() => {
    if (!image) {
      setPreview(null);
      return;
    }
    const url = URL.createObjectURL(image);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [image]);

  const onSubmit = async (values: ProfileFormValues) => {
    console.log(values);
    await new Promise((r) => setTimeout(r, 800));
    toast.success("Profile updated");
    onSaved();
  };

  return (
    <Card className="gap-0 rounded-2xl bg-white p-6 shadow-sm">
      <div className="pb-6">
        <h1 className="text-2xl font-bold text-slate-900">Edit Profile</h1>
        <p className="mt-1 text-sm text-slate-600">
          You can update your name, phone number, and photo.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Image */}
        <div className="flex items-center gap-4">
          <Avatar className="size-16">
            <AvatarImage
              src={preview ?? profile.profileImage ?? undefined}
              alt=""
            />
            <AvatarFallback>{profile.name[0]}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file)
                  setValue("image", file, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
              }}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fileRef.current?.click()}
            >
              Change photo
            </Button>
            {errors.image && (
              <p className="text-xs text-red-600">{errors.image.message}</p>
            )}
          </div>
        </div>

        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" {...register("name")} />
          {errors.name && (
            <p className="text-xs text-red-600">{errors.name.message}</p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" {...register("phone")} />
          {errors.phone && (
            <p className="text-xs text-red-600">{errors.phone.message}</p>
          )}
        </div>

        <div className="flex justify-end gap-3 border-t pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={!isDirty || isSubmitting}
            className="bg-blue-600 font-semibold hover:bg-blue-700"
          >
            {isSubmitting && (
              <Loader2 className="size-4 animate-spin" aria-hidden />
            )}
            Save Changes
          </Button>
        </div>
      </form>
    </Card>
  );
}
