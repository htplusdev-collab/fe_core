export const STORAGE_KEYS = {
    AUTH_TOKEN: 'auth_token',
    REFRESH_TOKEN: 'refresh_token',
    USER: 'user',
    THEME: 'theme',
} as const;

export const QUERY_STALE_TIME = {
    SHORT: 1000 * 30,
    MEDIUM: 1000 * 60 * 5,
    LONG: 1000 * 60 * 30,
} as const;

export const PAGE_SIZES = [10, 25, 50, 100] as const;

export type PageSize = (typeof PAGE_SIZES)[number];
