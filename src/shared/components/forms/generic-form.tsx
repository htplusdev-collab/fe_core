import { type ReactNode } from 'react';
import {
    useForm,
    FormProvider,
    type FieldValues,
    type UseFormReturn,
    type DefaultValues,
    type SubmitHandler,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type z } from 'zod';
import { Button } from '@shared/components/ui';

interface GenericFormProps<TFormValues extends FieldValues> {
    schema: z.ZodType<TFormValues>;
    defaultValues?: DefaultValues<TFormValues>;
    onSubmit: SubmitHandler<TFormValues>;
    children: (methods: UseFormReturn<TFormValues>) => ReactNode;
    submitLabel?: string;
    isSubmitting?: boolean;
    className?: string;
    resetOnSuccess?: boolean;
}

export function GenericForm<TFormValues extends FieldValues>({
    schema,
    defaultValues,
    onSubmit,
    children,
    submitLabel = 'Submit',
    isSubmitting = false,
    className,
    resetOnSuccess = false,
}: GenericFormProps<TFormValues>) {
    const methods = useForm<TFormValues>({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        resolver: zodResolver(schema as any),
        defaultValues,
        mode: 'onBlur',
    });

    const handleSubmit: SubmitHandler<TFormValues> = async (data) => {
        await onSubmit(data);
        if (resetOnSuccess) {
            methods.reset();
        }
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleSubmit)} className={className}>
                {children(methods)}
                <div className="mt-6 flex justify-end space-x-2">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                            methods.reset();
                        }}
                        disabled={isSubmitting}
                    >
                        Reset
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : submitLabel}
                    </Button>
                </div>
            </form>
        </FormProvider>
    );
}
