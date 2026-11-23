import type {
  StepStatus,
  TrackedTicket,
} from "@/app/(Public)/_components/Home/cards/ticket-timeline-card";
import { formatDate } from "@/lib/utils";
import type { RequestDetails } from "@/types";

const FLOW = ["SUBMITTED", "ASSIGNED", "IN_PROGRESS", "RESOLVED"];

function stepStatus(i: number, current: number): StepStatus {
  if (current === FLOW.length - 1 || i < current) return "done";
  return i === current ? "active" : "pending";
}

export function mapRequestToTicket(r: RequestDetails): TrackedTicket {
  const isRejected = r.status === "REJECTED";
  const current = Math.max(FLOW.indexOf(r.status), 0);
  const staff = r.assignedStaff;

  const steps = [
    {
      title: "Request Received & Verified",
      description: `Logged under ${r.category?.name}.`,
      time: formatDate(r.createdAt),
    },
    {
      title: staff ? `Assigned: ${r.department?.name}` : "Awaiting Assignment",
      description: staff
        ? `Handled by ${staff.name}.`
        : "An admin will assign a staff member soon.",
      time: "",
    },
    {
      title: "Work In Progress",
      description: "Staff is investigating and working on the request.",
      time: current === 2 ? "Live Status" : "",
    },
    {
      title: isRejected ? "Request Rejected" : "Resolution & Sign-off",
      description: isRejected
        ? "This request was reviewed and could not be accepted."
        : "Issue resolved and closed.",
      time: isRejected || current === 3 ? formatDate(r.updatedAt) : "",
    },
  ].map((s, i) => ({
    ...s,
    spin: i === 2 && r.status === "IN_PROGRESS",
    status: isRejected
      ? ((i === 0 || i === 3 ? "done" : "pending") as StepStatus)
      : stepStatus(i, current),
  }));

  return {
    id: r.id,
    priority: r.type === "SERVICE_REQUEST" ? "Service Request" : "Complaint",
    category: r.category?.name as string,
    title: r.title,
    location: r.location,
    targetLabel: "Service Fee",
    targetValue: r.payment
      ? `${r.payment.status} · ${r.payment.amount}`
      : "No fee",
    steps,
  };
}
