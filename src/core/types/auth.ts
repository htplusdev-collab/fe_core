export type UserRole = 'admin' | 'manager' | 'user' | 'viewer';

export interface AuthUser {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    avatar?: string;
}

export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface AuthState {
    user: AuthUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}
