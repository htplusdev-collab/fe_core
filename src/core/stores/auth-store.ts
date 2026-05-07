import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type AuthUser, type UserRole } from '@core/types';
import { STORAGE_KEYS } from '@core/constants';

interface AuthStore {
    user: AuthUser | null;
    isAuthenticated: boolean;
    setUser: (user: AuthUser) => void;
    clearAuth: () => void;
    hasRole: (role: UserRole) => boolean;
    hasAnyRole: (roles: UserRole[]) => boolean;
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set, get) => ({
            user: null,
            isAuthenticated: false,

            setUser: (user: AuthUser) => {
                set({ user, isAuthenticated: true });
            },

            clearAuth: () => {
                localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
                localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
                set({ user: null, isAuthenticated: false });
            },

            hasRole: (role: UserRole) => {
                return get().user?.role === role;
            },

            hasAnyRole: (roles: UserRole[]) => {
                const currentRole = get().user?.role;
                return currentRole !== undefined && roles.includes(currentRole);
            },
        }),
        {
            name: STORAGE_KEYS.USER,
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated,
            }),
        },
    ),
);
