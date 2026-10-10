"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const schema = z.object({
  ticketId: z.string().trim().min(3, "Enter a valid ticket ID"),
});

type FormValues = z.infer<typeof schema>;

type TicketSearchProps = {
  defaultValue?: string;
  onSearch?: (ticketId: string) => void;
};

export function TicketSearch({
  defaultValue = "",
  onSearch,
}: TicketSearchProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { ticketId: defaultValue },
  });

  return (
    <Card className="gap-0 rounded-2xl bg-white py-0 shadow-sm">
      <CardContent className="p-5">
        <form
          onSubmit={handleSubmit((values) => onSearch?.(values.ticketId))}
          noValidate
        >
          <Label
            htmlFor="ticket-id"
            className="text-[11px] font-bold uppercase tracking-wide text-slate-600"
          >
            Ticket ID Search
          </Label>

          <div className="mt-2 flex flex-col gap-2 sm:flex-row">
            <div className="relative flex-1">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400"
                aria-hidden
              />
              <Input
                id="ticket-id"
                placeholder="e.g. #CV-84912"
                autoComplete="off"
                aria-invalid={!!errors.ticketId}
                aria-describedby="ticket-id-help"
                className="h-10 bg-slate-50 pl-9"
                {...register("ticketId")}
              />
            </div>
            <Button
              onClick={() => toast("Feature hasn't build yet!")}
              type="submit"
              className="h-10 bg-blue-600 px-6 font-semibold hover:bg-blue-700"
            >
              Track
            </Button>
          </div>

          {errors.ticketId ? (
            <p role="alert" className="mt-2 text-xs text-red-600">
              {errors.ticketId.message}
            </p>
          ) : (
            <p id="ticket-id-help" className="mt-2 text-xs text-slate-500">
              Enter any registered civic reference number to see audit logs.
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
