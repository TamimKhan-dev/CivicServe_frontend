import type { RequestItem } from "@/app/(Dashboard)/_components/common/data-table/request-table-types";
import type { UserRole } from "@/types";

export const isService = (r: RequestItem) => r.type === "SERVICE_REQUEST";

export const needsPayment = (r: RequestItem) =>
  isService(r) &&
  r.status !== "REJECTED" &&
  r.payment?.status !== "PAID" &&
  r.payment?.status !== "REFUNDED";

export const canAssignStaff = (r: RequestItem) =>
  r.status === "SUBMITTED" && (!isService(r) || r.payment?.status === "PAID");

export const isAwaitingPayment = (r: RequestItem) =>
  r.status === "SUBMITTED" && isService(r) && r.payment?.status !== "PAID";

export function hasRoleAction(r: RequestItem, role: UserRole) {
  if (role === "CITIZEN") return needsPayment(r);
  if (role === "STAFF")
    return r.status === "ASSIGNED" || r.status === "IN_PROGRESS";
  return canAssignStaff(r);
}
