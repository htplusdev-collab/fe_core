import { useFormContext, type FieldValues, type Path } from 'react-hook-form';
import { Input } from '@shared/components/ui';
import { FormFieldWrapper } from './form-field-wrapper';

interface TextFieldProps<TForm extends FieldValues> {
    name: Path<TForm>;
    label?: string;
    placeholder?: string;
    description?: string;
    type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
    required?: boolean;
    disabled?: boolean;
    className?: string;
}

export function TextField<TForm extends FieldValues>({
    name,
    label,
    placeholder,
    description,
    type = 'text',
    required = false,
    disabled = false,
    className,
}: TextFieldProps<TForm>) {
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
            <Input
                id={name}
                type={type}
                placeholder={placeholder}
                disabled={disabled}
                {...register(name)}
            />
        </FormFieldWrapper>
    );
}
