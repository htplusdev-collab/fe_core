import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
    return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string, locale = 'en-US'): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    }).format(d);
}

export function formatCurrency(amount: number, currency = 'USD', locale = 'en-US'): string {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
    }).format(amount);
}

export function debounce<TArgs extends unknown[]>(
    fn: (...args: TArgs) => void,
    delay: number,
): (...args: TArgs) => void {
    let timeoutId: ReturnType<typeof setTimeout>;
    return (...args: TArgs) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}

export function invariant(condition: unknown, message: string): asserts condition {
    if (!condition) {
        throw new Error(`Invariant violation: ${message}`);
    }
}
