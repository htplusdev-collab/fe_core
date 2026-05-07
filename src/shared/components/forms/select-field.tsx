import { useFormContext, type FieldValues, type Path, type PathValue } from 'react-hook-form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@shared/components/ui';
import { FormFieldWrapper } from './form-field-wrapper';

export interface SelectOption {
    label: string;
    value: string;
}

interface SelectFieldProps<TForm extends FieldValues> {
    name: Path<TForm>;
    label?: string;
    placeholder?: string;
    description?: string;
    options: SelectOption[];
    required?: boolean;
    disabled?: boolean;
    className?: string;
}

export function SelectField<TForm extends FieldValues>({
    name,
    label,
    placeholder = 'Select...',
    description,
    options,
    required = false,
    disabled = false,
    className,
}: SelectFieldProps<TForm>) {
    const {
        setValue,
        watch,
        formState: { errors },
    } = useFormContext<TForm>();

    const value = watch(name) as string | undefined;
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
            <Select
                value={value}
                onValueChange={(val) => {
                    setValue(name, val as PathValue<TForm, Path<TForm>>, { shouldValidate: true });
                }}
                disabled={disabled}
            >
                <SelectTrigger>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </FormFieldWrapper>
    );
}
