import { useMutation, useQueryClient, type UseMutationOptions } from '@tanstack/react-query';

export interface UseGenericMutationOptions<TData, TVariables> {
    mutationFn: (variables: TVariables) => Promise<TData>;
    invalidateKeys?: readonly (readonly unknown[])[];
    onSuccessCallback?: (data: TData) => void;
    onErrorCallback?: (error: Error) => void;
    mutationOptions?: Omit<UseMutationOptions<TData, Error, TVariables>, 'mutationFn'>;
}

export function useGenericMutation<TData, TVariables>({
    mutationFn,
    invalidateKeys,
    onSuccessCallback,
    onErrorCallback,
    mutationOptions,
}: UseGenericMutationOptions<TData, TVariables>) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn,
        onSuccess: (data) => {
            if (invalidateKeys) {
                invalidateKeys.forEach((key) => {
                    void queryClient.invalidateQueries({ queryKey: [...key] });
                });
            }
            onSuccessCallback?.(data);
        },
        onError: (error: Error) => {
            onErrorCallback?.(error);
        },
        ...mutationOptions,
    });
}
