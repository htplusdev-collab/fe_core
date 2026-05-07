import { type PaginatedResult, type PaginationParams } from '@domain/value-objects/pagination';

export interface IReadRepository<TEntity, TId = string> {
    findById(id: TId): Promise<TEntity>;
    findAll(params?: PaginationParams): Promise<PaginatedResult<TEntity>>;
}

export interface IWriteRepository<TEntity, TCreateDto, TUpdateDto, TId = string> {
    create(dto: TCreateDto): Promise<TEntity>;
    update(id: TId, dto: TUpdateDto): Promise<TEntity>;
    delete(id: TId): Promise<void>;
}

export interface ICrudRepository<TEntity, TCreateDto, TUpdateDto, TId = string>
    extends IReadRepository<TEntity, TId>, IWriteRepository<TEntity, TCreateDto, TUpdateDto, TId> {}
