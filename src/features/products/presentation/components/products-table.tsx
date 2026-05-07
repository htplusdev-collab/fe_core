import { useMemo, useState, useCallback } from 'react';
import { DataTable, DataTableToolbar, useDataTable } from '@shared/components/data-table';
import { type PaginationParams, DEFAULT_PAGINATION } from '@domain/value-objects';
import { useProductsQuery } from '../../hooks';
import { createProductColumns } from '../../table';
import { type Product } from '../../domain';

interface ProductsTableProps {
    onEdit: (product: Product) => void;
    onDelete: (product: Product) => void;
}

export function ProductsTable({ onEdit, onDelete }: ProductsTableProps) {
    const [params, setParams] = useState<PaginationParams>(DEFAULT_PAGINATION);
    const [search, setSearch] = useState('');

    const { data, isLoading } = useProductsQuery({ ...params, search });

    const columns = useMemo(() => createProductColumns({ onEdit, onDelete }), [onEdit, onDelete]);

    const { table } = useDataTable({
        data: data?.data ?? [],
        columns,
        pageCount: data?.meta.totalPages ?? 0,
        manualPagination: true,
        manualSorting: true,
        onPaginationChange: (updater) => {
            if (typeof updater === 'function') {
                const newState = updater({
                    pageIndex: params.page - 1,
                    pageSize: params.pageSize,
                });
                setParams((prev) => ({
                    ...prev,
                    page: newState.pageIndex + 1,
                    pageSize: newState.pageSize,
                }));
            }
        },
        onSortingChange: (updater) => {
            if (typeof updater === 'function') {
                const newSorting = updater([]);
                const sort = newSorting[0];
                if (sort) {
                    setParams((prev) => ({
                        ...prev,
                        sortBy: sort.id,
                        sortOrder: sort.desc ? 'desc' : 'asc',
                    }));
                }
            }
        },
    });

    const handleSearchChange = useCallback((value: string) => {
        setSearch(value);
        setParams((prev) => ({ ...prev, page: 1 }));
    }, []);

    return (
        <DataTable
            table={table}
            columns={columns}
            isLoading={isLoading}
            emptyMessage="No products found."
            toolbar={
                <DataTableToolbar
                    searchValue={search}
                    onSearchChange={handleSearchChange}
                    searchPlaceholder="Search products..."
                />
            }
        />
    );
}
