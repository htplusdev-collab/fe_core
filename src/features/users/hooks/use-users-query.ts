import { createQueryKeys, usePaginatedQuery, useGenericMutation } from '@infrastructure/query';
import { type PaginationParams } from '@domain/value-objects';
import { usersRepository } from '../application';
import { type CreateUserDto, type UpdateUserDto } from '../types';

export const userKeys = createQueryKeys('users');

export function useUsersQuery(params: PaginationParams) {
    return usePaginatedQuery({
        params,
        queryKey: userKeys.list(params),
        queryFn: (p) => usersRepository.findAll(p),
    });
}

export function useCreateUserMutation() {
    return useGenericMutation({
        mutationFn: (data: CreateUserDto) => usersRepository.create(data),
        invalidateKeys: [userKeys.lists()],
    });
}

export function useUpdateUserMutation() {
    return useGenericMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateUserDto }) =>
            usersRepository.update(id, data),
        invalidateKeys: [userKeys.lists()],
    });
}

export function useDeleteUserMutation() {
    return useGenericMutation({
        mutationFn: (id: string) => usersRepository.remove(id),
        invalidateKeys: [userKeys.lists()],
    });
}
