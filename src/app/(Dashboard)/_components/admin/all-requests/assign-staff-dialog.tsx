"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton";
import { useAssignStaff, useStaffList } from "@/hooks/useRequests";
import { cn } from "@/lib/utils";

type StaffItem = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  profileImage: string | null;
};

const initials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export function AssignStaffDialog({ requestId }: { requestId: string }) {
  const [open, setOpen] = useState(false);
  const [staffId, setStaffId] = useState("");

  const { data, isPending: isLoadingStaff } = useStaffList({ enabled: open });
  const { mutate: assign, isPending: isAssigning } = useAssignStaff();

  const staff: StaffItem[] = data?.data ?? [];

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) setStaffId("");
  };

  const handleAssign = () => {
    assign(
      { requestId, staffId },
      {
        onSuccess: () => {
          toast.success("Staff assigned");
          handleOpenChange(false);
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="h-8 bg-blue-600 px-3 text-xs font-semibold hover:bg-blue-700"
        >
          Assign Staff
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign Staff</DialogTitle>
          <DialogDescription>
            Select a staff member for request{" "}
            <span className="font-mono font-semibold text-slate-700">
              {requestId.slice(0, 8)}
            </span>
            .
          </DialogDescription>
        </DialogHeader>

        {isLoadingStaff ? (
          <div className="space-y-2">
            <Skeleton className="h-14 rounded-xl" />
            <Skeleton className="h-14 rounded-xl" />
            <Skeleton className="h-14 rounded-xl" />
          </div>
        ) : staff.length === 0 ? (
          <p className="py-6 text-center text-sm text-slate-500">
            No staff available.
          </p>
        ) : (
          <RadioGroup
            value={staffId}
            onValueChange={setStaffId}
            className="max-h-72 gap-2 overflow-y-auto pr-1"
          >
            {staff.map((s) => (
              <Label
                key={s.id}
                htmlFor={s.id}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition-colors",
                  staffId === s.id
                    ? "border-blue-600 bg-blue-50/60"
                    : "hover:bg-slate-50",
                )}
              >
                <RadioGroupItem id={s.id} value={s.id} />
                <Avatar className="size-9">
                  <AvatarImage src={s.profileImage ?? undefined} alt="" />
                  <AvatarFallback className="text-xs">
                    {initials(s.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-900">
                    {s.name}
                  </p>
                  <p className="truncate text-xs font-normal text-slate-500">
                    {s.email}
                  </p>
                </div>
                {s.phone && (
                  <span className="hidden shrink-0 text-xs font-normal text-slate-400 sm:block">
                    {s.phone}
                  </span>
                )}
              </Label>
            ))}
          </RadioGroup>
        )}

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={isAssigning}
          >
            Cancel
          </Button>
          <Button
            type="button"
            disabled={!staffId || isAssigning}
            onClick={handleAssign}
            className="bg-slate-900 font-semibold hover:bg-slate-800"
          >
            {isAssigning ? "Assigning..." : "Confirm Assignment"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
