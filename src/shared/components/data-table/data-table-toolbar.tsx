import { type ReactNode } from 'react';
import { X } from 'lucide-react';
import { Button, Input } from '@shared/components/ui';

interface DataTableToolbarProps {
    searchValue: string;
    onSearchChange: (value: string) => void;
    searchPlaceholder?: string;
    actions?: ReactNode;
    filters?: ReactNode;
}

export function DataTableToolbar({
    searchValue,
    onSearchChange,
    searchPlaceholder = 'Search...',
    actions,
    filters,
}: DataTableToolbarProps) {
    const isFiltered = searchValue.length > 0;

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
                <Input
                    placeholder={searchPlaceholder}
                    value={searchValue}
                    onChange={(e) => {
                        onSearchChange(e.target.value);
                    }}
                    className="h-8 w-[150px] lg:w-[250px]"
                />
                {filters}
                {isFiltered && (
                    <Button
                        variant="ghost"
                        onClick={() => {
                            onSearchChange('');
                        }}
                        className="h-8 px-2 lg:px-3"
                    >
                        Reset
                        <X className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>
            {actions && <div className="flex items-center space-x-2">{actions}</div>}
        </div>
    );
}
