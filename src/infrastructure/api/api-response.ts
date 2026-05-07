export interface ApiResponse<T> {
    data: T;
    message?: string;
    success: boolean;
}

export interface ApiListResponse<T> {
    data: T[];
    meta: {
        currentPage: number;
        pageSize: number;
        totalItems: number;
        totalPages: number;
    };
}

export interface ApiErrorResponse {
    message: string;
    code?: string;
    errors?: Record<string, string[]>;
}

export function unwrapResponse<T>(response: ApiResponse<T>): T {
    return response.data;
}
