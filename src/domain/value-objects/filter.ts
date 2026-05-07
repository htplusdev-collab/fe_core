export type FilterOperator =
    | 'eq'
    | 'neq'
    | 'gt'
    | 'gte'
    | 'lt'
    | 'lte'
    | 'contains'
    | 'startsWith'
    | 'endsWith'
    | 'in'
    | 'between';

export interface FilterCondition<T = unknown> {
    field: string;
    operator: FilterOperator;
    value: T;
}

export interface FilterGroup {
    logic: 'and' | 'or';
    conditions: FilterCondition[];
}

export class QueryBuilder {
    private readonly filters: FilterCondition[] = [];
    private sortField?: string;
    private sortDirection: 'asc' | 'desc' = 'asc';

    where(field: string, operator: FilterOperator, value: unknown): this {
        this.filters.push({ field, operator, value });
        return this;
    }

    orderBy(field: string, direction: 'asc' | 'desc' = 'asc'): this {
        this.sortField = field;
        this.sortDirection = direction;
        return this;
    }

    build(): { filters: FilterCondition[]; sort?: { field: string; direction: 'asc' | 'desc' } } {
        return {
            filters: [...this.filters],
            sort: this.sortField
                ? { field: this.sortField, direction: this.sortDirection }
                : undefined,
        };
    }
}
