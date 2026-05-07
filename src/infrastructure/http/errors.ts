export interface ApiError {
    message: string;
    code?: string;
    status?: number;
    errors?: Record<string, string[]>;
}

export class AppError extends Error {
    readonly status: number;
    readonly code?: string;

    constructor(message: string, status = 500, code?: string) {
        super(message);
        this.name = 'AppError';
        this.status = status;
        this.code = code;
    }

    get isUnauthorized(): boolean {
        return this.status === 401;
    }

    get isForbidden(): boolean {
        return this.status === 403;
    }

    get isNotFound(): boolean {
        return this.status === 404;
    }

    get isServerError(): boolean {
        return this.status >= 500;
    }

    static from(error: unknown): AppError {
        if (error instanceof AppError) return error;
        if (error instanceof Error) return new AppError(error.message);
        return new AppError('An unknown error occurred');
    }
}

export class NetworkError extends AppError {
    constructor(message = 'Network error occurred') {
        super(message, 0, 'NETWORK_ERROR');
        this.name = 'NetworkError';
    }
}

export class ValidationError extends AppError {
    readonly errors: Record<string, string[]>;

    constructor(message: string, errors: Record<string, string[]>) {
        super(message, 422, 'VALIDATION_ERROR');
        this.name = 'ValidationError';
        this.errors = errors;
    }
}
