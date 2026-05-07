import { useState, useMemo, useCallback } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    type ColumnDef,
    type SortingState,
    type ColumnFiltersState,
    type VisibilityState,
    type RowSelectionState,
    type PaginationState,
    type OnChangeFn,
} from '@tanstack/react-table';
import { type PaginationMeta } from '@domain/value-objects';

export interface UseDataTableOptions<TData> {
    data: TData[];
    columns: ColumnDef<TData>[];
    pageCount?: number;
    meta?: PaginationMeta;
    manualPagination?: boolean;
    manualSorting?: boolean;
    manualFiltering?: boolean;
    onPaginationChange?: OnChangeFn<PaginationState>;
    onSortingChange?: OnChangeFn<SortingState>;
    initialPageSize?: number;
}

export function useDataTable<TData>({
    data,
    columns,
    pageCount,
    manualPagination = false,
    manualSorting = false,
    manualFiltering = false,
    onPaginationChange,
    onSortingChange,
    initialPageSize = 10,
}: UseDataTableOptions<TData>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: initialPageSize,
    });

    const handleSortingChange: OnChangeFn<SortingState> = useCallback(
        (updater) => {
            setSorting(updater);
            onSortingChange?.(updater);
        },
        [onSortingChange],
    );

    const handlePaginationChange: OnChangeFn<PaginationState> = useCallback(
        (updater) => {
            setPagination(updater);
            onPaginationChange?.(updater);
        },
        [onPaginationChange],
    );

    const table = useReactTable({
        data,
        columns,
        pageCount,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            pagination,
        },
        enableRowSelection: true,
        onSortingChange: handleSortingChange,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        onPaginationChange: handlePaginationChange,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: manualFiltering ? undefined : getFilteredRowModel(),
        getPaginationRowModel: manualPagination ? undefined : getPaginationRowModel(),
        getSortedRowModel: manualSorting ? undefined : getSortedRowModel(),
        manualPagination,
        manualSorting,
        manualFiltering,
    });

    const selectedRows = useMemo(
        () => table.getFilteredSelectedRowModel().rows.map((row) => row.original),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [rowSelection, table],
    );

    return {
        table,
        sorting,
        columnFilters,
        columnVisibility,
        rowSelection,
        pagination,
        selectedRows,
    };
}
