import { isValidElement, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type {
  DataTableLoadingState,
  DataTableProps,
  DataTableRowAction,
  DataTableSplitLoading,
} from "./data-table-types";
import { TablePagination } from "./table-pagination";

type RowActionsProps<TData> = {
  row: TData;
  index: number;
  actions?: DataTableRowAction<TData>[];
  renderActions?: (row: TData, index: number) => ReactNode;
  className?: string;
};

function RowActions<TData>({
  row,
  index,
  actions,
  renderActions,
  className,
}: RowActionsProps<TData>) {
  const visibleActions = actions?.filter((action) => !action.hidden?.(row));

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {visibleActions?.map((action) => (
        <Button
          key={action.id}
          type="button"
          size="sm"
          variant={action.variant === "destructive" ? "destructive" : "outline"}
          disabled={action.disabled?.(row)}
          onClick={() => action.onSelect(row)}
        >
          {action.icon}
          {action.label}
        </Button>
      ))}
      {renderActions?.(row, index)}
    </div>
  );
}

function isSplitLoading(
  state: DataTableLoadingState,
): state is DataTableSplitLoading {
  return (
    typeof state === "object" &&
    state !== null &&
    !Array.isArray(state) &&
    !isValidElement(state) &&
    ("desktop" in state || "mobile" in state)
  );
}

export default function DataTable<TData>({
  columns,
  data,
  getRowId,
  actions,
  renderActions,
  pagination,
  isLoading = false,
  loadingState,
  emptyState,
  renderMobileRow,
}: DataTableProps<TData>) {
  const hasActions = Boolean(actions?.length || renderActions);
  const isEmpty = !isLoading && data.length === 0;
  const splitLoading =
    isLoading && isSplitLoading(loadingState) ? loadingState : null;

  return (
    <Card className="gap-0 overflow-hidden rounded-2xl bg-white py-0 shadow-sm">
      {isLoading && !splitLoading ? (
        ((loadingState as ReactNode) ?? (
          <output className="block px-4 py-14 text-center text-sm text-slate-600">
            Loading…
          </output>
        ))
      ) : isEmpty ? (
        (emptyState ?? (
          <div className="px-4 py-14 text-center text-sm text-slate-600">
            No data found
          </div>
        ))
      ) : (
        <>
          {/* Desktop */}
          <div className="hidden md:block">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow className="hover:bg-slate-50">
                  {columns.map((column) => (
                    <TableHead
                      key={column.id}
                      className={cn(
                        "h-11 px-4 text-xs font-semibold uppercase tracking-wide text-slate-600 first:pl-6",
                        column.headerClassName,
                      )}
                    >
                      {column.header}
                    </TableHead>
                  ))}
                  {hasActions && (
                    <TableHead className="h-11 px-4 pr-6 text-right text-xs font-semibold uppercase tracking-wide text-slate-600">
                      Action
                    </TableHead>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {splitLoading
                  ? splitLoading.desktop
                  : data.map((row, index) => (
                      <TableRow key={getRowId(row)}>
                        {columns.map((column) => (
                          <TableCell
                            key={column.id}
                            className={cn(
                              "px-4 py-4 text-sm text-slate-700 first:pl-6",
                              column.className,
                            )}
                          >
                            {column.cell(row, index)}
                          </TableCell>
                        ))}
                        {hasActions && (
                          <TableCell className="px-4 pr-6">
                            <RowActions
                              row={row}
                              index={index}
                              actions={actions}
                              renderActions={renderActions}
                              className="justify-end"
                            />
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile */}
          <ul className="divide-y md:hidden">
            {splitLoading
              ? splitLoading.mobile
              : data.map((row, index) => (
                  <li key={getRowId(row)} className="space-y-3 p-4">
                    {renderMobileRow ? (
                      renderMobileRow(row, index)
                    ) : (
                      <dl className="space-y-2">
                        {columns.map((column) => (
                          <div
                            key={column.id}
                            className="flex items-start justify-between gap-4"
                          >
                            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                              {column.header}
                            </dt>
                            <dd className="min-w-0 text-right text-sm text-slate-700">
                              {column.cell(row, index)}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    )}
                    {hasActions && (
                      <RowActions
                        row={row}
                        index={index}
                        actions={actions}
                        renderActions={renderActions}
                      />
                    )}
                  </li>
                ))}
          </ul>
        </>
      )}

      {pagination && !isLoading && !isEmpty && (
        <TablePagination
          className="border-t"
          page={pagination.page}
          totalPages={pagination.totalPages}
          totalItems={pagination.totalItems}
          pageSize={pagination.pageSize}
          onPageChange={pagination.onPageChange}
        />
      )}
    </Card>
  );
}
