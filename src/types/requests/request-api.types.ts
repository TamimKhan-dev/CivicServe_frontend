import type { RequestType } from "./request.types";

export type QueryParams = {
  page: number;
  limit: number;
  searchTerm?: string;
  status?: string;
  categoryId?: string;
  sortBy: string;
  sortOrder: "asc" | "desc";
};

export type CreateRequestPayload = {
  type: RequestType;
  title: string;
  description: string;
  location: string;
  departmentId: string;
  categoryId: string;
  serviceId?: string;
};

export type CreateRequestResponse = {
  data: { id: string };
};
