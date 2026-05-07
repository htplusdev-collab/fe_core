import { type PaginationParams } from '@domain/value-objects';

type QueryKeyScope = readonly [string];
type QueryKeyList = readonly [string, 'list', PaginationParams | undefined];
type QueryKeyDetail = readonly [string, 'detail', string];

export type EntityQueryKeys = {
    all: QueryKeyScope;
    lists: () => readonly [string, 'list'];
    list: (params?: PaginationParams) => QueryKeyList;
    details: () => readonly [string, 'detail'];
    detail: (id: string) => QueryKeyDetail;
};

export function createQueryKeys(scope: string): EntityQueryKeys {
    return {
        all: [scope] as const,
        lists: () => [scope, 'list'] as const,
        list: (params?: PaginationParams) => [scope, 'list', params] as const,
        details: () => [scope, 'detail'] as const,
        detail: (id: string) => [scope, 'detail', id] as const,
    };
}
