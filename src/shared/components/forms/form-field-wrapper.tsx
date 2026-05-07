import { type ReactNode } from 'react';
import { Label } from '@shared/components/ui';
import { cn } from '@shared/lib/utils';

interface FormFieldWrapperProps {
    name: string;
    label?: string;
    description?: string;
    error?: string;
    required?: boolean;
    className?: string;
    children: ReactNode;
}

export function FormFieldWrapper({
    name,
    label,
    description,
    error,
    required = false,
    className,
    children,
}: FormFieldWrapperProps) {
    return (
        <div className={cn('space-y-2', className)}>
            {label && (
                <Label htmlFor={name}>
                    {label}
                    {required && <span className="ml-1 text-destructive">*</span>}
                </Label>
            )}
            {children}
            {description && !error && (
                <p className="text-[0.8rem] text-muted-foreground">{description}</p>
            )}
            {error && <p className="text-[0.8rem] font-medium text-destructive">{error}</p>}
        </div>
    );
}
