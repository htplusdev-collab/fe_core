import { type IMapper } from '@domain/contracts';
import {
    type PaginatedResult,
    type PaginationParams,
    createPaginationMeta,
} from '@domain/value-objects';
import { type BaseApiService } from '@infrastructure/api';

export abstract class BaseRepository<TEntity, TDto, TCreateDto, TUpdateDto> {
    constructor(
        protected readonly apiService: BaseApiService<TDto, TCreateDto, TUpdateDto>,
        protected readonly mapper: IMapper<TEntity, TDto>,
    ) {}

    async findById(id: string): Promise<TEntity> {
        const response = await this.apiService.getById(id);
        return this.mapper.toDomain(response.data);
    }

    async findAll(params?: PaginationParams): Promise<PaginatedResult<TEntity>> {
        const response = await this.apiService.getAll(
            params
                ? {
                      page: params.page,
                      pageSize: params.pageSize,
                      search: params.search,
                      sortBy: params.sortBy,
                      sortOrder: params.sortOrder,
                  }
                : undefined,
        );
        const data = response.data.map((dto) => this.mapper.toDomain(dto));
        const meta = createPaginationMeta(
            response.meta.currentPage,
            response.meta.pageSize,
            response.meta.totalItems,
        );
        return { data, meta };
    }

    async create(dto: TCreateDto): Promise<TEntity> {
        const response = await this.apiService.create(dto);
        return this.mapper.toDomain(response.data);
    }

    async update(id: string, dto: TUpdateDto): Promise<TEntity> {
        const response = await this.apiService.update(id, dto);
        return this.mapper.toDomain(response.data);
    }

    async remove(id: string): Promise<void> {
        await this.apiService.remove(id);
    }
}
