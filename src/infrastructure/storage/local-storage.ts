export function getStorageItem(key: string): unknown {
    const item = localStorage.getItem(key);
    if (!item) return null;
    try {
        return JSON.parse(item);
    } catch {
        return null;
    }
}

export function setStorageItem(key: string, value: unknown): void {
    localStorage.setItem(key, JSON.stringify(value));
}

export function removeStorageItem(key: string): void {
    localStorage.removeItem(key);
}

export function clearStorage(): void {
    localStorage.clear();
}
