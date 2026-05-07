import axios, {
    type AxiosInstance,
    type AxiosRequestConfig,
    type AxiosResponse,
    type InternalAxiosRequestConfig,
} from 'axios';
import { type ApiError, AppError, NetworkError, ValidationError } from './errors';

export interface HttpClientConfig {
    baseURL: string;
    timeout?: number;
    headers?: Record<string, string>;
}

export class HttpClient {
    private readonly instance: AxiosInstance;

    constructor(config: HttpClientConfig) {
        this.instance = axios.create({
            baseURL: config.baseURL,
            timeout: config.timeout ?? 30_000,
            headers: {
                'Content-Type': 'application/json',
                ...config.headers,
            },
        });

        this.setupInterceptors();
    }

    private setupInterceptors(): void {
        this.instance.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                const token = localStorage.getItem('auth_token');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error: unknown) => Promise.reject(AppError.from(error)),
        );

        this.instance.interceptors.response.use(
            (response: AxiosResponse) => response,
            (error: unknown) => {
                if (axios.isAxiosError(error)) {
                    if (!error.response) {
                        throw new NetworkError(error.message);
                    }

                    const apiError = error.response.data as ApiError | undefined;
                    const status = error.response.status;

                    if (status === 422 && apiError?.errors) {
                        throw new ValidationError(apiError.message, apiError.errors);
                    }

                    throw new AppError(apiError?.message ?? error.message, status, apiError?.code);
                }

                throw AppError.from(error);
            },
        );
    }

    async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.instance.get<T>(url, config);
        return response.data;
    }

    async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.instance.post<T>(url, data, config);
        return response.data;
    }

    async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.instance.put<T>(url, data, config);
        return response.data;
    }

    async patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.instance.patch<T>(url, data, config);
        return response.data;
    }

    async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.instance.delete<T>(url, config);
        return response.data;
    }
}
