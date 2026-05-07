import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { useFormContext, type FieldValues, type Path } from 'react-hook-form';
import { cn } from '@shared/lib/utils';
import { FormFieldWrapper } from './form-field-wrapper';

const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
    ({ className, ...props }, ref) => {
        return (
            <textarea
                className={cn(
                    'flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
                    className,
                )}
                ref={ref}
                {...props}
            />
        );
    },
);
Textarea.displayName = 'Textarea';

interface TextareaFieldProps<TForm extends FieldValues> {
    name: Path<TForm>;
    label?: string;
    placeholder?: string;
    description?: string;
    required?: boolean;
    disabled?: boolean;
    rows?: number;
    className?: string;
}

export function TextareaField<TForm extends FieldValues>({
    name,
    label,
    placeholder,
    description,
    required = false,
    disabled = false,
    rows = 3,
    className,
}: TextareaFieldProps<TForm>) {
    const {
        register,
        formState: { errors },
    } = useFormContext<TForm>();

    const error = errors[name];
    const errorMessage = error?.message as string | undefined;

    return (
        <FormFieldWrapper
            name={name}
            label={label}
            description={description}
            error={errorMessage}
            required={required}
            className={className}
        >
            <Textarea
                id={name}
                placeholder={placeholder}
                disabled={disabled}
                rows={rows}
                {...register(name)}
            />
        </FormFieldWrapper>
    );
}
