import type { RequestItem } from "./request-table-types";

export const isService = (r: RequestItem) => r.type === "SERVICE_REQUEST";

export const needsPayment = (r: RequestItem) =>
  isService(r) &&
  r.status !== "REJECTED" &&
  r.payment?.status !== "PAID" &&
  r.payment?.status !== "REFUNDED";
