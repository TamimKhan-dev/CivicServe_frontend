import { Calendar, Pencil } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import type { ProfileData } from "@/types";

type Props = {
  profile: ProfileData;
  isEditing: boolean;
  onEdit: () => void;
};

const initials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export function ProfileCard({ profile, isEditing, onEdit }: Props) {
  const { name, email, profileImage, role, status, emailVerified, createdAt } =
    profile;

  return (
    <Card className="h-fit items-center gap-4 rounded-2xl bg-white p-6 text-center shadow-sm">
      <Avatar className="size-28">
        <AvatarImage src={profileImage ?? undefined} alt={name} />
        <AvatarFallback className="text-2xl font-semibold">
          {initials(name)}
        </AvatarFallback>
      </Avatar>

      <div>
        <h2 className="text-xl font-bold text-slate-900">{name}</h2>
        <p className="text-sm text-slate-600">{email}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 text-xs font-semibold">
        <span className="rounded-full bg-blue-50 px-2.5 py-1 text-blue-700 capitalize">
          {role.toLowerCase()}
        </span>
        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-700 capitalize">
          {status.toLowerCase()}
        </span>
        {emailVerified && (
          <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-indigo-700">
            Verified
          </span>
        )}
      </div>

      <Button
        onClick={onEdit}
        disabled={isEditing}
        className="w-full bg-blue-600 font-semibold hover:bg-blue-700"
      >
        <Pencil className="size-4" aria-hidden />
        Edit Profile
      </Button>

      <p className="flex items-center gap-1.5 border-t pt-4 text-xs text-slate-500">
        <Calendar className="size-3.5" aria-hidden />
        Member since {formatDate(createdAt)}
      </p>
    </Card>
  );
}
