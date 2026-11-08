import { formatDateTime } from "@/lib/utils";
import type { RequestDetails } from "@/types/requests-types";

export type TimelineStep = {
  id: string;
  title: string;
  state: "DONE" | "ACTIVE" | "PENDING" | "REJECTED";
  tag: string;
  description: string;
  note?: string | null;
};

const RANK: Record<string, number> = {
  PENDING: 1,
  ASSIGNED: 2,
  IN_PROGRESS: 3,
  RESOLVED: 4,
};

export function getStageLabel(request: RequestDetails) {
  if (request.status === "RESOLVED") return "Completed";
  if (request.status === "REJECTED") return "Closed";
  return `Stage ${RANK[request.status] ?? 1} of 4`;
}

export function buildTimelineSteps(request: RequestDetails): TimelineStep[] {
  const { status, createdAt, updatedAt, assignedStaff, user } = request;
  const lastChange = formatDateTime(updatedAt);

  const submitted: TimelineStep = {
    id: "submitted",
    title: "Request Submitted",
    state: "DONE",
    tag: "LOGGED",
    description: `${formatDateTime(createdAt)} • Filed by ${user.name}.`,
  };

  if (status === "REJECTED") {
    return [
      submitted,
      {
        id: "rejected",
        title: "Request Rejected",
        state: "REJECTED",
        tag: "REJECTED",
        description: lastChange,
      },
    ];
  }

  const rank = RANK[status] ?? 1;

  const stateFor = (stepRank: number): TimelineStep["state"] => {
    if (stepRank < rank) return "DONE";
    if (stepRank === rank) return status === "IN_PROGRESS" ? "ACTIVE" : "DONE";
    return "PENDING";
  };

  const describe = (stepRank: number, text: string) =>
    stepRank === rank ? `${lastChange} • ${text}` : text;

  const assignedState = stateFor(2);
  const startedState = stateFor(3);
  const resolvedState = stateFor(4);

  return [
    submitted,
    {
      id: "assigned",
      title: "Staff Assigned",
      state: assignedState,
      tag: assignedState === "DONE" ? "ASSIGNED" : "PENDING",
      description:
        assignedState === "DONE"
          ? describe(
              2,
              assignedStaff
                ? `Allocated to ${assignedStaff.name}.`
                : "A staff member has been assigned.",
            )
          : "Waiting for an administrator to assign a staff member.",
    },
    {
      id: "started",
      title: "Work Started",
      state: startedState,
      tag:
        startedState === "PENDING"
          ? "PENDING"
          : startedState === "ACTIVE"
            ? "IN PROGRESS"
            : "STARTED",
      description:
        startedState === "PENDING"
          ? "Work has not started yet."
          : describe(3, "Field work has started on this request."),
    },
    {
      id: "resolved",
      title: "Request Resolved",
      state: resolvedState,
      tag: resolvedState === "DONE" ? "RESOLVED" : "PENDING",
      description:
        resolvedState === "DONE"
          ? describe(4, "The request has been resolved.")
          : "Waiting for the work to be completed.",
    },
  ];
}
