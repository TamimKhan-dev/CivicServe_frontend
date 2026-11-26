import type { Key, ReactNode } from "react";

export type DataTableColumn<TData> = {
  id: string;
  header: ReactNode;
  cell: (row: TData, index: number) => ReactNode;
  className?: string;
  headerClassName?: string;
};
export type DataTableRowAction<TData> = {
  id: string;
  label: string;
  icon?: ReactNode;
  variant?: "default" | "destructive";
  onSelect: (row: TData) => void;
  disabled?: (row: TData) => boolean;
  hidden?: (row: TData) => boolean;
};
export type DataTablePagination = {
  page: number;
  pageSize: number;
  totalPages: number;
  totalItems?: number;
  onPageChange: (page: number) => void;
};
export type DataTableSplitLoading = { desktop?: ReactNode; mobile?: ReactNode };
export type DataTableLoadingState = ReactNode | DataTableSplitLoading;
export type DataTableProps<TData> = {
  columns: DataTableColumn<TData>[];
  data: TData[];
  getRowId: (row: TData) => Key;
  actions?: DataTableRowAction<TData>[];
  renderActions?: (row: TData, index: number) => ReactNode;
  pagination?: DataTablePagination;
  isLoading?: boolean;
  loadingState?: DataTableLoadingState;
  emptyState?: ReactNode;
  renderMobileRow?: (row: TData, index: number) => ReactNode;
};
