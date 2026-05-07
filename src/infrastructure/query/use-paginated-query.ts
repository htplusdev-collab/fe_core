import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { type PaginatedResult, type PaginationParams } from '@domain/value-objects';
import { useCallback } from 'react';

export interface UsePaginatedQueryOptions<TEntity> extends Omit<
    UseQueryOptions<PaginatedResult<TEntity>>,
    'queryKey' | 'queryFn'
> {
    params: PaginationParams;
    queryKey: readonly unknown[];
    queryFn: (params: PaginationParams) => Promise<PaginatedResult<TEntity>>;
}

export function usePaginatedQuery<TEntity>({
    params,
    queryKey,
    queryFn,
    ...options
}: UsePaginatedQueryOptions<TEntity>) {
    const stableQueryFn = useCallback(() => queryFn(params), [queryFn, params]);

    return useQuery({
        queryKey,
        queryFn: stableQueryFn,
        placeholderData: (previousData) => previousData,
        ...options,
    });
}
