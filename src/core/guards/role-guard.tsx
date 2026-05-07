import { type ReactNode } from 'react';
import { useAuthStore } from '@core/stores';
import { type UserRole } from '@core/types';

interface RoleGuardProps {
    children: ReactNode;
    allowedRoles: UserRole[];
    fallback?: ReactNode;
}

export function RoleGuard({ children, allowedRoles, fallback = null }: RoleGuardProps): ReactNode {
    const { user } = useAuthStore();

    if (!user || !allowedRoles.includes(user.role)) {
        return fallback;
    }

    return children;
}
