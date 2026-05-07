export interface IMapper<TDomain, TDto> {
    toDomain(dto: TDto): TDomain;
    toDto(domain: TDomain): TDto;
}

export interface IListMapper<TDomain, TDto> extends IMapper<TDomain, TDto> {
    toDomainList(dtos: TDto[]): TDomain[];
    toDtoList(domains: TDomain[]): TDto[];
}

export abstract class BaseMapper<TDomain, TDto> implements IListMapper<TDomain, TDto> {
    abstract toDomain(dto: TDto): TDomain;
    abstract toDto(domain: TDomain): TDto;

    toDomainList(dtos: TDto[]): TDomain[] {
        return dtos.map((dto) => this.toDomain(dto));
    }

    toDtoList(domains: TDomain[]): TDto[] {
        return domains.map((domain) => this.toDto(domain));
    }
}
