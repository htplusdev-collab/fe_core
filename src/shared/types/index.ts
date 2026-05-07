export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type StrictOmit<T, K extends keyof T> = Omit<T, K>;

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type ValueOf<T> = T[keyof T];

export type Entries<T> = {
    [K in keyof T]: [K, T[K]];
}[keyof T][];

export type Brand<T, B extends string> = T & { readonly __brand: B };
