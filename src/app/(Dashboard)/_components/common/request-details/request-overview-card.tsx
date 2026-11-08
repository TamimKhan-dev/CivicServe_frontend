import {
  BadgeCheck,
  Building2,
  ClipboardList,
  MapPin,
  User,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import type { RequestDetails } from "@/types/requests-types";
import { InfoItem } from "./info-item";

export function RequestOverviewCard({ request }: { request: RequestDetails }) {
  const { description, type, service, category, department, location, user } =
    request;

  return (
    <Card className="gap-0 rounded-2xl bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4 pb-4">
        <h2 className="flex items-center gap-3 text-lg font-bold text-slate-900">
          <span className="h-5 w-1 rounded-full bg-blue-600" aria-hidden />
          Reported Case Overview
        </h2>

        <span className="text-xs text-slate-400">Class #INF-2026-DOT</span>
      </div>

      <p className="whitespace-pre-line text-sm leading-relaxed text-slate-700">
        {description}
      </p>

      <div className="mt-6 grid gap-6 border-t pt-6 sm:grid-cols-2">
        <InfoItem
          icon={ClipboardList}
          label="Request Type & Scope"
          value={type === "SERVICE_REQUEST" ? "Service Request" : "Complaint"}
          sub={service?.name}
        />
        <InfoItem
          icon={Building2}
          label="Category & Department"
          value={category?.name ?? "Not specified"}
          sub={department?.name}
        />
        <InfoItem
          icon={MapPin}
          label="Reported Location"
          value={location}
          sub={"41.8781° N, 87.6298° W"}
        />
        <InfoItem
          icon={User}
          label="Submitted By"
          value={user.name}
          sub={
            <span className="inline-flex items-center gap-1 text-emerald-600">
              <BadgeCheck className="size-3.5" aria-hidden />
              Verified Resident (Ward 4)
            </span>
          }
        />
      </div>
    </Card>
  );
}
