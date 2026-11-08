import type { UserRole } from "@/types";
import type { RequestItem } from "./request-table-types";

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

export const formatMoney = (amount: number | string) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    Number(amount),
  );
