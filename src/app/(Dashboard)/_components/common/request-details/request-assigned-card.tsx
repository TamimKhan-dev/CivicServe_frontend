import { Mail, UserX } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { getInitials } from "@/lib/utils";
import type { RequestDetails } from "@/types/requests-types";

export function RequestAssignmentCard({
  request,
}: {
  request: RequestDetails;
}) {
  const { assignedStaff, department } = request;

  return (
    <Card className="gap-0 rounded-2xl bg-white p-5 shadow-sm">
      <h2 className="pb-4 text-[11px] font-bold uppercase tracking-wide text-slate-500">
        Assignment Details
      </h2>

      {assignedStaff ? (
        <div className="flex items-center gap-3">
          <Avatar className="size-12">
            <AvatarImage src={assignedStaff.profileImage ?? undefined} alt="" />
            <AvatarFallback className="bg-blue-600 font-semibold text-white">
              {getInitials(assignedStaff.name)}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0 space-y-1">
            <p className="truncate font-semibold text-slate-900">
              {assignedStaff.name}
            </p>
            {assignedStaff.email && (
              <p className="flex items-center gap-1.5 text-xs text-slate-500">
                <Mail className="size-3.5 shrink-0" aria-hidden />
                <span className="truncate">{assignedStaff.email}</span>
              </p>
            )}
            {assignedStaff.department && (
              <span className="inline-block rounded bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-blue-700">
                {assignedStaff.department.name}
              </span>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 py-4 text-center">
          <span className="flex size-10 items-center justify-center rounded-full bg-slate-100 text-slate-400">
            <UserX className="size-5" aria-hidden />
          </span>
          <p className="font-semibold text-slate-900">Not assigned yet</p>
          <p className="max-w-56 text-xs text-slate-500">
            {department
              ? `Awaiting staff allocation from ${department.name}.`
              : "Awaiting staff allocation from an administrator."}
          </p>
        </div>
      )}
    </Card>
  );
}
