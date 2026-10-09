"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAssignStaff, useStaffList } from "@/hooks/useRequests";

export function AssignStaffDialog({ requestId }: { requestId: string }) {
  const [open, setOpen] = useState(false);
  const [staffId, setStaffId] = useState("");

  const { data, isPending: isLoadingStaff } = useStaffList({ enabled: open });
  const { mutate: assign, isPending: isAssigning } = useAssignStaff();

  const staff = data?.data ?? [];

  console.log(staff);

  const handleAssign = () => {
    assign(
      { requestId, staffId },
      {
        onSuccess: () => {
          toast.success("Staff assigned");
          setOpen(false);
          setStaffId("");
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
        </DialogHeader>

        <Select
          value={staffId}
          onValueChange={setStaffId}
          disabled={isLoadingStaff}
        >
          <SelectTrigger>
            <SelectValue
              placeholder={isLoadingStaff ? "Loading..." : "Select staff"}
            />
          </SelectTrigger>
          <SelectContent>
            {staff.map((s: { id: string; name: string }) => (
              <SelectItem key={s.id} value={s.id}>
                {s.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <DialogFooter>
          <Button disabled={!staffId || isAssigning} onClick={handleAssign}>
            {isAssigning ? "Assigning..." : "Assign"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
