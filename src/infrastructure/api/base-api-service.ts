import { type HttpClient } from '@infrastructure/http';
import { type ApiListResponse, type ApiResponse } from './api-response';

export interface ApiQueryParams {
    page?: number;
    pageSize?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    [key: string]: unknown;
}

export abstract class BaseApiService<TDto, TCreateDto = Partial<TDto>, TUpdateDto = Partial<TDto>> {
    constructor(
        protected readonly http: HttpClient,
        protected readonly basePath: string,
    ) {}

    async getAll(params?: ApiQueryParams): Promise<ApiListResponse<TDto>> {
        return this.http.get<ApiListResponse<TDto>>(this.basePath, { params });
    }

    async getById(id: string): Promise<ApiResponse<TDto>> {
        return this.http.get<ApiResponse<TDto>>(`${this.basePath}/${id}`);
    }

    async create(data: TCreateDto): Promise<ApiResponse<TDto>> {
        return this.http.post<ApiResponse<TDto>>(this.basePath, data);
    }

    async update(id: string, data: TUpdateDto): Promise<ApiResponse<TDto>> {
        return this.http.put<ApiResponse<TDto>>(`${this.basePath}/${id}`, data);
    }

    async patch(id: string, data: Partial<TUpdateDto>): Promise<ApiResponse<TDto>> {
        return this.http.patch<ApiResponse<TDto>>(`${this.basePath}/${id}`, data);
    }

    async remove(id: string): Promise<void> {
        await this.http.delete(`${this.basePath}/${id}`);
    }
}
