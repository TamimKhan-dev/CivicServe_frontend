import type { ReactNode } from "react";
import type {
  PaymentStatus,
  RequestStatus,
  RequestType,
} from "@/types/requests-types";

export type RequestItem = {
  id: string;
  title: string;
  createdAt: string;
  status: RequestStatus;
  type: RequestType;
  category?: { name: string } | null;
  service?: { name: string; fee: number | string } | null;
  payment?: { status: PaymentStatus; amount: number | string } | null;
};

export type RequestTableProps = {
  requests: RequestItem[];
  isPending: boolean;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems?: number;
  pageSize?: number;
  renderActions: (request: RequestItem) => ReactNode;
};
