export interface PaginationParams {
    page: number;
    pageSize: number;
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

export interface PaginationMeta {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

export interface PaginatedResult<T> {
    data: T[];
    meta: PaginationMeta;
}

export function createPaginationMeta(
    page: number,
    pageSize: number,
    totalItems: number,
): PaginationMeta {
    const totalPages = Math.ceil(totalItems / pageSize);
    return {
        currentPage: page,
        pageSize,
        totalItems,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
    };
}

export const DEFAULT_PAGINATION: PaginationParams = {
    page: 1,
    pageSize: 10,
};
