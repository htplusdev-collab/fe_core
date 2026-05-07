import { type ReactNode } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useAuthStore } from '@core/stores';
import { type UserRole } from '@core/types';
import { useEffect } from 'react';

interface AuthGuardProps {
    children: ReactNode;
    requiredRoles?: UserRole[];
    fallback?: ReactNode;
    redirectTo?: string;
}

export function AuthGuard({
    children,
    requiredRoles,
    fallback,
    redirectTo = '/',
}: AuthGuardProps): ReactNode {
    const { isAuthenticated, user } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            void navigate({ to: redirectTo });
        }
    }, [isAuthenticated, navigate, redirectTo]);

    if (!isAuthenticated) {
        return null;
    }

    if (requiredRoles && user) {
        const hasAccess = requiredRoles.includes(user.role);
        if (!hasAccess) {
            return fallback ?? null;
        }
    }

    return children;
}
