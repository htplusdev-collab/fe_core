import { createQueryKeys, usePaginatedQuery, useGenericMutation } from '@infrastructure/query';
import { type PaginationParams } from '@domain/value-objects';
import { productsRepository } from '../application';
import { type CreateProductDto, type UpdateProductDto } from '../types';

export const productKeys = createQueryKeys('products');

export function useProductsQuery(params: PaginationParams) {
    return usePaginatedQuery({
        params,
        queryKey: productKeys.list(params),
        queryFn: (p) => productsRepository.findAll(p),
    });
}

export function useCreateProductMutation() {
    return useGenericMutation({
        mutationFn: (data: CreateProductDto) => productsRepository.create(data),
        invalidateKeys: [productKeys.lists()],
    });
}

export function useUpdateProductMutation() {
    return useGenericMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateProductDto }) =>
            productsRepository.update(id, data),
        invalidateKeys: [productKeys.lists()],
    });
}

export function useDeleteProductMutation() {
    return useGenericMutation({
        mutationFn: (id: string) => productsRepository.remove(id),
        invalidateKeys: [productKeys.lists()],
    });
}
